/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { ImageServicesService } from 'src/app/Services/ImageServices/image-services.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { candidate } from 'src/app/Models/Candidate';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { RecruitmentServiceService } from 'src/app/Services/RecruitmentServices/recruitment-service.service';
import { RecStatusServiceService } from 'src/app/Services/RecStatusServices/rec-status-service.service';
import { jobReq } from 'src/app/Models/JobRequest';
import { GlobalMenuMappingServicesService } from 'src/app/Services/GlobalMenuMappingServices/global-menu-mapping-services.service';
declare function highlightRecruitment(): any;

@Component({
  selector: 'app-resume-shortlist',
  templateUrl: './resume-shortlist.component.html',
  styleUrls: ['./resume-shortlist.component.css'],
})
export class ResumeShortlistComponent implements OnInit {
  subMenuName: string;
  loggedInUserBUId: string;
  vendorUniqueId: string;
  constructor(
    private rserv: RecruitmentServiceService,
    private _router: Router,
    private alertify: AlertifyService,
    private iserv: ImageServicesService,
    private _gmenu: GlobalMenuMappingServicesService
  ) {}
  loggedInUserId: string;
  ngOnInit(): void {
    highlightRecruitment();
    this.vendorUniqueId = sessionStorage.getItem('currentVendorId');
    this.subMenuName = sessionStorage.getItem('subMenuNames');
    this.loadCandidates();
    this.loggedInUserId = sessionStorage.getItem('currentUserId');
    this.loggedInUserBUId = sessionStorage.getItem('currentUserBUId');
  }

  ////////////////////
  enableDeleteIcon(mainMenu: string): boolean {
    return this._gmenu.mainMenuAccess2(this.subMenuName, mainMenu);
  }
  enableSubMenu(mainMenu: string): boolean {
    return this._gmenu.subMenuAccess2(this.subMenuName, mainMenu);
  }
  ///////////////////////
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15, 20];

  handlePageChange(event): void {
    this.page = event;
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }
  candidate: candidate = new candidate();
  candidateList: any;
  loader: number = 0;

  //GetCandidateDetails by Id 00 - Details Uploaded Candidates
  loadCandidates() {
    this.loader = 1;
    this.searchKeyword = '';
    this.rserv.getCandidatesByRecStatus('00').subscribe((data) => {
      this.candidateList = data;
      console.log(this.candidateList);
      this.loader = 0;
    });
  }

  searchKeyword: string;
  searchCandidateByRecStatusList() {
    if (
      this.searchKeyword == '' ||
      this.searchKeyword == null ||
      this.searchKeyword == undefined
    ) {
      this.alertify.errorMsg('Candidate Name is Required!');
      return;
    }
    this.loader = 1;
    this.rserv
      .searchCandidateByRecStatusList(
        '',
        this.searchKeyword,
        ['00'],
        this.vendorUniqueId
      )
      .subscribe((data) => {
        console.log(data);
        this.loader = 0;
        this.candidateList = data;
      });
    this.handlePageChange(1);
  }

  resumeRes: any;
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
  jobReq: jobReq;
  getJRDetailsById(id) {
    this.loader = 1;
    this.rserv.getJobRequestsByJRNumber(id).subscribe(
      (data) => {
        this.jobReq = data;
        console.log(this.jobReq);
        this.loader = 0;
      },
      (error) => console.log(error)
    );
  }

  gotoJobReqView(id) {
    this._router.navigate(['hirepros/view-job-request', id]);
  }

  gotoCandidateView(id) {
    this._router.navigate(['hirepros/view-candidate', id]);
  }
  jRNumber: string;
  getJRNumber(jrNum: string) {
    this.candidate.remarks = '';
    this.jRNumber = jrNum;
  }
  saveHoldStatus(id: string) {
    console.log(this.candidate.remarks);
    if (this.candidate.remarks == '') {
      this.alertify.errorMsg('Hold Remarks is Required');
    } else {
      this.loader = 1;
      this.candidate.id = id;
      this.candidate.recStatus = '02';
      this.candidate.createdBy = this.loggedInUserId;
      this.candidate.updatedBy = this.loggedInUserId;
      this.candidate.jrNumber = this.jRNumber;

      console.log(this.candidate);
      this.rserv.updateShortlistResult(this.candidate).subscribe((data) => {
        console.log(data);
        this.loader = 0;
        this.alertify.successMsg('Holded Status');
        this.candidate.remarks = '';
        this.loadCandidates();
      });
    }
  }
  saveShortlistStatus(id: string) {
    console.log(this.candidate.remarks);
    if (this.candidate.remarks == '') {
      this.alertify.errorMsg('Shortlist Remarks is Required');
    } else {
      this.loader = 1;
      this.candidate.id = id;
      this.candidate.recStatus = '01';
      this.candidate.createdBy = this.loggedInUserId;
      this.candidate.updatedBy = this.loggedInUserId;
      this.candidate.jrNumber = this.jRNumber;

      console.log(this.candidate);
      this.rserv.updateShortlistResult(this.candidate).subscribe((data) => {
        console.log(data);
        this.loader = 0;
        this.candidate.remarks = '';
        this.alertify.successMsg('Shortlisted Status');

        this.loadCandidates();
      });
    }
  }
  saveRejectStatus(id: string) {
    console.log(this.candidate.remarks);
    if (this.candidate.remarks == '') {
      this.alertify.errorMsg('Reject Remarks is Required');
    } else {
      this.loader = 1;
      this.candidate.id = id;
      this.candidate.recStatus = '03';
      this.candidate.createdBy = this.loggedInUserId;
      this.candidate.updatedBy = this.loggedInUserId;
      this.candidate.jrNumber = this.jRNumber;

      console.log(this.candidate);

      this.rserv.updateShortlistResult(this.candidate).subscribe((data) => {
        this.alertify.successMsg('Rejected Status');
        console.log(data);
        this.loader = 0;
        this.candidate.remarks = '';
        this.loadCandidates();
      });
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
