2/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { GlobalMenuMappingServicesService } from 'src/app/Services/GlobalMenuMappingServices/global-menu-mapping-services.service';
import { ImageServicesService } from 'src/app/Services/ImageServices/image-services.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interviewSchedule } from 'src/app/Models/InterviewSchedule';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { RecruitmentServiceService } from 'src/app/Services/RecruitmentServices/recruitment-service.service';
import { searchInterviewSchedule } from 'src/app/Models/searchInterviewSchedule';
declare function highlightRecruitment(): any;
@Component({
  selector: 'app-bu-head-approval',
  templateUrl: './bu-head-approval.component.html',
  styleUrls: ['./bu-head-approval.component.css'],
})
export class BuHeadApprovalComponent implements OnInit {
  constructor(
    private rserv: RecruitmentServiceService,
    private alertify: AlertifyService,
    private _router: Router,
    private iserv: ImageServicesService,
    private _gmenu: GlobalMenuMappingServicesService
  ) {}
  loggedInUserName: string;
  loggedInUserRole: string;
  loggedInUserId: any;
  loggedInUserBUId: any;
  subMenuName: string;
  ngOnInit(): void {
    highlightRecruitment();
    this.getForSchedule();
    this.loggedInUserId = sessionStorage.getItem('currentUserId');
    this.loggedInUserBUId = sessionStorage.getItem('currentUserBUId');
    this.loggedInUserName = sessionStorage.getItem('currentUserName');
    console.log(this.loggedInUserName);
    this.loggedInUserRole = sessionStorage.getItem('Role');
    this.subMenuName = sessionStorage.getItem('subMenuNames');
  }
  ///////////////////
  enableDeleteIcon(mainMenu: string): boolean {
    //return this._gmenu.subMenuAccess(icon);
    return this._gmenu.mainMenuAccess2(this.subMenuName, mainMenu);
  }
  ///////////////////////
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
   *
   * @param event
   */
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }

  resumeRes: any;
  /**
   * Gets resume
   * @param id
   */
  getResume(id: string) {
    console.log(id);
    this.iserv.getResume('resume_' + id).subscribe((data) => {
      console.log(data);
      this.resumeRes = data;
      if (this.resumeRes.resume != null || this.resumeRes.resume != '') {
        const pdfWindow = window.open('');

        pdfWindow.document.write(
          '<title>View Resume</title><html><body><iframe' +
            " style='width: 100%;height: 100%' src='" +
            this.resumeRes.resume +
            "'></iframe></body></html>"
        );
      } else {
        this.alertify.errorMsg('Resume Not Uploaded');
      }
    });
  }

  /**
   * Clears remarks
   */
  clearRemarks() {
    this.interviewSchedule.resultRemarks = '';
  }

  interviewSchedule: interviewSchedule = new interviewSchedule();
  /**
   * Addbus shortlist status
   * @param scheduledId
   */
  addbuShortlistStatus(scheduledId: string) {
    if (
      this.interviewSchedule.resultRemarks == '' ||
      this.interviewSchedule.resultRemarks == undefined ||
      this.interviewSchedule.resultRemarks == null
    ) {
      this.alertify.errorMsg('Reason for Shortlist is Required');
    } else {
      this.loader = 1;
      this.interviewSchedule.recStatus = '21';
      this.interviewSchedule.updatedBy = this.loggedInUserId;
      this.interviewSchedule.createdBy = this.loggedInUserId;
      this.interviewSchedule.id = scheduledId;

      console.log(this.interviewSchedule);
      this.rserv.updateResult(this.interviewSchedule).subscribe((data) => {
        console.log(data);
        this.loader = 0;
        this.alertify.successMsg('Shortlist Status');
        this.getForSchedule();
      });
    }
  }

  /**
   * Addbus hold status
   * @param scheduledId
   */
  addbuHoldStatus(scheduledId: string) {
    if (
      this.interviewSchedule.resultRemarks == '' ||
      this.interviewSchedule.resultRemarks == undefined ||
      this.interviewSchedule.resultRemarks == null
    ) {
      this.alertify.errorMsg('Reason for Hold is Required');
    } else {
      this.loader = 1;
      this.interviewSchedule.recStatus = '22';
      this.interviewSchedule.updatedBy = this.loggedInUserId;
      this.interviewSchedule.createdBy = this.loggedInUserId;
      this.interviewSchedule.id = scheduledId;

      console.log(this.interviewSchedule);
      this.rserv.updateResult(this.interviewSchedule).subscribe((data) => {
        console.log(data);
        this.loader = 0;
        this.alertify.successMsg('Hold Status');
        this.getForSchedule();
      });
    }
  }

  /**
   * Addbus reject status
   * @param scheduledId
   */
  addbuRejectStatus(scheduledId: string) {
    if (
      this.interviewSchedule.resultRemarks == '' ||
      this.interviewSchedule.resultRemarks == undefined ||
      this.interviewSchedule.resultRemarks == null
    ) {
      this.alertify.errorMsg('Reason for Rejection is Required');
    } else {
      this.loader = 1;
      this.interviewSchedule.recStatus = '23';
      this.interviewSchedule.updatedBy = this.loggedInUserId;
      this.interviewSchedule.createdBy = this.loggedInUserId;
      this.interviewSchedule.id = scheduledId;

      console.log(this.interviewSchedule);
      this.rserv.updateResult(this.interviewSchedule).subscribe((data) => {
        console.log(data);
        this.loader = 0;
        this.alertify.successMsg('Reject Status');
        this.getForSchedule();
      });
    }
  }

  loader = 0;
  ShortlistedCandidatesList: any;
  /**
   * Gets for schedule
   */
  getForSchedule() {
    this.loader = 1;
    //console.log(this.ShortlistedCandidates);
    this.rserv.getForSchedule('5').subscribe((data) => {
      console.log(data);
      this.loader = 0;
      this.ShortlistedCandidatesList = data;
    });
  }

  searchDto: searchInterviewSchedule = new searchInterviewSchedule();
  /**
   * Searchs for schedule
   * @returns
   */
  searchForSchedule() {
    if (this.searchDto.jrNumber == '' || this.searchDto.jrNumber == null) {
      this.alertify.errorMsg('Job Request Number is Required.');
      return;
    } else {
      this.rserv.searchForSchedule('5', this.searchDto).subscribe((data) => {
        this.ShortlistedCandidatesList = data;
        console.log(data);
      });
    }
  }

  /**
   * Resets bu head approval component
   */
  reset() {
    this.searchDto.jrNumber = '';
    this.getForSchedule();
  }

  /**
   * Goto view history
   * @param jrNum
   * @param candidateId
   */
  gotoViewHistory(jrNum: string, candidateId: string) {
    this._router.navigate(['hirepros/candidate-history', jrNum, candidateId]);
  }

  /**
   * Goto job req view
   * @param id
   */
  gotoJobReqView(id) {
    this._router.navigate(['hirepros/view-job-request', id]);
  }

  /**
   * Goto candidate view
   * @param id
   */
  gotoCandidateView(id) {
    this._router.navigate(['hirepros/view-candidate', id]);
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
   * Enables approval condition
   * @param jrBuId
   * @returns true if approval condition
   */
  enableApprovalCondition(jrBuId: string): boolean {
    var isTrue = false;
    if (jrBuId == this.loggedInUserBUId) {
      isTrue = true;
      return isTrue;
    }
    return isTrue;
  }
}
