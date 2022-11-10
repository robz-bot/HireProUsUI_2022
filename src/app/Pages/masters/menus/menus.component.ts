/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { Menu } from './../../../Models/Menus';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { LoginServicesService } from 'src/app/Services/LoginServices/login-services.service';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import { NgForm } from '@angular/forms';
declare function closeModal(): any;
declare function redirectToList(): any;
declare function highlightMasters(): any;
@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css'],
})
export class MenusComponent implements OnInit {
  constructor(
    private mserv: MasterserviceService,
    private alertify: AlertifyService,
    private lserv: LoginServicesService
  ) {}

  loggedInUserId: any;
  menuList: Menu[];
  datares: any;
  updateid: string;
  menu: Menu = new Menu();
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
  }
  /**
   * Handles page size change
   * @param event
   */
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    //this.loadMenus();
  }

  ngOnInit(): void {
    highlightMasters();

    this.loadMenus();
    this.getAllMainMenuList();

    this.loggedInUserId = sessionStorage.getItem('currentUserId');
  }
  /**
   * Loads menus
   */
  loadMenus() {
    this.loader = 1;
    this.menu.keyword = '';
    this.mserv.getmenuList().subscribe((data) => {
      this.menuList = data;
      console.log(this.menuList);
      this.loader = 0;
    });
  }
  mainMenuList: any[];
  /**
   * Gets all main menu list
   */
  getAllMainMenuList() {
    this.loader = 1;
    this.menu.keyword = '';
    this.mserv.getAllMainMenuList().subscribe((data) => {
      this.mainMenuList = data;
      this.mainMenuList = this.mainMenuList.sort((a, b) =>
        a.mainMenuName.localeCompare(b.mainMenuName)
      );
      console.log(this.mainMenuList);
      this.loader = 0;
    });
  }
  /**
   * Adds new menu
   * @param f
   * @returns
   */
  addNewMenu(f: NgForm) {
    if (this.menu.mainMenuName == undefined) {
      this.alertify.errorMsg('Main Menu is Required!');
      return;
    }
    console.log(f.form.value);
    if (f.form.valid) {
      this.loader = 1;
      //console.log(this.loggedInUserId);
      this.menu.createdBy = this.loggedInUserId;
      this.menu.updatedBy = this.loggedInUserId;
      this.menu.mainMenuId = '0';
      this.menu.pageLink = '-';
      this.menu.menuName = this.menu.mainMenuName.trim();
      this.menu.mainMenuName = this.menu.mainMenuName.trim();
      this.menu.pageLink = this.menu.pageLink.trim();
      console.log(this.menu);
      this.savenewmenu(this.menu);
    }
  }
  /**
   * Adds new sub menu
   * @param f
   * @returns
   */
  addNewSubMenu(f: NgForm) {
    console.log(f);
    if (this.menu.mainMenuId == undefined) {
      this.alertify.errorMsg('Main Menu is Required!');
      return;
    }
    if (this.menu.menuName == ' ' || this.menu.menuName == undefined) {
      this.alertify.errorMsg('Sub Menu is Required!');
      return;
    }
    if (f.form.valid) {
      this.loader = 1;
      //console.log(this.loggedInUserId);
      this.menu.createdBy = this.loggedInUserId;
      this.menu.updatedBy = this.loggedInUserId;
      this.menu.pageLink = '-';
      //this.menu.menuName = this.menu.menuName.trim();
      //this.menu.pageLink = this.menu.pageLink.trim();
      this.savenewmenu(this.menu);
    }
  }
  /**
   * Savenewmenus menus component
   * @param menu
   */
  savenewmenu(menu) {
    this.mserv.newmenu(menu).subscribe((data) => {
      console.log(data);
      this.datares = data;
      this.loader = 0;
      if (this.datares.status == 1) {
        this.alertify.errorMsg(this.datares.message);
      } else {
        this.alertify.successMsg('Menu');
        closeModal();
        this.clearMenusField();
        this.loadMenus();
      }
    });
    //this.loadMenus();
  }
  /**
   * Searchs Menu
   * @param f
   * @returns
   */
  searchMenu(f: NgForm) {
    //console.log(this.menu.keyword);
    if (
      this.menu.keyword == null ||
      this.menu.keyword == '' ||
      this.menu.keyword == undefined
    ) {
      this.alertify.errorMsg('Menu Name is Required!');
      return;
    }
    if (f.form.valid) {
      this.loader = 1;
      this.mserv.searchmenuByKey(this.menu.keyword).subscribe((data) => {
        this.handlePageChange(1);
        this.menuList = data;
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
    console.log(id);
    this.loader = 1;
    this.updateid = id;
    this.mserv.getmenuById(id).subscribe((data) => {
      this.menu = data;
      console.log(this.menu);
      this.loader = 0;
    });
  }
  /**
   * Updates sub menu
   * @param f
   */
  updateSubMenu(f: NgForm) {
    //console.log(f.form.status);
    //console.log(this.updateid);
    if (f.form.valid) {
      this.loader = 1;
      this.menu.updatedBy = this.loggedInUserId;
      this.menu.pageLink = '-';
      this.menu.menuName = this.menu.mainMenuName.trim();
      this.menu.mainMenuName = this.menu.mainMenuName.trim();
      this.menu.pageLink = this.menu.pageLink.trim();
      if (this.menu.id == this.updateid) {
        this.mserv.updatemenu(this.menu).subscribe((data) => {
          //console.log(data);
          this.apidata = data;
          this.loader = 0;
          if (this.apidata.status == 1) {
            this.alertify.errorMsg(this.apidata.message);
          } else {
            closeModal();
            this.alertify.updatedMsg('Menu');
            this.loadMenus();
          }
        });
      }
    }
    this.loadMenus();
  }
  /**
   * Updates main menu
   * @param f
   */
  updateMainMenu(f: NgForm) {
    //console.log(f.form.status);
    console.log(this.updateid);
    if (f.form.valid) {
      this.loader = 1;
      this.menu.updatedBy = this.loggedInUserId;
      this.menu.id = this.updateid;
      this.menu.menuName = this.menu.mainMenuName;
      this.menu.mainMenuId = '0';
      this.menu.pageLink = '-';
      if (this.menu.id == this.updateid) {
        this.mserv.updatemenu(this.menu).subscribe((data) => {
          console.log(data);
          this.apidata = data;
          this.loader = 0;
          if (this.apidata.status == 1) {
            this.alertify.errorMsg(this.apidata.message);
          } else {
            closeModal();
            this.alertify.updatedMsg('Menu');
            this.loadMenus();
          }
        });
      }
    }
    this.loadMenus();
  }
  /**
   * Clears menus field
   */
  clearMenusField() {
    this.getAllMainMenuList();
    this.menu.menuName = ' ';
    this.menu.mainMenuName = ' ';
    this.menu.pageLink = ' ';
    this.menu.mainMenuId = undefined;
  }
  /**
   * Deletes menu
   * @param id
   */
  deleteMenu(id) {
    this.loader = 1;
    console.log(id);
    this.mserv.deletemenu(id).subscribe((data) => {
      console.log(data);
      this.loader = 0;
      this.alertify.deleteMsg('Menu');
      this.loadMenus();
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
