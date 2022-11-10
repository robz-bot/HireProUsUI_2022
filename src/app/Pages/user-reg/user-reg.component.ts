/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { AlertifyService } from './../../Services/AlertifyService/alertify.service';
import { UserReg } from 'src/app/Models/UserReg';
import { Roles } from './../../Models/Roles';
import { BusinessUnit } from './../../Models/BusinessUnit';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import { Component, OnInit } from '@angular/core';
import { UserRegServicesService } from 'src/app/Services/UserRegServices/user-reg-services.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { profile } from 'src/app/Services/GlobalConstants';
import { UserRegSearch } from 'src/app/Models/UserRegSearch';
declare function highlightMasters(): any;
declare function closeModal(): any;

@Component({
  selector: 'app-user-reg',
  templateUrl: './user-reg.component.html',
  styleUrls: ['./user-reg.component.css'],
})
export class UserRegComponent implements OnInit {
  constructor(
    private mserv: MasterserviceService,
    private userServ: UserRegServicesService,
    private alertify: AlertifyService,
    private _router: Router
  ) {}
  currentUserId: any;
  loader: number = 0;
  page = 1;
  count = 0;
  pageSize = 4;
  pageSizeList = 5;
  pageSizes = [4, 8, 12, 16];
  pageSizesList = [5, 10, 15, 20];

  handlePageChange(event): void {
    this.page = event;
  }

  handlePageSizeChangeList(value): void {
    this.pageSizeList = value;
    this.page = 1;
  }
  handlePageSizeChange(value): void {
    //this.pageSize = event.target.value;
    this.pageSize = value;
    this.page = 1;
  }

  ngOnInit(): void {
    highlightMasters();

    this.loadbu();
    this.loadrole();
    this.loadUserReg();
    this.currentUserId = sessionStorage.getItem('currentUserId');

    this.enableNewReg = 0;
    this.enableRegList = 1;
    this.enableRegGrid = 0;
  }

  listStyle() {
    var style = {};
    return style;
  }

  gridStyle() {
    var style = {
      'background-color': '#188ae2 !important',
      color: 'white !important',
    };
    return style;
  }

  enableNewReg: number;
  enableRegList: number;
  enableRegGrid: number;
  showNewReg() {
    this.enableNewReg = 1;
    this.enableRegList = 0;
    this.enableRegGrid = 0;
    this.loadddl();
  }
  showRegList() {
    this.handlePageSizeChange(4);
    this.handlePageSizeChangeList(5);
    this.enableNewReg = 0;
    this.enableRegList = 1;
    this.enableRegGrid = 0;
  }
  showRegGrid() {
    this.handlePageSizeChange(4);
    this.handlePageSizeChangeList(5);
    this.enableNewReg = 0;
    this.enableRegList = 0;
    this.enableRegGrid = 1;
  }
  colorCodes: Array<string> = [
    'bg-b-purple',
    'cyan-bgcolor',
    'bg-b-orange',
    'bg-b-green',
    'bg-b-danger',
  ];

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

  rolelist: Roles[];
  loadrole() {
    this.mserv.getRolesList().subscribe((data) => {
      this.rolelist = data;
      this.rolelist = this.rolelist.sort((a, b) =>
        a.roleName.localeCompare(b.roleName)
      );
    });
  }
  isPanelMember(roleid): string {
    var condition = '0';
    this.rolelist.forEach((element) => {
      //console.log(element.roleName);
      if (element.id == roleid && element.roleName == 'Interviewer') {
        console.log(element.roleName);
        condition = '1';
      }
    });
    return condition;
  }

  /**
   * Validates email
   * @param email
   * @returns true if email
   */
  validateEmail(email): boolean {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g;
    return emailRegex.test(String(email.toLowerCase()));
  }

