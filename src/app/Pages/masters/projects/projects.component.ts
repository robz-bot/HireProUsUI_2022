/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { BusinessUnit } from './../../../Models/BusinessUnit';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import { Component, OnInit } from '@angular/core';
import { project } from 'src/app/Models/Projects';
import { customer } from 'src/app/Models/Customers';
import { NgForm } from '@angular/forms';
declare function closeModal(): any;
declare function highlightMasters(): any;
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
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
    // this.loadprojects();
  }
  /**
   * Handles page size change
   * @param event
   */
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    // this.loadprojects();
  }
  ngOnInit(): void {
    highlightMasters();

    this.project.customerId = undefined;
    this.project.businessUnitId = undefined;
    this.project.projStatus = 'Active';
    this.clearProjectFields();
    this.loadprojects();
    this.loadBu();
    this.loadCus();
    this.loggedInUserId = sessionStorage.getItem('currentUserId');
  }
  projectList: project[];
  /**
   * Loadprojects projects component
   */
  loadprojects() {
    this.loader = 1;
    this.mserv.getprojectList().subscribe((data) => {
      this.projectList = data;
      this.loader = 0;
      console.log(this.projectList);
    });
  }
  /**
   * Searchs project
   * @param f
   * @returns
   */
  searchProject(f: NgForm) {
    if (
      this.project.keyword == '' ||
      this.project.keyword == null ||
      this.project.keyword == undefined
    ) {
      this.alertify.errorMsg('Project Name is Required!');
      return;
    }

    if (f.form.valid) {
      this.loader = 1;
      this.mserv.searchprojectByKey(this.project.keyword).subscribe((data) => {
        this.handlePageChange(1);
        this.projectList = data;
        this.loader = 0;
        //console.log(data);
      });
    }
  }

  bulist: BusinessUnit[];
  /**
   * Loads bu
   */
  loadBu() {
    this.mserv.getBUList().subscribe((data) => {
      this.bulist = data;
      this.bulist = this.bulist.sort((a, b) =>
        a.businessUnitName.localeCompare(b.businessUnitName)
      );
    });
    this.clearProjectFields();
  }
  cuslist: customer[];
  /**
   * Loads cus
   */
  loadCus() {
    this.mserv.getCustomersList().subscribe((data) => {
      this.cuslist = data;
      this.cuslist = this.cuslist.sort((a, b) =>
        a.customerName.localeCompare(b.customerName)
      );
    });
  }

  project: project = new project();
  datares: any;
  /**
   * Adds newproject
   * @param f
   */
  addNewproject(f: NgForm) {
    console.log(f.form.value);
    if (f.form.valid) {
      this.loader = 1;
      this.project.createdBy = this.loggedInUserId;
      this.project.updatedBy = this.loggedInUserId;
      this.project.projectName = this.project.projectName.trim();

      this.mserv.newproject(this.project).subscribe((data) => {
        //console.log(data);
        this.datares = data;
        this.loader = 0;
        if (this.datares.status == 1) {
          this.alertify.errorMsg(this.datares.message);
        } else {
          closeModal();
          this.alertify.successMsg('Record');

          f.resetForm();
          this.loadprojects();
        }
      });
    }
  }
  /**
   * Clears project fields
   */
  clearProjectFields() {
    this.project.projectName = '';
    this.project.keyword = '';
    this.project.customerId = undefined;
    this.project.businessUnitId = undefined;
    this.project.projStatus = 'Active';

    this.loadprojects();
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
    this.mserv.getprojectById(id).subscribe((data) => {
      this.project = data;
      this.loader = 0;
      //console.log(data);
    });
  }
  apidata: any;
  /**
   * Updates project
   * @param f
   */
  updateProject(f: NgForm) {
    //console.log(this.project);

    if (f.form.valid) {
      this.loader = 1;
      if (this.project.id == this.updateid) {
        this.project.updatedBy = this.loggedInUserId;
        this.project.projectName = this.project.projectName.trim();
        this.mserv.updateproject(this.project).subscribe((data) => {
          //console.log(data);
          this.apidata = data;
          this.loader = 0;
          if (this.apidata.status == 1) {
            this.alertify.errorMsg(this.apidata.message);
          } else {
            closeModal();
            this.alertify.updatedMsg('Record');
            f.resetForm();
            this.loadprojects();
          }
        });
      }
    }
    this.loadprojects();
  }
  /**
   * Deleteprojects projects component
   * @param id
   * @param projName
   */
  deleteproject(id, projName) {
    this.loader = 1;
    //console.log(id);
    this.mserv.deleteproject(id).subscribe((data) => {
      //console.log(data);
      this.loader = 0;
      this.alertify.deleteMsg(projName);
      this.loadprojects();
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
    f.resetForm({
      businessUnitId: 'undefined',
      customerId: 'undefined',
    });
  }
}
