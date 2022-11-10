import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { candidate } from 'src/app/Models/Candidate';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { RecruitmentServiceService } from 'src/app/Services/RecruitmentServices/recruitment-service.service';
import { ReportServiceService } from 'src/app/Services/ReportServices/report-service.service';
import { VendorServiceService } from 'src/app/Services/VendorServices/vendor-service.service';
import * as FileSaver from 'file-saver';
import { ImageServicesService } from 'src/app/Services/ImageServices/image-services.service';

@Component({
  selector: 'app-candidate-report',
  templateUrl: './candidate-report.component.html',
  styleUrls: ['./candidate-report.component.css'],
})
export class CandidateReportComponent implements OnInit {
  vendorUniqueId: string;
  constructor(
    private rserv: RecruitmentServiceService,
    private alertify: AlertifyService,
    private vserv: VendorServiceService,
    private reportService: ReportServiceService,
    private iserv: ImageServicesService
  ) {}

  isVendor: string;
  ngOnInit(): void {
    this.getCandidatesList();
    this.isVendor = sessionStorage.getItem('isVendor');
    this.vendorUniqueId = sessionStorage.getItem('currentVendorId');
  }

  candidate: candidate = new candidate();
  loader: number = 0;

  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  /**
   * Handles page change for sel candi
   * @param event
   */
  handlePageChangeForSelCandi(event): void {
    //console.log(event);
    this.page = event;
    //this.getSelectedCandidates();
  }
  /**
   * Handles page size change
   * @param event
   */
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    //this.loadMenus();
  }
  /**
   * Finds details forselected candidates
   * @param data
   * @returns
   */
  findDetailsForCandidates(data) {
    return this.CandidateList.filter((x) => x.id === data.id);
  }
  // SelectedCandidates: string[] = ['24'];
  CandidateList: any;
  CandidatesCount: number;
  /**
   * Gets selected candidates
   */
  getCandidatesList() {
    this.loader = 1;
    if (this.isVendor == '1') {
      this.rserv
        .getCandidatesByVendorId(this.vendorUniqueId)
        .subscribe((data) => {
          this.loader = 0;
          this.CandidateList = data;
          this.CandidatesCount = this.CandidateList.length;
        });
    } else {
      this.rserv.getCandidateList().subscribe((data) => {
        this.loader = 0;
        this.CandidateList = data;
        this.CandidatesCount = this.CandidateList.length;
      });
    }
  }
  ShowFilterDiv: boolean = false;

  showFilter() {
    this.ShowFilterDiv = true;
  }

  closeFilter() {
    this.resetFilter();
    this.ShowFilterDiv = false;
  }

  resetFilter() {
    this.searchModal.fromDateTime = undefined;
    this.searchModal.toDateTime = undefined;
    this.searchModal.vendorId = undefined;
    this.searchModal.fullName = undefined;
    this.searchModal.candidateType = undefined;
    this.searchModal.jrNumber = undefined;
    this.searchModal.recStatus = undefined;

    this.getCandidatesList();
  }

  downloadCandidateDetails() {
    this.reportService
      .downloadCandidateDetails(this.CandidateList)
      .subscribe((data) => {
        console.log(data);
        this.saveAsBlob(data);
      });
  }

  getCurrentDateTime(): string {
    const pipe = new DatePipe('en-US');
    return pipe.transform(new Date(), 'yyyyMMddhhmmss');
  }

  saveAsBlob(data: any) {
    FileSaver.saveAs(
      new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }),
      'Candidate_report_' + this.getCurrentDateTime() + '.xlsx'
    );
  }

  searchModal: candidate = new candidate();
  recStatusList: string[];
  restBtn: boolean = false;
  /**
   * Searchs resource mgmt
   * @returns
   */
  searchCandidateForDownload() {
    if (
      (this.searchModal.vendorId == undefined ||
        this.searchModal.vendorId == '') &&
      (this.searchModal.jrNumber == undefined ||
        this.searchModal.jrNumber == '') &&
      (this.searchModal.candidateType == undefined ||
        this.searchModal.candidateType == '') &&
      (this.searchModal.recStatus == undefined ||
        this.searchModal.recStatus == '') &&
      (this.searchModal.fullName == undefined ||
        this.searchModal.fullName == '') &&
      (this.searchModal.fromDateTime == undefined ||
        this.searchModal.fromDateTime == '') &&
      (this.searchModal.toDateTime == undefined ||
        this.searchModal.toDateTime == '')
    ) {
      this.restBtn = false;
      this.alertify.errorMsg('Select any one Criteria');
      return;
    }
    if (this.searchModal.recStatus != undefined) {
      this.recStatusList = this.searchModal.recStatus.split(',');
      console.log(this.recStatusList);
    }
    if (this.searchModal.fromDateTime > this.searchModal.toDateTime) {
      this.alertify.errorMsg('To Date Should not be greater than From Date ');
      return;
    }

    if (this.searchModal.fromDateTime != undefined) {
      this.searchModal.fromDateTime =
        this.searchModal.fromDateTime + 'T' + '00:00:00.000';
    }

    if (this.searchModal.toDateTime != undefined) {
      this.searchModal.toDateTime =
        this.searchModal.toDateTime + 'T' + '23:59:59.999';
    }
    this.restBtn = true;
    this.loader = 1;

    this.reportService
      .searchAllCandidateForDownload(this.searchModal)
      .subscribe((data) => {
        this.loader = 0;
        console.log(data);
        this.handlePageChangeForSelCandi(1);
        this.CandidateList = data;
        this.CandidatesCount = this.CandidateList.length;
        this.searchModal.fromDateTime =
          this.searchModal.fromDateTime.split('T')[0];
        this.searchModal.toDateTime = this.searchModal.toDateTime.split('T')[0];
      });
  }

  /**
   * Handles key up
   * @param e
   */
  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.searchCandidateForDownload();
    }
  }

  resumeRes: any;
  /**
   * Gets resume
   * @param id
   */
  getResume(id: string) {
    console.log(id);
    this.iserv.getResume('resume_' + id).subscribe((data) => {
      console.log(data);
      this.resumeRes = data;
      if (this.resumeRes.resume != null || this.resumeRes.resume != '') {
        const pdfWindow = window.open('');

        pdfWindow.document.write(
          '<title>View Resume</title><html><body><iframe' +
            " style='width: 100%;height: 100%' src='" +
            this.resumeRes.resume +
            "'></iframe></body></html>"
        );
      } else {
        this.alertify.errorMsg('Resume Not Uploaded');
      }
    });
  }
}
