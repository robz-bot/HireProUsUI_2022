import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { customer } from 'src/app/Models/Customers';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import { ReportServiceService } from 'src/app/Services/ReportServices/report-service.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.css'],
})
export class CustomerReportComponent implements OnInit {
  constructor(
    private mserv: MasterserviceService,
    private alertify: AlertifyService,
    private reportService: ReportServiceService
  ) {}

  loggedInUserId: any;
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
    this.loadCustomer();
    this.loadDate();
    this.loggedInUserId = sessionStorage.getItem('currentUserId');
  }
  cusList: customer[];
  cusListForDdl: customer[];
  cusListLength: number;
  /**
   * Loads customer
   */
  loadCustomer() {
    this.loader = 1;
    this.mserv.getCustomersList().subscribe((data) => {
      this.cusList = data;
      this.cusListForDdl = data;
      this.cusListLength = this.cusList.length;
      this.loader = 0;
      console.log(this.cusList);
    });
  }

  todayDate: Date;
  loadDate() {
    this.todayDate = new Date();
    console.log(this.todayDate);
  }

  ShowFilterDiv: boolean = false;
  searchModal: customer = new customer();

  showFilter() {
    this.ShowFilterDiv = true;
  }

  closeFilter() {
    this.loadCustomer();
    this.resetFilter();
    this.ShowFilterDiv = false;
  }

  resetFilter() {
    this.loadCustomer();
    this.searchModal.customerName = undefined;
    this.searchModal.businessUnitId = undefined;
    this.searchModal.location = '';
    this.searchModal.region = '';
    this.searchModal.fromDateTime = undefined;
    this.searchModal.toDateTime = undefined;
  }

  downloadCustomerDetails() {
    this.loader = 1;
    console.log(this.cusList);
    this.reportService
      .downloadCustomerDetails(this.cusList)
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
      'Customer_Report_' + this.getCurrentDateTime() + '.xlsx'
    );
  }

  getCurrentDateTime(): string {
    const pipe = new DatePipe('en-US');
    return pipe.transform(new Date(), 'yyyyMMddhhmmss');
  }
  restBtn: boolean = false;
  searchCustomer() {
    if (
      (this.searchModal.customerName == undefined ||
        this.searchModal.customerName == '') &&
      (this.searchModal.location == undefined ||
        this.searchModal.location == '') &&
      (this.searchModal.region == undefined || this.searchModal.region == '') &&
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
      .searchCustomerForDownload(this.searchModal)
      .subscribe((data) => {
        this.loader = 0;
        console.log(data);
        this.handlePageChange(1);
        this.cusList = data;
        this.cusListLength = this.cusList.length;
        this.searchModal.fromDateTime =
          this.searchModal.fromDateTime.split('T')[0];
        this.searchModal.toDateTime = this.searchModal.toDateTime.split('T')[0];
      });
  }
}
