import { Component, OnInit } from '@angular/core';
import { BusinessUnit } from 'src/app/Models/BusinessUnit';
import { employeeDetails } from 'src/app/Models/EmployeeDetails';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import { ResourceMgntServiceService } from 'src/app/Services/ResourceMgntServices/resource-mgnt-service.service';
import * as FileSaver from 'file-saver';
import { DatePipe } from '@angular/common';
import { ReportServiceService } from 'src/app/Services/ReportServices/report-service.service';
@Component({
  selector: 'app-resource-management-report',
  templateUrl: './resource-management-report.component.html',
  styleUrls: ['./resource-management-report.component.css'],
})
export class ResourceManagementReportComponent implements OnInit {
  constructor(
    private rmserv: ResourceMgntServiceService,
    private mserv: MasterserviceService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.getAllResourceMgmts();
    this.getAllWorkOrderNumbers();
    this.getAllEmployeeIds();
    this.loadBu();
    this.getCurrentDateTime();
    this.loadDate();
  }

  todayDate: Date;
  loadDate() {
    this.todayDate = new Date();
    console.log(this.todayDate);
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
  }
  /**
   * Handles page size change
   * @param event
   */
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
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
    this.searchModal.buId = undefined;
    this.searchModal.projectAllocation = undefined;
    this.searchModal.employeeId = undefined;
    this.searchModal.workOrderNumber = undefined;
    this.searchModal.resourceStatus = undefined;
    this.searchModal.fullName = '';

    this.getAllResourceMgmts();
  }

  allResources: any;
  allResourcesCount: number;
  /**
   * Gets all resource mgmts
   */
  getAllResourceMgmts() {
    this.loader = 1;
    this.rmserv.getAllResourceMgmts().subscribe((data) => {
      this.loader = 0;
      console.log(data);
      this.allResources = data;
      this.allResourcesCount = this.allResources.length;
    });
  }

  downloadResourceDetails() {
    this.rmserv.downloadResourceDetails(this.allResources).subscribe((data) => {
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
      'Resource_Report_' + this.getCurrentDateTime() + '.xlsx'
    );
  }

  bulist: BusinessUnit[];
  /**
   * Loads bu
   */
  loadBu() {
    this.mserv.getBUList().subscribe((data) => {
      this.bulist = data;
      console.log('BU: ' + data);
      this.bulist = this.bulist.sort((a, b) =>
        a.businessUnitName.localeCompare(b.businessUnitName)
      );
    });
  }
  /**
   * Finds details
   * @param data
   * @returns
   */
  findDetails(data) {
    return this.allResources.filter((x) => x.id === data.id);
  }
  searchModal: employeeDetails = new employeeDetails();
  restBtn: boolean = false;
  /**
   * Searchs resource mgmt
   * @returns
   */
  searchResourceMgmt() {
    if (
      (this.searchModal.fullName == undefined ||
        this.searchModal.fullName == '') &&
      this.searchModal.employeeId == undefined &&
      this.searchModal.buId == undefined &&
      this.searchModal.projectAllocation == undefined &&
      this.searchModal.workOrderNumber == undefined &&
      (this.searchModal.email == undefined || this.searchModal.email == '') &&
      (this.searchModal.fromDateTime == undefined ||
        this.searchModal.fromDateTime == '') &&
      (this.searchModal.toDateTime == undefined ||
        this.searchModal.toDateTime == '') &&
      this.searchModal.resourceStatus == undefined
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

    this.rmserv.searchResourceMgmt(this.searchModal).subscribe((data) => {
      this.loader = 0;
      console.log(data);
      this.handlePageChange(1);
      this.allResources = data;
      this.allResourcesCount = this.allResources.length;
      this.searchModal.fromDateTime =
        this.searchModal.fromDateTime.split('T')[0];
      this.searchModal.toDateTime = this.searchModal.toDateTime.split('T')[0];
      this.allResourcesCount = this.allResources.length;
    });
  }
  allEmpIds: any;
  /**
   * Gets all employee ids
   */
  getAllEmployeeIds(): void {
    this.rmserv.getAllEmployeeIds().subscribe((data) => {
      this.allEmpIds = data;
    });
  }
  allWONum: any;
  /**
   * Gets all work order numbers
   */
  getAllWorkOrderNumbers() {
    this.rmserv.getAllWorkOrderNumbers().subscribe((data) => {
      this.allWONum = data;
    });
  }
  /**
   * Handles key up
   * @param e
   */
  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.searchResourceMgmt();
    }
  }
}
