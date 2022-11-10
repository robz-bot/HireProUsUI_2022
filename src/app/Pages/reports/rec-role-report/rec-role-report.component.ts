import { Component, OnInit } from '@angular/core';
import { recrole } from 'src/app/Models/RecRoles';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import * as FileSaver from 'file-saver';
import { DatePipe } from '@angular/common';
import { ReportServiceService } from 'src/app/Services/ReportServices/report-service.service';

@Component({
  selector: 'app-rec-role-report',
  templateUrl: './rec-role-report.component.html',
  styleUrls: ['./rec-role-report.component.css'],
})
export class RecRoleReportComponent implements OnInit {
  constructor(
    private mserv: MasterserviceService,
    private alertify: AlertifyService,
    private reportService: ReportServiceService
  ) {}
  loader: number = 0;

  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  /**
   * Handles page change
   * @param event
   */
  handlePageChange(event): void {
    this.page = event;
  }
  /**
   * Handles page size change
   * @param event
   */
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }
  ngOnInit(): void {
    this.loadrecroles();
    this.loadDate();
  }
  recroleList: recrole[];
  /**
   * Loadrecroles rec roles component
   */
  loadrecroles() {
    this.loader = 1;
    this.mserv.getrecroleList().subscribe((data) => {
      this.recroleList = data;
      this.recroleListCount = this.recroleList.length;
      this.loader = 0;
      //console.log(this.recroleList);
    });
  }

  todayDate: Date;
  loadDate() {
    this.todayDate = new Date();
    console.log(this.todayDate);
  }

  ShowFilterDiv: boolean = false;
  searchModal: recrole = new recrole();

  showFilter() {
    this.ShowFilterDiv = true;
  }

  closeFilter() {
    this.loadrecroles();
    this.resetFilter();
    this.ShowFilterDiv = false;
  }

  resetFilter() {
    this.loadrecroles();
    this.searchModal.recruitmentRoleName = undefined;
    this.searchModal.fromDateTime = undefined;
    this.searchModal.toDateTime = undefined;
  }

  downloadRecruitmentRoleDetails() {
    this.loader = 1;
    console.log(this.recroleList);
    this.reportService
      .downloadRecruitmentRoleDetails(this.recroleList)
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
      'RecruitmentRole_Report_' + this.getCurrentDateTime() + '.xlsx'
    );
  }

  getCurrentDateTime(): string {
    const pipe = new DatePipe('en-US');
    return pipe.transform(new Date(), 'yyyyMMddhhmmss');
  }
  restBtn: boolean = false;
  recroleListCount: number;
  searchRecruitmentRole() {
    if (
      (this.searchModal.recruitmentRoleName == undefined ||
        this.searchModal.recruitmentRoleName == '') &&
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

    this.reportService
      .searchRecruitmentRoleForDownload(this.searchModal)
      .subscribe((data) => {
        this.loader = 0;
        console.log(data);
        this.handlePageChange(1);
        this.recroleList = data;
        this.recroleListCount = this.recroleList.length;
        this.searchModal.fromDateTime =
          this.searchModal.fromDateTime.split('T')[0];
        this.searchModal.toDateTime = this.searchModal.toDateTime.split('T')[0];
      });
  }
}
