/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Roles } from 'src/app/Models/Roles';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { LoginServicesService } from 'src/app/Services/LoginServices/login-services.service';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
declare function closeModal(): any;
declare function highlightMasters(): any;
@Component({
  selector: 'app-role-menu-mapping',
  templateUrl: './role-menu-mapping.component.html',
  styleUrls: ['./role-menu-mapping.component.css'],
})
export class RoleMenuMappingComponent implements OnInit {
  constructor(
    private mserv: MasterserviceService,
    private alertify: AlertifyService,
    private lserv: LoginServicesService
  ) {}

  loggedInUserId: any;
  datares: any;
  updateid: string;
  menuMap: Roles = new Roles();
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
  handlePageChange(event: number): void {
    this.page = event;
    //this.loadMenus();
  }
  /**
   * Handles page size change
   * @param event
   */
  handlePageSizeChange(event: { target: { value: number } }): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }
  ngOnInit(): void {
    highlightMasters();

    this.menuTableList();
    this.loadrole();

    this.loggedInUserId = sessionStorage.getItem('currentUserId');
  }
  rolelist: Roles[];
  /**
   * Loadroles role menu mapping component
   */
  loadrole() {
    this.mserv.getRolesList().subscribe((data) => {
      this.rolelist = data;
      this.rolelist = this.rolelist.sort((a, b) =>
        a.roleName.localeCompare(b.roleName)
      );
    });
  }

  mainMenuList: any[];
  /**
   * Gets all main menu list
   */
  getAllMainMenuList() {
    this.selectedMain = [];
    this.selectedSub = [];
    this.loader = 1;
    this.mserv.getAllMainMenuList().subscribe((data) => {
      this.mainMenuList = data;
      //console.log(this.mainMenuList);

      this.loader = 0;
    });
  }

  menuList: Roles[];
  /**
   * Menus table list
   */
  menuTableList() {
    this.mserv.getMenuSubMenuList().subscribe((data) => {
      this.clearRolesFiled();
      //console.log(data);
      this.menuList = data;
    });
  }

  submenuList: any[];
  /**
   * Loads menus
   */
  loadMenus() {
    this.selectedMain = [];
    this.selectedSub = [];
    this.loader = 1;
    //this.menu.keyword = '';
    this.mserv.getAllSubMenuList().subscribe((data) => {
      this.submenuList = data;

      //console.log(this.submenuList);
      this.loader = 0;
    });
  }

  selectedMainMenuIdsValue = new Array<string>();
  /**
   * Onmains menu ids change
   * @param e
   * @param id
   */
  onmainMenuIdsChange(e: { target: { checked: any } }, id: string) {
    if (e.target.checked) {
      if (!this.selectedMain.find((x) => x == id)) {
        this.selectedMain.push(id);
      }
    } else {
      this.selectedMainMenuIdsValue = this.selectedMainMenuIdsValue.filter(
        (m) => m != id
      );
      if (this.selectedMain.find((x) => x == id)) {
        this.selectedMain.forEach((value, index) => {
          if (value == id) this.selectedMain.splice(index, 1);
          //console.log(this.selectedMain);
        });
      }
    }
  }

  selectedSubMenuIdsValue = new Array<string>();
  /**
   * Determines whether sub menu ids change on
   * @param e
   * @param id
   */
  onSubMenuIdsChange(e: { target: { checked: any } }, id: string) {
    if (e.target.checked) {
      if (!this.selectedSub.find((x) => x == id)) {
        this.selectedSub.push(id);
      }
    } else {
      this.selectedSubMenuIdsValue = this.selectedSubMenuIdsValue.filter(
        (m) => m != id
      );
      if (this.selectedSub.find((x) => x == id)) {
        this.selectedSub.forEach((value, index) => {
          if (value == id) this.selectedSub.splice(index, 1);

          //console.log('spliced: ' + this.selectedSub);
        });
      }
    }
    // ////console.log(this.selectedValue);
  }

  roleMenuMapping: Roles = new Roles();
  /**
   * Adds new menu mapping
   * @param f
   * @returns
   */
  addNewMenuMapping(f: NgForm) {
    console.log(f);
    if (f.form.value.id == undefined) {
      this.alertify.errorMsg('Role is Required!');
      return;
    }
    if (f.form.valid) {
      this.loader = 1;
      this.roleMenuMapping.createdBy = this.loggedInUserId;
      this.roleMenuMapping.updatedBy = this.loggedInUserId;
      this.roleMenuMapping.mainMenuIds = this.selectedMain;
      this.roleMenuMapping.subMenuIds = this.selectedSub;
      ////console.log(this.roleMenuMapping);
      this.savenewrole(this.roleMenuMapping);
    }
  }

  errMsg: string;
  errStatus: boolean = false;
  /**
   * Savenewroles role menu mapping component
   * @param roleMenuMapping
   */
  savenewrole(roleMenuMapping: Roles) {
    this.mserv
      .addRoleMenuMapping(
        roleMenuMapping.id,
        roleMenuMapping,
        this.loggedInUserId
      )
      .subscribe((data) => {
        this.datares = data;
        this.loader = 0;
        if (this.datares.status == 1) {
          this.errStatus = true;
          this.errMsg = this.datares.message;
          // this.alertify.errorMsg(this.datares.message);
        } else {
          closeModal();
          this.alertify.updatedMsg('Role Menu Mapping');
          this.errStatus = false;
          this.menuTableList();
          this.clearRolesFiled();
        }
      });
  }
  /**
   * Determines whether change role on
   * @param id
   */
  onChangeRole(id) {
    this.mserv.getMenuSubMenuListByRoleId(id).subscribe((data) => {
      //console.log(data);
      this.handlePageChange(1);
      this.menuList = data;
    });
  }
  /**
   * Loads all menus
   */
  loadAllMenus() {
    this.getAllMainMenuList();
    this.loadMenus();
  }

  /**
   * Gets id
   * @param id
   */
  getId(id: string) {
    this.loadAllMenus();

    this.loader = 1;
    this.updateid = id;
    this.mserv.getRoleById(id).subscribe((data) => {
      this.roleMenuMapping = data;
      this.roleMenuMapping.menuDtoList = this.roleMenuMapping.menuDtoList.sort(
        (a, b) => a.mainMenuName.localeCompare(b.mainMenuName)
      );
      this.roleMenuMapping.subMenuDtoList =
        this.roleMenuMapping.subMenuDtoList.sort((a, b) =>
          a.menuName.localeCompare(b.menuName)
        );
      //console.log(this.roleMenuMapping);
      this.selectedMain = [];
      this.selectedSub = [];
      this.getMainCheckedItemList(this.roleMenuMapping.menuDtoList);
      this.getSubCheckedItemList(this.roleMenuMapping.subMenuDtoList);
      this.loader = 0;
    });
  }

  selectedMain: Array<string> = [];
  /**
   * Gets main checked item list
   * @param mapping
   */
  getMainCheckedItemList(mapping) {
    for (var i = 0; i < mapping.length; i++) {
      //console.log(mapping[i].mainMenuId);
      if (mapping[i].selected == '1') {
        this.selectedMain.push(mapping[i].mainMenuId);
      }
    }
    //console.log(this.selectedMain);
  }
  selectedSub: Array<string> = [];
  /**
   * Gets sub checked item list
   * @param mapping
   */
  getSubCheckedItemList(mapping) {
    for (var i = 0; i < mapping.length; i++) {
      //console.log(mapping[i].id);
      if (mapping[i].selected == '1') {
        this.selectedSub.push(mapping[i].id);
      }
    }
    //console.log(this.selectedSub);
  }

  /**
   * Updates role
   * @param f
   */
  updateRole(f: NgForm) {
    this.loader = 1;

    //console.log(this.roleMenuMapping);
    this.roleMenuMapping.updatedBy = this.loggedInUserId;

    //console.log(' selected menu' + this.selectedMain);
    //console.log('selected Sub' + this.selectedSub);

    this.roleMenuMapping.mainMenuIds = this.selectedMain;
    this.roleMenuMapping.subMenuIds = this.selectedSub;

    if (this.roleMenuMapping.id == this.updateid) {
      this.mserv
        .updateRoleMenuMapping(
          this.roleMenuMapping.id,
          this.roleMenuMapping,
          this.loggedInUserId
        )
        .subscribe((data) => {
          ////console.log(data);
          this.apidata = data;
          this.loader = 0;
          if (this.apidata.status == 1) {
            this.alertify.errorMsg(this.apidata.message);
          } else {
            closeModal();
            this.alertify.updatedMsg('Role Menu Mapping');
            this.menuTableList();
          }
        });
    }
  }

  selected: any;
  /**
   * Clears roles filed
   */
  clearRolesFiled() {
    this.menuMap.roleName = ' ';
    this.selected = { id: undefined };
  }

  /**
   * Deletes menu
   * @param id
   */
  deleteMenu(id: string) {
    this.loader = 1;
    //console.log(id);
    this.mserv.deletemenu(id).subscribe((data) => {
      this.loader = 0;
      this.alertify.deleteMsg('Role Menu Mapping');
      this.menuTableList();
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
    this.errStatus = false;
    this.roleMenuMapping.id = undefined;
    this.selectedMain = [];
    this.selectedSub = [];
  }
}
