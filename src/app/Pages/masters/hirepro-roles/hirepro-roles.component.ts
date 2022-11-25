/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { LoginServicesService } from './../../../Services/LoginServices/login-services.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Roles } from 'src/app/Models/Roles';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
// import { Subscription } from 'rxjs';
declare function closeModal(): any;
declare function highlightMasters(): any;
declare function showHideRow(row): any;

@Component({
  selector: 'app-hirepro-roles',
  templateUrl: './hirepro-roles.component.html',
  styleUrls: ['./hirepro-roles.component.css'],
})
export class HireproRolesComponent implements OnInit {
  constructor(
    private mserv: MasterserviceService,
    private alertify: AlertifyService,
    private lserv: LoginServicesService
  ) {}
  /**
   * Expands hirepro roles component
   * @param row
   */
  expand(row) {
    showHideRow(row);
  }

  expandContent = true;
  /**
   * Finds details
   * @param data
   * @returns
   */
  findDetails(data) {
    return this.roleList.filter((x) => x.roleName === data.roleName);
  }

  loggedInUserId: any;
  roleList: Roles[];
  datares: any;
  updateid: string;
  role: Roles = new Roles();
  apidata: any;
  loader: number = 0;

  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15, 20];
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

  ngOnInit(): void {
    this.loadRoles();
    highlightMasters();

    this.loggedInUserId = sessionStorage.getItem('currentUserId');
  }

  // subscription: Subscription;
  /**
   * Loads roles
   */
  loadRoles() {
    this.loader = 1;
    this.role.keyword = '';
     this.mserv.getRolesList().subscribe((data) => {
      this.roleList = data;
      console.log(this.roleList);
      this.loader = 0;
    });
  }
  /**
   * Adds new role
   * @param f
   */
  addNewRole(f: NgForm) {
    //console.log(f.form.value);
    if (f.form.valid) {
      this.loader = 1;
      //console.log(this.loggedInUserId);
      this.role.createdBy = this.loggedInUserId;
      this.role.updatedBy = this.loggedInUserId;
      this.role.roleName = this.role.roleName.trim();
      this.savenewrole(this.role);
    }
  }
  /**
   * Savenewroles hirepro roles component
   * @param role
   */
  savenewrole(role) {
    this.role.roleName = this.role.roleName.trim();
    this.mserv.newRole(role).subscribe((data) => {
      //console.log(data);
      this.datares = data;
      this.loader = 0;
      if (this.datares.status == 1) {
        this.alertify.errorMsg(this.datares.message);
      } else {
        closeModal();
        this.alertify.successMsg('Record');
        this.loadRoles();
        this.clearRolesFiled();
      }
    });
  }
  /**
   * Searchs role
   * @param f
   * @returns
   */
  searchRole(f: NgForm) {
    //console.log(this.role.keyword);
    if (
      this.role.keyword == null ||
      this.role.keyword == '' ||
      this.role.keyword == undefined
    ) {
      this.alertify.errorMsg(' Role Name is Required!');
      return;
    }
    if (f.form.valid) {
      this.loader = 1;
      this.mserv.searchRoleByKey(this.role.keyword).subscribe((data) => {
        this.handlePageChange(1);
        this.roleList = data;
        this.loader = 0;
        //console.log(data);
      });
    }
  }
  /**
   * Gets id
   * @param id
   */
  getId(id) {
    //console.log(id);
    this.loader = 1;
    this.updateid = id;
    this.mserv.getRoleById(id).subscribe((data) => {
      this.role = data;
      this.loader = 0;
    });
    //console.log(this.role);
  }
  /**
   * Updates role
   * @param f
   */
  updateRole(f: NgForm) {
    //console.log(f.form.status);
    //console.log(this.updateid);
    if (f.form.valid) {
      this.loader = 1;
      this.role.updatedBy = this.loggedInUserId;
      this.role.roleName = this.role.roleName.trim();
      if (this.role.id == this.updateid) {
        this.mserv.updateRole(this.role).subscribe((data) => {
          //console.log(data);
          this.apidata = data;
          this.loader = 0;
          if (this.apidata.status == 1) {
            this.alertify.errorMsg(this.apidata.message);
          } else {
            closeModal();
            this.alertify.updatedMsg('Record');
            this.loadRoles();
            this.clearRolesFiled();
          }
        });
      }
    }
    this.loadRoles();
  }
  /**
   * Clears roles filed
   */
  clearRolesFiled() {
    this.role.roleName = ' ';
  }
  /**
   * Deletes role
   * @param id
   * @param roleName
   */
  deleteRole(id, roleName) {
    this.loader = 1;
    //console.log(id);
    this.mserv.deleteRole(id).subscribe((data) => {
      //console.log(data);
      this.loader = 0;
      this.alertify.deleteMsg(roleName);
      this.loadRoles();
    });
  }
  // Textbox validating Functions
  /**
   * Onlys alpha space
   * @param event
   */
  onlyAlphaSpace(event) {
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
  /**
   * Resets form
   * @param f
   */
  resetForm(f: NgForm) {
    f.resetForm();
  }
}
