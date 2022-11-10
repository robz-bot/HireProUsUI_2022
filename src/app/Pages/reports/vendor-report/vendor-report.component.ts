import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { DatePipe } from '@angular/common';
import { ResourceMgntServiceService } from 'src/app/Services/ResourceMgntServices/resource-mgnt-service.service';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { BusinessUnit } from 'src/app/Models/BusinessUnit';
import { employeeDetails } from 'src/app/Models/EmployeeDetails';
import { VendorServiceService } from 'src/app/Services/VendorServices/vendor-service.service';
import { vendor } from 'src/app/Models/vendor';
import { ReportServiceService } from 'src/app/Services/ReportServices/report-service.service';
@Component({
  selector: 'app-vendor-report',
  templateUrl: './vendor-report.component.html',
  styleUrls: ['./vendor-report.component.css'],
})
export class VendorReportComponent implements OnInit {
  constructor(
    private rmserv: ResourceMgntServiceService,
    private mserv: MasterserviceService,
    private alertify: AlertifyService,
    private vserv: VendorServiceService,
    private reportService: ReportServiceService
  ) {}

  ngOnInit(): void {
    this.getAllVendors();
    this.getAllVendorsIds();
    this.loadDate();
  }

  todayDate: Date;
  loadDate() {
    this.todayDate = new Date();
    console.log(this.todayDate);
  }
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15, 20];
  /**
   * Handles page change
   * @param event
   */
  handlePageChange(event): void {
    this.page = event;
  }
  /**
   * Handles page size change
   * @param value
   */
  handlePageSizeChange(value): void {
    //this.pageSize = event.target.value;
    this.pageSize = value;
    this.page = 1;
  }

  vendorList: any;
  vendorListCount: number;
  /**
   * Gets all vendors
   */
  getAllVendors(): void {
    this.vserv.getAllVendors().subscribe((data) => {
      console.log(data);
      this.vendorList = data;
      this.vendorListCount = this.vendorList.length;
    });
  }

  vendorIdsList: string[];
  /**
   * Gets all vendors ids
   */
  getAllVendorsIds(): void {
    this.vserv.getAllVendorIds().subscribe((data) => {
      console.log(data);
      this.vendorIdsList = data;
    });
  }

  loader: number = 0;
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

    this.getAllVendors();
  }

  downloadVendorDetails() {
    this.reportService.downloadVendor(this.vendorList).subscribe((data) => {
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
      'vendor_' + this.getCurrentDateTime() + '.xlsx'
    );
  }

  /**
   * Finds details
   * @param data
   * @returns
   */
  findDetails(data) {
    return this.vendorList.filter((x) => x.id === data.id);
  }

  searchModal: vendor = new vendor();
  restBtn: boolean = false;
  /**
   * Searchs resource mgmt
   * @returns
   */
  searchVendor() {
    if (
      (this.searchModal.vendorId == undefined ||
        this.searchModal.vendorId == '') &&
      this.searchModal.vendorName == undefined &&
      this.searchModal.vendorName == undefined &&
      this.searchModal.location == undefined &&
      this.searchModal.location == undefined &&
      (this.searchModal.email == undefined || this.searchModal.email == '') &&
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
      .searchVendorForReport(this.searchModal)
      .subscribe((data) => {
        this.loader = 0;
        console.log(data);
        this.handlePageChange(1);
        this.vendorList = data;
        this.vendorListCount = this.vendorList.length;
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
      this.searchVendor();
    }
  }
}
