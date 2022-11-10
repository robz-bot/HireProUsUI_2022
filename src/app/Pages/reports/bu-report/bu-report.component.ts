import { Component, OnInit } from '@angular/core';
import { BusinessUnit } from 'src/app/Models/BusinessUnit';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import { ReportServiceService } from 'src/app/Services/ReportServices/report-service.service';
import * as FileSaver from 'file-saver';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-bu-report',
  templateUrl: './bu-report.component.html',
  styleUrls: ['./bu-report.component.css'],
})
export class BuReportComponent implements OnInit {
  constructor(
    private mserv: MasterserviceService,
    private alertify: AlertifyService,
    private reportService: ReportServiceService
  ) {}

  ngOnInit(): void {
    this.loadbu();
    this.loadDate();
  }
  loggedInUserId: string;
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

  buList: BusinessUnit[];
  buListCount: number;
  /**
   * Loadbus bu component
   */
  loadbu() {
    this.loader = 1;
    this.mserv.getBUList().subscribe((data) => {
      this.buList = data;
      this.buListCount = this.buList.length;
      console.log(this.buList);
      this.loader = 0;
    });
  }

  todayDate: Date;
  loadDate() {
    this.todayDate = new Date();
    console.log(this.todayDate);
  }

  ShowFilterDiv: boolean = false;
  searchModal: BusinessUnit = new BusinessUnit();

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
    this.searchModal.businessUnitName = undefined;
    this.searchModal.fromDateTime = undefined;
    this.searchModal.toDateTime = undefined;
  }

  downloadBusinessUnitDetails() {
    this.loader = 1;
    console.log(this.buList);
    this.reportService
      .downloadBusinessUnitDetails(this.buList)
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
      'BusinessUnit_Report_' + this.getCurrentDateTime() + '.xlsx'
    );
  }

  getCurrentDateTime(): string {
    const pipe = new DatePipe('en-US');
    return pipe.transform(new Date(), 'yyyyMMddhhmmss');
  }
  restBtn: boolean = false;
  searchCustomer() {
    if (
      (this.searchModal.businessUnitName == undefined ||
        this.searchModal.businessUnitName == '') &&
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
      .searchBusinessUnitForDownload(this.searchModal)
      .subscribe((data) => {
        this.loader = 0;
        console.log(data);
        this.handlePageChange(1);
        this.buList = data;
        this.buListCount = this.buList.length;
        this.searchModal.fromDateTime =
          this.searchModal.fromDateTime.split('T')[0];
        this.searchModal.toDateTime = this.searchModal.toDateTime.split('T')[0];
      });
  }
}
