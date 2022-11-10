import { RecruitmentServiceService } from 'src/app/Services/RecruitmentServices/recruitment-service.service';
import { candidate } from './../../../Models/Candidate';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import * as FileSaver from 'file-saver';
import { DatePipe } from '@angular/common';
import { VendorServiceService } from 'src/app/Services/VendorServices/vendor-service.service';
import { ReportServiceService } from 'src/app/Services/ReportServices/report-service.service';
import { vendor } from 'src/app/Models/vendor';

@Component({
  selector: 'app-notshortlisted-candidate-report',
  templateUrl: './notshortlisted-candidate-report.component.html',
  styleUrls: ['./notshortlisted-candidate-report.component.css'],
})
export class NotshortlistedCandidateReportComponent implements OnInit {
  vendorUniqueId: string;
  constructor(
    private rserv: RecruitmentServiceService,
    private alertify: AlertifyService,
    private vserv: VendorServiceService,
    private reportService: ReportServiceService
  ) {}

  isVendor: string;
  ngOnInit(): void {
    //document.getElementById('reports').classList.add('active');
    this.loadActiveVendors();
    this.getNotRejectedCandidates();
    this.isVendor = sessionStorage.getItem('isVendor');
    this.vendorUniqueId = sessionStorage.getItem('currentVendorId');
  }

  activeVendors: vendor[];
  loadActiveVendors() {
    this.vserv.getActiveVendors().subscribe((data) => {
      console.log(data);
      this.activeVendors = data;
    });
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
    //this.getNotRejectedCandidates();
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
  findDetailsForRejectedCandidates(data) {
    return this.rejectedCandidateList.filter((x) => x.id === data.id);
  }
  RejectedCandidates: string[] = ['03', '07', '11', '15', '19', '23'];
  rejectedCandidateList: any;
  rejectedCandidatesCount: number;
  /**
   * Gets selected candidates
   */
  getNotRejectedCandidates() {
    this.loader = 1;
    if (this.isVendor == '1') {
      this.rserv
        .getCandidatesByRecStatusListForVendor(
          this.RejectedCandidates,
          this.vendorUniqueId
        )
        .subscribe((data) => {
          this.loader = 0;
          this.rejectedCandidateList = data;
          this.rejectedCandidatesCount = this.rejectedCandidateList.length;
        });
    } else {
      this.rserv
        .getCandidatesByRecStatusList(this.RejectedCandidates)
        .subscribe((data) => {
          this.loader = 0;
          this.rejectedCandidateList = data;
          this.rejectedCandidatesCount = this.rejectedCandidateList.length;
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
    this.searchModal.vendorName = undefined;
    this.searchModal.location = undefined;
    this.searchModal.email = undefined;
    this.searchModal.jrNumber = undefined;
    this.searchModal.candidateType = undefined;
    this.searchModal.fullName = undefined;

    this.getNotRejectedCandidates();
  }

  downloadRejectedCandidateDetails() {
    this.reportService
      .downloadRejectedCandidateDetails(this.rejectedCandidateList)
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
      'RejectedCandidate_Report_' + this.getCurrentDateTime() + '.xlsx'
    );
  }

  searchModal: candidate = new candidate();
  restBtn: boolean = false;
  /**
   * Searchs resource mgmt
   * @returns
   */
  searchRejectedCandidateForDownload() {
    if (
      (this.searchModal.vendorId == undefined ||
        this.searchModal.vendorId == '') &&
      (this.searchModal.jrNumber == undefined ||
        this.searchModal.jrNumber == '') &&
      (this.searchModal.candidateType == undefined ||
        this.searchModal.candidateType == '') &&
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
      .searchRejectedCandidateForDownload(this.searchModal)
      .subscribe((data) => {
        this.loader = 0;
        console.log(data);
        this.handlePageChangeForSelCandi(1);
        this.rejectedCandidateList = data;
        this.rejectedCandidatesCount = this.rejectedCandidateList.length;
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
      this.searchRejectedCandidateForDownload();
    }
  }
}