  userReg: UserReg = new UserReg();
  userReglist: any;
  getMessage: any;
  selectedBUForAdd: any[] = [];
  saveNewUser(f: NgForm) {
    // if (this.selectedBUForAdd != null) {
    //   this.userReg.businessUnitId = this.selectedBUForAdd
    //     .filter((x) => x.id)
    //     .map((x) => x.id)
    //     .toString();
    //    this.userReg.buildingBlocksNames = this.selectedBUForAdd
    //     .filter((x) => x.id)
    //     .map((x) => x.name)
    //     .toString();
    // } else {
    //   this.alertify.errorMsg('Business Unit is Required!');
    // }
    console.log(f.form.value);
    //console.log(f.form.valid);
    if (!this.validateEmail(this.userReg.email)) {
      this.alertify.errorMsg('Email is Invalid!');
      return;
    }
    if (this.userReg.contactNumber.length < 10) {
      this.alertify.errorMsg('Contact Number should be atleast 10 digits...');
      return;
    }
    if (f.form.valid) {
      this.loader = 1;
      this.userReg.createdBy = this.currentUserId;
      this.userReg.updatedBy = this.currentUserId;
      this.userReg.firstName = this.userReg.firstName.trim();
      this.userReg.lastName = this.userReg.lastName.trim();

      this.userReg.panelMember = this.isPanelMember(this.userReg.roleId);
      //this.userReg.
      this.userServ.newUser(this.userReg).subscribe((data) => {
        console.log(data);
        this.getMessage = data;
        if (this.getMessage.status == 0) {
          this.loader = 0;
          this.alertify.successMsg('New User');
          this.loadUserReg();
          this.clearUserFields();

          this.enableNewReg = 0;
          this.enableRegList = 1;
        } else {
          this.loader = 0;
          this.alertify.errorMsg(this.getMessage.message);
        }
      });
    }
  }

  clearUserFields() {
    this.userReg.email = ' ';
    this.userReg.firstName = ' ';
    this.userReg.lastName = ' ';
    this.userReg.sex = ' ';
    this.userReg.contactNumber = ' ';
    this.userReg.designation = ' ';
    //this.userReg.businessUnitId = undefined;
    this.userReg.businessUnitId = '-1';
    this.userReg.roleId = '-1';
    this.userReg.skillSet = ' ';
    this.userReg.location = ' ';
  }

  onchangebu(id) {
    this.userReg.roleId = '-1';
    this.loader = 1;
    this.userServ.getAllUsersByBUId(id).subscribe((data) => {
      console.log(data);
      this.userReglist = data;
      this.loader = 0;
      closeModal();
    });
  }

  onchangerole(id) {
    console.log(id);
    this.userReg.businessUnitId = '-1';

    this.loader = 1;
    this.userServ.getAllUsersByRoleId(id).subscribe((data) => {
      console.log(data);
      this.userReglist = data;
      this.loader = 0;
      closeModal();
    });
  }

  resetAll() {
    this.searchUser.roleId = undefined;
    this.searchUser.buId = undefined;
    this.searchUser.panelMember = undefined;
    this.searchUser.sex = undefined;
    this.searchUser.name = '';
    this.searchUser.location = '';
    this.searchUser.email = '';
    this.loadUserReg();
  }

  searchUser: UserRegSearch = new UserRegSearch();
  search(f: NgForm) {
    console.log(f);
    if (
      this.searchUser.buId == undefined &&
      this.searchUser.location == '' &&
      this.searchUser.email == '' &&
      this.searchUser.name == '' &&
      this.searchUser.panelMember == undefined &&
      this.searchUser.roleId == undefined &&
      this.searchUser.sex == undefined
    ) {
      this.alertify.errorMsg('Choose any Filter!');
      return;
    } else {
      this.loader = 1;
      this.userServ.searchUser(this.searchUser).subscribe((data) => {
        console.log(data);
        this.userReglist = data;

        this.loader = 0;

        closeModal();
      });
      this.handlePageChange(1);
    }
  }

  loadddl() {
    this.loadbu();
    this.loadrole();
  }

  loadUserReg() {
    this.loader = 1;
    this.userReg.keyword = '';
    this.userServ.getUsersList().subscribe((data) => {
      this.userReglist = data;
      this.loader = 0;
      //console.log(this.userReglist);
    });
  }

  updateUserReg(id: string) {
    console.log(id);
    profile.updateFrom = true;
    this._router.navigate(['hirepros/update-user-reg', id]);
  }
  deleteResData: any;
  deleteUser(id) {
    this.loader = 1;
    this.userServ.deleteUser(id).subscribe((data) => {
      this.loader = 0;
      this.deleteResData = data;
      if (this.deleteResData.status == 1) {
        this.alertify.errorMsg(this.deleteResData.message);
        return;
      } else {
        this.alertify.deleteMsg('User');
        this.loadUserReg();
      }
    });
  }

  onlyNumber(event) {
    var inputValue = event.charCode;
    if (!(inputValue >= 33 && inputValue <= 57)) {
      event.preventDefault();
    }
  }
  changedManagerName: any;
  chanagedManagerId:any;
  onchangeBu(buId){
    this.loader = 1;
    this.mserv.getBUById(buId).subscribe((data) => {
      this.loader = 0;
      this.userReg.managerId = data.managerId;
      this.changedManagerName = data.managerName;
      console.log(this.changedManagerName)   
    });
  }
}
