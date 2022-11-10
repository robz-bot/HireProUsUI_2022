/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { NgForm } from '@angular/forms';
import { recrole } from './../../../Models/RecRoles';
import { Component, OnInit } from '@angular/core';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
declare function closeModal(): any;
declare function highlightMasters(): any;
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
@Component({
  selector: 'app-rec-roles',
  templateUrl: './rec-roles.component.html',
  styleUrls: ['./rec-roles.component.css'],
})
export class RecRolesComponent implements OnInit {
  constructor(
    private mserv: MasterserviceService,
    private alertify: AlertifyService
  ) {}
  loggedInUserId: string;
  loader: number = 0;

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
   * @param event
   */
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }
  ngOnInit(): void {
    highlightMasters();

    this.loadrecroles();
    this.loggedInUserId = sessionStorage.getItem('currentUserId');
  }
  recroleList: recrole[];
  /**
   * Loadrecroles rec roles component
   */
  loadrecroles() {
    this.loader = 1;
    this.recrole.keyword = '';
    this.mserv.getrecroleList().subscribe((data) => {
      this.recroleList = data;
      this.loader = 0;
      //console.log(this.recroleList);
    });
  }
  /**
   * Searchs rec role
   * @param f
   * @returns
   */
  searchRecRole(f: NgForm) {
    //console.log(this.recrole.keyword);
    if (
      this.recrole.keyword == null ||
      this.recrole.keyword == '' ||
      this.recrole.keyword == undefined
    ) {
      this.alertify.errorMsg('Recruitment Role is Required!');
      return;
    }
    if (f.form.valid) {
      this.loader = 1;
      this.mserv.searchrecroleByKey(this.recrole.keyword).subscribe((data) => {
        this.handlePageChange(1);
        this.recroleList = data;
        this.loader = 0;
        //console.log(data);
      });
    }
  }

  recrole: recrole = new recrole();
  datares: any;
  /**
   * Adds newrecrole
   * @param f
   */
  addNewrecrole(f: NgForm) {
    //console.log(this.recrole);
    if (f.form.valid) {
      this.loader = 1;
      this.recrole.createdBy = this.loggedInUserId;
      this.recrole.updatedBy = this.loggedInUserId;
      this.recrole.recruitmentRoleName =
        this.recrole.recruitmentRoleName.trim();
      this.mserv.newrecrole(this.recrole).subscribe((data) => {
        //console.log(data);
        this.datares = data;
        this.loader = 0;
        if (this.datares.status == 1) {
          this.alertify.errorMsg(this.datares.message);
        } else {
          closeModal();
          this.alertify.successMsg('Record');
          this.loadrecroles();
          this.clearRecRoleFields();
        }
      });
    }
  }
  /**
   * Clears rec role fields
   */
  clearRecRoleFields() {
    this.recrole.recruitmentRoleName = ' ';
  }
  updateid: string;
  /**
   * Gets id
   * @param id
   */
  getId(id) {
    this.loader = 1;
    //console.log(id);
    this.updateid = id;
    this.mserv.getrecroleById(id).subscribe((data) => {
      this.recrole = data;
      this.loader = 0;
      //console.log(this.recrole);
    });
  }

  apidata: any;
  /**
   * Updaterecroles rec roles component
   * @param f
   */
  updaterecrole(f: NgForm) {
    //console.log(this.recrole);

    if (f.form.valid) {
      this.loader = 1;
      if (this.recrole.id == this.updateid) {
        this.recrole.updatedBy = this.loggedInUserId;
        this.recrole.recruitmentRoleName =
          this.recrole.recruitmentRoleName.trim();
        this.mserv.updaterecrole(this.recrole).subscribe((data) => {
          //console.log(data);
          this.apidata = data;
          this.loader = 0;
          if (this.apidata.status == 1) {
            this.alertify.errorMsg(this.apidata.message);
          } else {
            closeModal();
            f.resetForm();
            this.alertify.updatedMsg('Record');
            this.loadrecroles();
          }
        });
      }
    }
    this.loadrecroles();
  }

  /**
   * Deleterecroles rec roles component
   * @param id
   * @param recRole
   */
  deleterecrole(id, recRole) {
    this.loader = 1;
    //console.log(id);
    this.mserv.deleterecrole(id).subscribe((data) => {
      //console.log(data);
      this.loader = 0;
      this.alertify.deleteMsg(recRole);
      this.loadrecroles();
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
