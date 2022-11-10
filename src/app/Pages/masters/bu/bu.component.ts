/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { NgForm } from '@angular/forms';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import { Component, OnInit } from '@angular/core';
import { BusinessUnit } from 'src/app/Models/BusinessUnit';
import { UserRegServicesService } from 'src/app/Services/UserRegServices/user-reg-services.service';
declare function closeModal(): any;
declare function highlightMasters(): any;

@Component({
  selector: 'app-bu',
  templateUrl: './bu.component.html',
  styleUrls: ['./bu.component.css'],
})
export class BuComponent implements OnInit {
  constructor(
    private mserv: MasterserviceService,
    private alertify: AlertifyService,
    private userv: UserRegServicesService
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
    this.loadbu();
    this.loadManagers();
    this.loggedInUserId = sessionStorage.getItem('currentUserId');
  }
  buList: BusinessUnit[];
  /**
   * Loadbus bu component
   */
  loadbu() {
    this.loader = 1;
    this.bu.keyword = '';
    this.mserv.getBUList().subscribe((data) => {
      this.buList = data;
      console.log(this.buList);
      this.loader = 0;
    });
  }
  /**
   * Searchbus bu component
   * @param f
   * @returns
   */
  searchbu(f: NgForm) {
    console.log(this.bu.keyword);
    if (
      this.bu.keyword == null ||
      this.bu.keyword == '' ||
      this.bu.keyword == undefined
    ) {
      this.alertify.errorMsg('Business Unit Name is Required!');
      return;
    }
    if (
      this.bu.keyword != null ||
      this.bu.keyword != undefined ||
      this.bu.keyword != ''
    ) {
      this.loader = 1;
      this.mserv.searchBUByKey(this.bu.keyword).subscribe((data) => {
        this.handlePageChange(1);
        this.buList = data;
        this.loader = 0;
        console.log(data);
      });
    }
  }

  dataStatus: any;
  bu: BusinessUnit = new BusinessUnit();
  /**
   * Adds newbu
   * @param f
   */
  addNewbu(f: NgForm) {
    console.log(this.bu);
    if (f.form.valid) {
      this.loader = 1;
      this.bu.updatedBy = this.loggedInUserId;
      this.bu.createdBy = this.loggedInUserId;
      this.bu.businessUnitName = this.bu.businessUnitName.trim();
      this.mserv.newBU(this.bu).subscribe((data) => {
        console.log(data);
        this.dataStatus = data;
        this.loader = 0;
        if (this.dataStatus.status == 1) {
          this.alertify.errorMsg(this.dataStatus.message);
        } else {
          this.alertify.successMsg('Record');
          this.loadbu();
          closeModal();

          this.clearBUField();
        }
      });
    }
  }

  updateid: string;
  /**
   * Gets id
   * @param id
   */
  getId(id) {
    this.loader = 1;
    console.log(id);
    this.loadManagers();
    this.updateid = id;
    this.mserv.getBUById(id).subscribe((data) => {
      this.bu = data;
      this.loader = 0;
      console.log(data);
    });
  }
  apidata: any;
  /**
   * Updatebus bu component
   * @param f
   */
  updatebu(f: NgForm) {
    console.log(this.bu);
    if (f.form.valid) {
      this.loader = 1;
      if (this.bu.id == this.updateid) {
        this.bu.updatedBy = this.loggedInUserId;
        this.bu.businessUnitName = this.bu.businessUnitName.trim();
        this.mserv.updateBU(this.bu).subscribe((data) => {
          console.log(data);
          this.apidata = data;
          this.loader = 0;
          if (this.apidata.status == 1) {
            this.alertify.errorMsg(this.apidata.message);
          } else {
            closeModal();
            this.alertify.updatedMsg('Record');
            f.resetForm(); //added on 10/9/2021
            this.loadbu();
          }
        });
      }
    }
    this.loadbu();
  }
  /**
   * Clears bufield
   */
  clearBUField() {
    this.bu.businessUnitName = ' ';
    this.bu.buShortName = '';
  }

  deleteData: any;
  /**
   * Deletebus bu component
   * @param id
   * @param bu
   */
  deletebu(id, bu) {
    this.loader = 1;
    console.log(id);
    this.mserv.deleteBU(id).subscribe((data) => {
      this.loader = 0;
      this.deleteData = data;
      if (this.deleteData.status == 1) {
        this.alertify.errorMsg(this.deleteData.message);
      } else {
        console.log(data);
        this.alertify.deleteMsg(bu);
        this.loadbu();
      }
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
  managersList: any[] =[];
  user : any;
  loadManagers(){
    // this.loader = 1;
    // this.count = 0;
    this.userv.getUsersList().subscribe((data) => {
      for(let i=0; i<data.length; i++){
        if(data[i].roleName ==  "BU Head" || data[i].roleName == "Sales Manager" ||
        data[i].roleName == "Delivery Manager" || data[i].roleName == "Recruitment Manager"){
          this.user = data[i];
          // this.count++;
          // console.log(this.count);
          this.managersList.push(this.user);
        }
      }
      // this.managersList = data;
      console.log(this.managersList);
      // this.loader = 0;
    });
  }
}
