/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { AlertifyService } from './../../../Services/AlertifyService/alertify.service';
import { NgForm } from '@angular/forms';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import { Component, OnInit } from '@angular/core';
import { BusinessUnit } from 'src/app/Models/BusinessUnit';
import { UserRegServicesService } from 'src/app/Services/UserRegServices/user-reg-services.service';
import { UserReg } from 'src/app/Models/UserReg';
import { InterviewPanel } from 'src/app/Models/InterviewPanel';
import { Router } from '@angular/router';
declare function scrollDiv(): any;
declare function panelScrollBar(): any;
declare function closeModal(): any;
declare function highlightMasters(): any;
@Component({
  selector: 'app-interview-panel',
  templateUrl: './interview-panel.component.html',
  styleUrls: ['./interview-panel.component.css'],
})
export class InterviewPanelComponent implements OnInit {
  constructor(
    private mserv: MasterserviceService,
    private userv: UserRegServicesService,
    private alertify: AlertifyService,
    private _router: Router
  ) {}

  buUser: BusinessUnit = new BusinessUnit();
  loader: number = 0;

  ngOnInit(): void {
    highlightMasters();

    this.loadbu();
    this.loadPanelList();
    this.getallBUWithPanel();
    panelScrollBar();
  }

  page = 1;
  count = 0;
  pageSize = 4;
  pageSizes = [4, 8, 16, 24];
  /**
   * Handles page change
   * @param event
   */
  handlePageChange(event): void {
    this.page = event;
  }
  /**
   * Handles page size change list
   * @param event
   */
  handlePageSizeChangeList(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }

  BUs: BusinessUnit[];
  /**
   * Loadbus interview panel component
   */
  loadbu() {
    this.mserv.getBUList().subscribe((data) => {
      this.BUs = data;
      this.BUs = this.BUs.sort((a, b) =>
        a.businessUnitName.localeCompare(b.businessUnitName)
      );
      console.log(this.BUs);
    });
  }

  buname: any[];
  /**
   * Loadbus by id
   * @param id
   */
  loadbuById(id) {
    this.loader = 1;
    this.mserv.getBUById(id).subscribe((data) => {
      this.buUser = data;
      console.log('buuser' + data);
      this.loader = 0;
    });
    this.loadusers(id);
  }
  /**
   * Loadusers interview panel component
   */
  loaduser() {
    this.userv.getUsersList().subscribe((data) => {
      this.userlist = data;
      this.userlist = this.userlist.filter((x) => x.active == '1');
    });
  }

  notPanelList: any[];
  /**
   * Loadusers interview panel component
   * @param id
   */
  loadusers(id) {
    this.loader = 1;
    this.userv.getUsersByBUId(id).subscribe((data) => {
      this.userlist = data;
      this.userlist = this.userlist.filter((x) => x.active == '1');
      console.log(this.userlist);
      this.loader = 0;
      this.selectedUser = [];
      this.getbuItemList(this.userlist);
    });
  }

  selectedUser: Array<string> = [];
  /**
   * Getbus item list
   * @param list
   */
  getbuItemList(list) {
    for (var i = 0; i < list.length; i++) {
      console.log(list[i]);
      if (list[i].panelMember == '1') {
        this.selectedUser.push(list[i].id);
      }
    }
  }

  panelList: any;
  availablePanelList: InterviewPanel = new InterviewPanel();
  /**
   * Loads panel list
   */
  loadPanelList() {
    this.loader = 1;
    this.mserv.getAllBUsWithPanel().subscribe((data) => {
      this.panelList = data;
      this.loader = 0;
      this.panelList.forEach((element) => {
        if (element.interviewPanelList.length > 0) {
          this.availablePanelList.businessUnitName = element.businessUnitName;

          this.availablePanelList.interviewPanelList =
            element.interviewPanelList.fullName;
        }
      });
    });
  }
  /**
   * Searchs panel
   * @param f
   * @returns
   */
  searchPanel(f: NgForm) {
    console.log(this.buUser.keyword);
    if (
      this.buUser.keyword == null ||
      this.buUser.keyword == '' ||
      this.buUser.keyword == undefined
    ) {
      this.alertify.errorMsg('User Name is Required!');
      return;
    } else {
      this.loader = 1;
      this.mserv.searchBUByKey(this.buUser.keyword).subscribe((data) => {
        this.handlePageChange(1);
        this.BUPanel = data;
        this.loader = 0;
        console.log(data);
      });
    }
  }

  userlist: any;
  /**
   * Onchanges bu
   * @param id
   */
  onchangeBU(id) {
    this.loader = 1;
    this.userv.getUsersByBUId(id).subscribe((data) => {
      this.userlist = data;
      this.loader = 0;
      console.log(data);
    });
  }

  /**
   * Determines whether user change on
   * @param e
   * @param id
   */
  onUserChange(e, id) {
    if (e.target.checked) {
      if (!this.selectedUser.find((x) => x == id)) {
        this.selectedUser.push(id);
      }
    } else {
      if (this.selectedUser.find((x) => x == id)) {
        this.selectedUser.forEach((value, index) => {
          if (value == id) this.selectedUser.splice(index, 1);
          console.log(this.selectedUser);
        });
      }
    }
    console.log(this.selectedUser);
  }

  getpanel: UserReg[];

  datares: any;
  /**
   * Saves interview panel
   * @param f
   */
  saveInterviewPanel(f: NgForm) {
    console.log(this.buUser);
    if (f.valid) {
      console.log(f.value);
      this.loader = 1;
      this.userv
        .updatePanelUsers(this.buUser.id, this.selectedUser)
        .subscribe((data) => {
          this.datares = data;
          this.loader = 0;
          if (this.datares.status == 1) {
            this.alertify.errorMsg(this.datares.message);
          } else {
            closeModal();
            this.alertify.successMsg('Interview Panel');
            this.getallBUWithPanel();
          }
        });
      this.clearPanelFields();
    }
  }
  /**
   * Updates interview panel
   * @param id
   */
  updateInterviewPanel(id) {
    this._router.navigate(['hirepros/update-interview-panel', id]);
  }
  /**
   * Clears panel fields
   */
  clearPanelFields() {
    this.buUser.id = undefined;
    this.buUser.interviewPanelList = ' ';
  }
  /**
   * Gets panels by bu id
   * @returns
   */
  getPanelsByBuId() {
    if (this.buUser.id == undefined) {
      this.alertify.errorMsg('Business Unit is Required!');
      return;
    }
    this.mserv.getPanelsByBuId(this.buUser.id).subscribe((data) => {
      this.BUPanel = data;
      this.loader = 0;
      this.handlePageChange(1);
      console.log(data);
    });
  }

  BUPanel: any;
  /**
   * Getalls buwith panel
   */
  getallBUWithPanel() {
    this.clearPanelFields();
    this.loader = 1;
    this.buUser.keyword = '';
    this.mserv.getAllBUsWithPanel().subscribe((data) => {
      console.log(data);
      this.BUPanel = data;
      this.loader = 0;
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
}
