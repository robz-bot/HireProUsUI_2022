/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { LoginServicesService } from './../../Services/LoginServices/login-services.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalMenuMappingServicesService } from 'src/app/Services/GlobalMenuMappingServices/global-menu-mapping-services.service';
declare function highlightDashboard(): any;
declare function highlightMasters(): any;
declare function highlightRecruitment(): any;
declare function highlightReports(): any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private _gmenu: GlobalMenuMappingServicesService,
    private _router: Router,
    private lserv: LoginServicesService,
    private activatedRoute: ActivatedRoute
  ) {}
  cUser: string;
  cVendor: string;
  loggedInUserRole: string;
  mainMenuName: string;
  subMenuName: string;
  currentUserId: string;
  isVendor: string;
  disablePass: boolean = false;
  ngOnInit(): void {
    highlightDashboard();
    this.isVendor = sessionStorage.getItem('isVendor');
    if (this.isVendor == '0') {
      this.mainMenuName = sessionStorage.getItem('mainMenuNames');
      this.subMenuName = sessionStorage.getItem('subMenuNames');
    }
    this.currentUserId = sessionStorage.getItem('currentUserId');
    this.cUser = sessionStorage.getItem('currentUserName');
    this.loggedInUserRole = sessionStorage.getItem('Role');

    this.cVendor = sessionStorage.getItem('currentVendor');
  }

  mainMenuArr: Array<string> = [];
  subMenuArr: Array<string> = [];
  /**
   * Mains menu access
   * @param mainMenu
   * @returns true if menu access
   */
  mainMenuAccess(mainMenu: string): boolean {
    if (mainMenu.length > 0) {
      return this._gmenu.mainMenuAccess2(this.mainMenuName, mainMenu);
    } else {
      return false;
    }
  }
  /**
   * Subs menu access
   * @param subMenu
   * @returns true if menu access
   */
  subMenuAccess(subMenu: string): boolean {
    // return this._gmenu.subMenuAccess(subMenu);
    if (subMenu.length > 0) {
      return this._gmenu.subMenuAccess2(this.subMenuName, subMenu);
    } else {
      return false;
    }
  }
  ///////////////////////
  /**
   * Goto profile
   */
  gotoProfile() {
    this._router.navigateByUrl('hirepros/user-profile');
  }
  /**
   * Goto change pass
   */
  gotoChangePass() {
    this._router.navigateByUrl('hirepros/change-password');
  }
  /**
   * Goto login
   */
  gotoLogin() {
    this.lserv.clearUserSession();
    this._router.navigateByUrl('');
  }
  /**
   * Goto Vendor login
   */
  gotoVendorLogin() {
    sessionStorage.clear();
    this._router.navigateByUrl('/vendorLogin');
  }

  /**
   * Goto hirepro roles
   */
  gotoHireproRoles() {
    this._router.navigateByUrl('hirepros/hirepros-roles');
  }
  /**
   * Goto dashboard
   */
  gotoDashboard() {
    this._router.navigateByUrl('hirepros/dashboard');
  }
  /**
   * Goto customers
   */
  gotoCustomers() {
    this._router.navigateByUrl('hirepros/customers');
  }
  /**
   * Goto bu
   */
  gotoBU() {
    this._router.navigateByUrl('hirepros/bu');
  }
  /**
   * Goto projects
   */
  gotoProjects() {
    this._router.navigateByUrl('hirepros/projects');
  }
  /**
   * Goto rec roles
   */
  gotoRecRoles() {
    this._router.navigateByUrl('hirepros/rec-roles');
  }
  /**
   * Goto cus rec role map
   */
  gotoCusRecRoleMap() {
    this._router.navigateByUrl('hirepros/cus-rec-role-mapping');
  }
  /**
   * Goto menus
   */
  gotoMenus() {
    this._router.navigateByUrl('hirepros/menus');
  }
  /**
   * Goto role menu mapping
   */
  gotoRoleMenuMapping() {
    this._router.navigateByUrl('hirepros/role-menu-mapping');
  }
  /**
   * Recs tab
   */
  recTab() {
    highlightRecruitment();
  }
  /**
   * Masters tab
   */
  masterTab() {
    this._router.navigateByUrl('hirepros/master-menus');
    highlightMasters();
  }
  /**
   * Goto user reg
   */
  gotoUserReg() {
    this._router.navigateByUrl('hirepros/user-reg');
  }
  /**
   * Goto interviewer panel
   */
  gotoInterviewerPanel() {
    this._router.navigateByUrl('hirepros/interviewer-panel');
  }
  /**
   * Goto new job req
   */
  gotoNewJobReq() {
    this._router.navigateByUrl('hirepros/job-request');
  }
  /**
   * Goto candi det
   */
  gotoCandiDet() {
    this._router.navigateByUrl('hirepros/candidate-details');
  }
  /**
   * Goto resume short
   */
  gotoResumeShort() {
    this._router.navigateByUrl('hirepros/resume-shortlist');
  }
  /**
   * Goto int shedule
   */
  gotoIntShedule() {
    this._router.navigateByUrl('hirepros/internal-round1');
  }
  /**
   * Goto int results
   */
  gotoIntResults() {
    this._router.navigateByUrl('hirepros/interview-results');
  }
  /**
   * Goto hrdisc
   */
  gotoHRDisc() {
    this._router.navigateByUrl('hirepros/hr-disc');
  }
  /**
   * Goto buhead app
   */
  gotoBUHeadApp() {
    this._router.navigateByUrl('hirepros/bu-head-approval');
  }
  /**
   * Goto onboard det
   */
  gotoOnboardDet() {
    this._router.navigateByUrl('hirepros/on-board-det');
  }
  /**
   * Goto job req report
   */
  gotoJobReqReport() {
    this._router.navigateByUrl('hirepros/job-request-report');
  }
  /**
   * Goto requirement prog rep
   */
  gotoRequirementProgRep() {
    this._router.navigateByUrl('hirepros/requirement-progress-report');
  }
  /**
   * Goto short listed candidate
   */
  gotoShortListedCandidate() {
    this._router.navigateByUrl('hirepros/shortlisted-candidate-report');
  }
  /**
   * Goto notshort listed candidate
   */
  gotoNotshortListedCandidate() {
    this._router.navigateByUrl('hirepros/not-shortlisted-candidate-report');
  }
  /**
   * Reps tab
   */
  repTab() {
    highlightReports();
  }
  /**
   * Goto select report
   */
  gotoSelectReport() {
    this._router.navigateByUrl('hirepros/select-report');
  }
}
