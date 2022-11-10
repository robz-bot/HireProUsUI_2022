/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { LoginServicesService } from 'src/app/Services/LoginServices/login-services.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import { Menu } from 'src/app/Models/Menus';
import { MenuMappingService } from 'src/app/Services/menuMappings/menu-mapping.service';
import { map } from 'jquery';
import { MenuMapping } from 'src/app/Models/MenuMapping';
import { mappingMenu } from 'src/app/Models/mappingMenu';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css'],
})
export class LeftSidebarComponent implements OnInit {
  constructor(
    private _router: Router,
    private lserv: LoginServicesService,
    private mserv: MasterserviceService,
    public mmserv: MenuMappingService
  ) {}
  currentUserRoleName: string;
  userType: number;
  menus: string;

  ngOnInit(): void {
    this.loadMenus();
    this.currentUserRoleName = sessionStorage.getItem('Role');

    this.menus = sessionStorage.getItem('menuNames');
    console.log(this.menus);
  }

  menuNameList: mappingMenu;
  enable: number;

  menuList: Menu[];
  loadMenus() {
    this.mserv.getmenuList().subscribe((data) => {
      this.menuList = data;
      //console.log(this.menuList);
    });
  }
  gotoHireproRoles() {
    this._router.navigateByUrl('hirepros/hirepro-roles');
  }
  gotoDashboard() {
    this._router.navigateByUrl('hirepros/dashboard');
  }
  gotoCustomers() {
    this._router.navigateByUrl('hirepros/customers');
  }
  gotoBU() {
    this._router.navigateByUrl('hirepros/bu');
  }
  gotoProjects() {
    this._router.navigateByUrl('hirepros/projects');
  }
  gotoRecRoles() {
    this._router.navigateByUrl('hirepros/rec-roles');
  }
  gotoMenus() {
    this._router.navigateByUrl('hirepros/menus');
  }
  gotoRoleMenuMapping() {
    this._router.navigateByUrl('hirepros/role-menu-mapping');
  }
  gotoUserReg() {
    this._router.navigateByUrl('hirepros/user-reg');
  }
  gotoInterviewerPanel() {
    this._router.navigateByUrl('hirepros/interviewer-panel');
  }
  gotoNewJobReq() {
    this._router.navigateByUrl('hirepros/job-request');
  }
  gotoCandiDet() {
    this._router.navigateByUrl('hirepros/candidate-details');
  }
  gotoResumeShort() {
    this._router.navigateByUrl('hirepros/resume-shortlist');
  }
  gotoIntShedule() {
    this._router.navigateByUrl('hirepros/interview-schedule');
  }
  gotoIntResults() {
    this._router.navigateByUrl('hirepros/interview-results');
  }
  gotoHRDisc() {
    this._router.navigateByUrl('hirepros/hr-disc');
  }
  gotoBUHeadApp() {
    this._router.navigateByUrl('hirepros/bu-head-approval');
  }
  gotoOnboardDet() {
    this._router.navigateByUrl('hirepros/on-board-det');
  }
}
