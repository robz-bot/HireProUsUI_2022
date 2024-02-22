import { DatePipe } from '@angular/common';
import { BusinessUnit } from '../../../Models/BusinessUnit';
import { Component, OnInit } from '@angular/core';
import { UserReg } from 'src/app/Models/UserReg';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { ReportServiceService } from 'src/app/Services/ReportServices/report-service.service';
import { UserRegServicesService } from 'src/app/Services/UserRegServices/user-reg-services.service';
import * as FileSaver from 'file-saver';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import { Roles } from 'src/app/Models/Roles';
import { UserRegSearch } from 'src/app/Models/UserRegSearch';
@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponent implements OnInit {

  constructor(
    private mserv: MasterserviceService,
    private alertify: AlertifyService,
    private reportService: ReportServiceService,
    private userServ: UserRegServicesService,
    
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
    console.log("User Report");
    this.loadrole();
    this.loadbu();
     this.loadUserReg();
    this.loadDate();
    this.loggedInUserId = sessionStorage.getItem('currentUserId');
  }

  userReglist: UserReg[];
  userListForDdl: UserReg[];
  userListLength: number;

/**
   * Loads users
   */
  loadUserReg() {
    this.loader = 1;
    this.userServ.getUsersList().subscribe((data) => {
      this.userReglist = data;
      this.userListForDdl = data;
      this.userListLength = this.userReglist.length;
      this.loader = 0;
      console.log(this.userReglist);
    });
  }

  todayDate: Date;
  loadDate() {
    this.todayDate = new Date();
    console.log(this.todayDate);
  }

  ShowFilterDiv: boolean = false;
  searchModal: UserReg = new UserReg();
  searchUsr: UserRegSearch = new UserRegSearch();
  showFilter() {
    this.ShowFilterDiv = true;
  }

  closeFilter() {
    this.loadUserReg();
    this.resetFilter();
    this.ShowFilterDiv = false;
  }

  resetFilter() {
    
   this.searchModal.buId = undefined;
    this.searchModal.roleId = undefined;
    this.searchModal.panelMember = undefined;
    this.searchModal.sex = undefined;
    this.searchModal.name = undefined;
    this.searchModal.location = '';
    this.searchModal.email = '';
    this.loadUserReg();
  }

  downloadUsersDetails() {
    this.loader = 1;
    console.log(this.userReglist);
    this.reportService
      .downloadUsersDetails(this.userReglist)
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
      'User_Report_' + this.getCurrentDateTime() + '.xlsx'
    );
  }

  getCurrentDateTime(): string {
    const pipe = new DatePipe('en-US');
    return pipe.transform(new Date(), 'yyyyMMddhhmmss');
  }
  gotoToBack() {
    history.back();
  }
  restBtn: boolean = false;
  searchUser() {
    if (
      this.searchModal.buId == undefined &&
      this.searchModal.location == '' &&
      this.searchModal.email == '' &&
      this.searchModal.name == '' &&
      this.searchModal.panelMember == undefined &&
      this.searchModal.roleId == undefined &&
      this.searchModal.sex == undefined
    ) {
      this.restBtn = false;
      this.alertify.errorMsg('Select any one Criteria');
      return;
    }

    this.loader = 1;

    this.reportService
      .searchUsersForDownload(this.searchModal)
      .subscribe((data) => {
        this.loader = 0;
        console.log(data);
        this.handlePageChange(1);
        this.userReglist = data;
        this.userListLength = this.userReglist.length;
      });
  }

  rolelist: Roles[];
  loadrole() {
    this.mserv.getRolesList().subscribe((data) => {
      this.rolelist = data;
      this.rolelist = this.rolelist.sort((a, b) =>
        a.roleName.localeCompare(b.roleName)
      );
    });
  }

  //Load Dropdown Values
  bulist: BusinessUnit[];
  loadbu() {
    this.mserv.getBUList().subscribe((data) => {
      this.bulist = data;
      this.bulist = this.bulist.sort((a, b) =>
        a.businessUnitName.localeCompare(b.businessUnitName)
      );
      console.log(this.bulist);
    });
  }

  // Textbox validating Functions
  /**
   * Onlys uppercase and lowecase letters
   * @param event
   */
  onlyAlphaLowerCase(event) {
    var inputValue = event.charCode;
    if (
      !(inputValue >= 65 && inputValue <= 90) &&
      !(inputValue >= 97 && inputValue <= 122) &&
      inputValue != 32 &&
      inputValue != 0
    ) {
      event.preventDefault();
    }
  }
  onPaste(event: ClipboardEvent): void {
    
    const pastedData = event.clipboardData?.getData('text/plain');

    // Allow only text (letters) in the pasted data
    const filteredText = pastedData
      ?.split('')
      .filter(char => char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 122 && char.charCodeAt(0) != 32 && char.charCodeAt(0) != 0)
      .join('');
      this.searchModal.name = filteredText;
    //candidate.keyword
    
    event.preventDefault();
  }

}
