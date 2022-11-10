import { UserRegServicesService } from 'src/app/Services/UserRegServices/user-reg-services.service';
import { RecruitmentServiceService } from './../../../Services/RecruitmentServices/recruitment-service.service';
import { jobReq } from './../../../Models/JobRequest';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
declare function highlightReports(): any;
import * as FileSaver from 'file-saver';
import { DatePipe } from '@angular/common';
import { interviewSchedule } from 'src/app/Models/InterviewSchedule';
import { ReportServiceService } from 'src/app/Services/ReportServices/report-service.service';
@Component({
  selector: 'app-interview-schedule-summary-report',
  templateUrl: './interview-schedule-summary-report.component.html',
  styleUrls: ['./interview-schedule-summary-report.component.css'],
})
export class InterviewScheduleSummaryReportComponent implements OnInit {
  constructor(
    private rserv: RecruitmentServiceService,
    private mserv: MasterserviceService,
    private alertify: AlertifyService,
    private _router: Router,
    private userv: UserRegServicesService,
    private reportService: ReportServiceService
  ) {}

  ngOnInit(): void {
    this.loadInterviewSchedule();
    highlightReports();
  }

  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];

  handlePageChange(event): void {
    this.page = event;
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }

  /**
   * Finds details forselected candidates
   * @param data
   * @returns
   */
  findDetailsForRejectedCandidates(data) {
    return this.interviewScheList.filter((x) => x.id === data.id);
  }
  // Declarations
  jobReq: jobReq = new jobReq();
  jobReqList: any;
  interviewScheListCount: number;
  loader: number = 0;

  //Load Interview  Schedule
  interviewScheList: any;
  loadInterviewSchedule() {
    this.loader = 1;
    this.rserv.getAllInterviewSchedule().subscribe((data) => {
      this.interviewScheList = data;
      this.interviewScheList = this.interviewScheList.filter(
        (x) =>
          x.round > 0 && x.round < 5 && x.recStatus >= 4 && x.recStatus <= 19
      );

      this.interviewScheListCount = this.interviewScheList.length;
      console.log('interview Schedule List!!!!!!!!!!!!!!');
      console.log(this.interviewScheList);
      this.loader = 0;
    });
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
    this.searchModal.candidateName = undefined;
    this.searchModal.round = undefined;
    this.searchModal.interviewerName = undefined;
    this.searchModal.jrNumber = undefined;

    this.loadInterviewSchedule();
  }

  downloadInterviewScheduleDetails() {
    this.reportService
      .downloadInterviewScheduleDetails(this.interviewScheList)
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
      'InterviewScheduledSummary_Report_' + this.getCurrentDateTime() + '.xlsx'
    );
  }

  searchModal: interviewSchedule = new interviewSchedule();
  restBtn: boolean = false;
  /**
   * Searchs resource mgmt
   * @returns
   */
  searchInterviewScheduleForDownload() {
    if (
      (this.searchModal.candidateName == undefined ||
        this.searchModal.candidateName == '') &&
      (this.searchModal.jrNumber == undefined ||
        this.searchModal.jrNumber == '') &&
      (this.searchModal.round == undefined || this.searchModal.round == '') &&
      (this.searchModal.interviewerName == undefined ||
        this.searchModal.interviewerName == '') &&
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
      .searchInterviewScheduleForDownload(this.searchModal)
      .subscribe((data) => {
        this.loader = 0;
        console.log(data);
        this.handlePageChange(1);
        this.interviewScheList = data;
        this.interviewScheList = this.interviewScheList.filter(
          (x) =>
            x.round > 0 && x.round < 5 && x.recStatus >= 4 && x.recStatus <= 19
        );
        this.interviewScheListCount = this.interviewScheList.length;
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
      this.searchInterviewScheduleForDownload();
    }
  }
}
