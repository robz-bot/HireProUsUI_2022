import { Component, OnInit } from '@angular/core';
import { emailConfig } from 'src/app/Models/emailConfig';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { LoginServicesService } from 'src/app/Services/LoginServices/login-services.service';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import * as FileSaver from 'file-saver';
import { DatePipe } from '@angular/common';
import { ReportServiceService } from 'src/app/Services/ReportServices/report-service.service';
import { BusinessUnit } from 'src/app/Models/BusinessUnit';

@Component({
  selector: 'app-email-config-report',
  templateUrl: './email-config-report.component.html',
  styleUrls: ['./email-config-report.component.css'],
})
export class EmailConfigReportComponent implements OnInit {
  emailListCount: number;
  constructor(
    private mserv: MasterserviceService,
    private alertify: AlertifyService,
    private lserv: LoginServicesService,
    private reportService: ReportServiceService
  ) {}
  loggedInUserId: any;
  loader: number = 0;
  datares: any;
  ngOnInit(): void {
    this.loggedInUserId = sessionStorage.getItem('currentUserId');
    this.loademailConfig();
    this.loadPurpose();
    this.loadBu();
    this.loadDate();
    this.mailOption = 'to';
  }

  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  index = 0;
  /**
   * Handles page change
   * @param event
   */
  handlePageChange(event): void {
    console.log(event);
    this.page = event;
    //this.index = (event - 1) * this.pageSize + 1;
    //this.loademailConfig();
  }
  /**
   * Handles page size change
   * @param event
   */
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    //this.loademailConfig();
  }
  email: emailConfig = new emailConfig();
  emailList: emailConfig[];

  /**
   * Purpose  of email configuration component
   */
  Purpose: any[] = [
    { purpose: 'CONFIGURATION_CREATE' },
    { purpose: 'CONFIGURATION_UPDATE' },
    // { purpose: 'USER_REGISTRATION' },
    // { purpose: 'PROFILE_UPDATE' },
    // { purpose: 'PASSWORD_CHANGE' },
    { purpose: 'JOB_REQUEST_CREATE' },
    { purpose: 'JOB_REQUEST_UPDATE' },
    { purpose: 'CANDIDATE_UPLOAD' },
    { purpose: 'CANDIDATE_UPDATED' },
    { purpose: 'RESUME_SHORTLIST' },
    { purpose: 'INTERNAL_ROUND1_SCHEDULED' },
    { purpose: 'INTERNAL_ROUND1_RESULT' },
    { purpose: 'INTERNAL_ROUND2_SCHEDULED' },
    { purpose: 'INTERNAL_ROUND2_RESULT' },
    { purpose: 'CUSTOMER_ROUND_SCHEDULED' },
    { purpose: 'CUSTOMER_ROUND_RESULT' },
    { purpose: 'HR_ROUND_SCHEDULED' },
    { purpose: 'HR_ROUND_RESULT' },
    { purpose: 'FOR_BU_APPROVAL' },
    { purpose: 'SELECTED' },
    { purpose: 'ON_BOARDED' },
    // { purpose: 'WEEKLY_REPORT' },
    // { purpose: 'MONTHLY_REPORT' },
    // { purpose: 'YEARLY_REPORT' },
  ];
  /**
   * Loads purpose
   */
  loadPurpose() {
    this.Purpose = this.Purpose.sort((a, b) =>
      a.purpose.localeCompare(b.purpose)
    );
  }
  /**
   * Loademails config
   */
  loademailConfig() {
    this.loader = 1;
    this.mserv.getAllEmailConfig().subscribe((data) => {
      this.emailList = data;
      this.emailListCount = this.emailList.length;
      this.loader = 0;
      console.log(this.emailList);
    });
  }
  bulist: BusinessUnit[];
  /**
   * Loads bu
   */
  loadBu() {
    this.mserv.getBUList().subscribe((data) => {
      this.bulist = data;
      this.bulist = this.bulist.sort((a, b) =>
        a.businessUnitName.localeCompare(b.businessUnitName)
      );
      console.log(this.bulist);
    });
  }

  todayDate: Date;
  loadDate() {
    this.todayDate = new Date();
    console.log(this.todayDate);
  }

  ShowFilterDiv: boolean = false;
  searchModal: emailConfig = new emailConfig();

  showFilter() {
    this.ShowFilterDiv = true;
  }

  closeFilter() {
    this.loademailConfig();
    this.resetFilter();
    this.ShowFilterDiv = false;
  }

  resetFilter() {
    this.loademailConfig();
    this.searchModal.email = '';
    this.searchModal.buId = undefined;
    this.searchModal.purpose = undefined;
    this.searchModal.fromDateTime = undefined;
    this.searchModal.toDateTime = undefined;
    this.searchModal.cc = undefined;
    this.searchModal.bcc = undefined;
    this.searchModal.to = undefined;
    this.mailOption = 'to';
  }

  downloadEmailConfDetails() {
    this.loader = 1;
    console.log(this.emailList);
    this.reportService
      .downloadEmailConfDetails(this.emailList)
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
      'EmailConfiguration_Report_' + this.getCurrentDateTime() + '.xlsx'
    );
  }

  getCurrentDateTime(): string {
    const pipe = new DatePipe('en-US');
    return pipe.transform(new Date(), 'yyyyMMddhhmmss');
  }
  restBtn: boolean = false;
  mailOption: string = '';
  searchEmailConf() {
    if (
      (this.searchModal.buId == undefined || this.searchModal.buId == '') &&
      (this.searchModal.purpose == undefined ||
        this.searchModal.purpose == '') &&
      (this.searchModal.email == undefined || this.searchModal.email == '') &&
      (this.searchModal.toDateTime == undefined ||
        this.searchModal.toDateTime == '') &&
      (this.searchModal.fromDateTime == undefined ||
        this.searchModal.fromDateTime == '')
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

    if (this.mailOption == 'to') {
      this.searchModal.to = this.searchModal.email;
      this.searchModal.cc = undefined;
      this.searchModal.bcc = undefined;
    } else if (this.mailOption == 'cc') {
      this.searchModal.cc = this.searchModal.email;
      this.searchModal.to = undefined;
      this.searchModal.bcc = undefined;
    } else if (this.mailOption == 'bcc') {
      this.searchModal.bcc = this.searchModal.email;
      this.searchModal.to = undefined;
      this.searchModal.cc = undefined;
    }

    this.reportService
      .searchEmailConfForDownload(this.searchModal)
      .subscribe((data) => {
        this.loader = 0;
        console.log(data);
        this.handlePageChange(1);
        this.emailList = data;
        this.emailListCount = this.emailList.length;
        this.searchModal.fromDateTime =
          this.searchModal.fromDateTime.split('T')[0];
        this.searchModal.toDateTime = this.searchModal.toDateTime.split('T')[0];
      });
  }
}
