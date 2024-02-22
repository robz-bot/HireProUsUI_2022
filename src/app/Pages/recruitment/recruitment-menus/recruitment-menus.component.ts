/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { Component, OnInit } from '@angular/core';
import { ConsoleService } from '@ng-select/ng-select/lib/console.service';
import { DashboardServiceService } from 'src/app/Services/DashboardServices/dashboard-service.service';
import { GlobalMenuMappingServicesService } from 'src/app/Services/GlobalMenuMappingServices/global-menu-mapping-services.service';
declare function highlightService(): any;

@Component({
  selector: 'app-recruitment-menus',
  templateUrl: './recruitment-menus.component.html',
  styleUrls: ['./recruitment-menus.component.css'],
})
export class RecruitmentMenusComponent implements OnInit {
  subMenuName: string;
  mainMenuName: string;
  isVendor: string;
  currentUserId: string;
  loggedInUserId: any;
  constructor(
    private _gmenu: GlobalMenuMappingServicesService,
    private dashboardService: DashboardServiceService
  ) {}

  ngOnInit(): void {
    this.loggedInUserId = sessionStorage.getItem('currentUserId');
    highlightService();
    this.getRecMenuCounts();
    this.isVendor = sessionStorage.getItem('isVendor');
    if (this.isVendor == '0') {
      this.mainMenuName = sessionStorage.getItem('mainMenuNames');
      this.subMenuName = sessionStorage.getItem('subMenuNames');
    }
    this.currentUserId = sessionStorage.getItem('currentUserId');
  }
  ////////////////////
  mainMenuArr: Array<string> = [];
  subMenuArr: Array<string> = [];

  mainMenuAccess(mainMenu: string): boolean {
    return this._gmenu.mainMenuAccess2(this.mainMenuName, mainMenu);
  }

  subMenuAccess(subMenu: string): boolean {
    return this._gmenu.subMenuAccess2(this.subMenuName, subMenu);
  }

  BUCounts: any;
  JRCounts: any;
  CandiatesCounts: any;
  ResumeShortlistedCounts: any;
  ScheduleInterviewCounts: any;
  CandidatesOnboardCounts: any;
  InterviewProcessCandiatesCounts: any;
  getRecMenuCounts() {
    this.dashboardService.getRecMenuCounts(this.loggedInUserId).subscribe((data) => {
      console.log(data);
      this.BUCounts = data.BUCount;
      this.JRCounts = data.JobReq;
      this.CandiatesCounts = data.CandidatesCount;
      this.ResumeShortlistedCounts = data.ResumeShortlistedCount;
      this.ScheduleInterviewCounts= data.ScheduleInterviewCount;
      this.CandidatesOnboardCounts = data.CandidatesOnboardCount;
      this.InterviewProcessCandiatesCounts = data.InterviewProcessCandiatesCount;
      console.log(this.BUCounts)
      console.log(this.JRCounts)
      console.log(this.CandiatesCounts)
      console.log(this.ResumeShortlistedCounts)
      console.log(this.ScheduleInterviewCounts)
      console.log(this.CandidatesOnboardCounts)  
      console.log(this.InterviewProcessCandiatesCounts) 

    });
  }

  ///////////////////////
  isJobFooterVisible = false;

  showJobFooter() {
    this.isJobFooterVisible = true;
  }

  hideJobFooter() {
    this.isJobFooterVisible = false;
  }

  isCandidateFooterVisible = false;
  showCandidateFooter() {
    this.isCandidateFooterVisible = true;
  }

  hideCandidateFooter() {
    this.isCandidateFooterVisible = false;
  }

  isResumeFooterVisible = false;
  showResumeFooter() {
    this.isResumeFooterVisible = true;
  }

  hideResumeFooter() {
    this.isResumeFooterVisible = false;
  }

  isScheduleFooterVisible = false;
  showScheduleFooter() {
    this.isScheduleFooterVisible = true;
  }

  hideScheduleFooter() {
    this.isScheduleFooterVisible = false;
  }

  isInterviewFooterVisible = false;
  showInterviewFooter() {
    this.isInterviewFooterVisible = true;
  }
  hideInterviewFooter() {
    this.isInterviewFooterVisible = false;
  }

  isBuFooterVisible = false;
  showBuFooter() {
    this.isBuFooterVisible = true;
  }
  hideBuFooter() {
    this.isBuFooterVisible = false;
  }

  gotoToBack() {
    history.back();
  }

  isOnboardFooterVisible = false;
  showOnboardFooter() {
    this.isOnboardFooterVisible = true;
  }
  hideOnboardFooter() {
    this.isOnboardFooterVisible = false;
  }
}
