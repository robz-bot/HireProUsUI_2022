import { UserRegServicesService } from 'src/app/Services/UserRegServices/user-reg-services.service';
import { RecruitmentServiceService } from './../../../Services/RecruitmentServices/recruitment-service.service';
import { jobReq } from './../../../Models/JobRequest';
import { BusinessUnit } from 'src/app/Models/BusinessUnit';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { jobReqSearch } from 'src/app/Models/jobReqSearch';
import { ReportServiceService } from 'src/app/Services/ReportServices/report-service.service';
import * as FileSaver from 'file-saver';
import { DatePipe } from '@angular/common';
import { vendor } from 'src/app/Models/vendor';
import { VendorServiceService } from 'src/app/Services/VendorServices/vendor-service.service';

declare function closeModal(): any;
declare function closeFilter(): any;
declare function redirectToList(): any;
@Component({
  selector: 'app-job-req-status-report',
  templateUrl: './job-req-status-report.component.html',
  styleUrls: ['./job-req-status-report.component.css'],
})
export class JobReqStatusReportComponent implements OnInit {
  jobReqListCount: any;
  constructor(
    private rserv: RecruitmentServiceService,
    private mserv: MasterserviceService,
    private alertify: AlertifyService,
    private _router: Router,
    private vendorService: VendorServiceService,
    private reportService: ReportServiceService
  ) {}

  ngOnInit(): void {
    this.loadJobReq();
    this.loadbu();
    this.loadActiveVendors();
    this.loadDate();
  }

  bulist: BusinessUnit[];
  loadbu() {
    this.mserv.getBUList().subscribe((data) => {
      this.bulist = data;
    });
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

  activeVendors: vendor[];
  loadActiveVendors() {
    this.vendorService.getActiveVendors().subscribe((data) => {
      console.log(data);
      this.activeVendors = data;
    });
  }

  // Declarations
  jobReq: jobReq = new jobReq();
  jobReqList: any;
  loader: number = 0;

  // Load Job Request List
  loadJobReq() {
    this.loader = 1;
    this.jobReq.keyword = '';
    this.rserv.getJobRequestList().subscribe((data) => {
      this.jobReqList = data;
      console.log(this.jobReqList);
      this.jobReqListCount = this.jobReqList.length;
      this.loader = 0;
    });
  }
  todayDate: Date;
  loadDate() {
    this.todayDate = new Date();
    console.log(this.todayDate);
  }

  ShowFilterDiv: boolean = false;
  searchModal: jobReqSearch = new jobReqSearch();

  showFilter() {
    this.ShowFilterDiv = true;
  }

  closeFilter() {
    this.loadbu();
    this.resetFilter();
    this.ShowFilterDiv = false;
  }

  resetFilter() {
    this.loadbu();
    this.searchModal.buId = undefined;
    this.searchModal.jrNumber = undefined;
    this.searchModal.placementFor = undefined;
    this.searchModal.employmentType = undefined;
    this.searchModal.jobReqStatus = undefined;
    this.searchModal.vendorId = undefined;
    this.searchModal.fromDateTime = undefined;
    this.searchModal.toDateTime = undefined;
    this.searchModal.vendorPriority = undefined;

    this.loadJobReq();
  }

  downloadJobRequestDetails() {
    this.loader = 1;
    this.reportService
      .downloadJobRequestDetails(this.jobReqList)
      .subscribe((data) => {
        console.log(data);
        this.loader = 0;
        this.saveAsBlob(data);
      });
  }
  saveAsBlob(data: any) {
    FileSaver.saveAs(
      new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }),
      'JobRequest_Report_' + this.getCurrentDateTime() + '.xlsx'
    );
  }

  getCurrentDateTime(): string {
    const pipe = new DatePipe('en-US');
    return pipe.transform(new Date(), 'yyyyMMddhhmmss');
  }
  restBtn: boolean = false;
  searchJobRequestForDownload() {
    if (
      (this.searchModal.jrNumber == undefined ||
        this.searchModal.jrNumber == '') &&
      (this.searchModal.jobReqStatus == undefined ||
        this.searchModal.jobReqStatus == '') &&
      (this.searchModal.employmentType == undefined ||
        this.searchModal.employmentType == '') &&
      (this.searchModal.placementFor == undefined ||
        this.searchModal.placementFor == '') &&
      (this.searchModal.buId == undefined || this.searchModal.buId == '') &&
      (this.searchModal.vendorId == undefined ||
        this.searchModal.vendorId == '') &&
      (this.searchModal.toDateTime == undefined ||
        this.searchModal.toDateTime == '') &&
      (this.searchModal.fromDateTime == undefined ||
        this.searchModal.fromDateTime == '') &&
      (this.searchModal.vendorPriority == undefined ||
        this.searchModal.vendorPriority == '')
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

    this.loader = 1;

    this.reportService
      .searchJobRequestForDownload(this.searchModal)
      .subscribe((data) => {
        this.loader = 0;
        console.log(data);
        this.handlePageChange(1);
        this.jobReqList = data;
        this.jobReqListCount = this.jobReqList.length;
        this.searchModal.fromDateTime =
          this.searchModal.fromDateTime.split('T')[0];
        this.searchModal.toDateTime = this.searchModal.toDateTime.split('T')[0];
      });
  }
}
