/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { ImageServicesService } from 'src/app/Services/ImageServices/image-services.service';
import { RecStatusServiceService } from './../../../Services/RecStatusServices/rec-status-service.service';
import { RecruitmentServiceService } from 'src/app/Services/RecruitmentServices/recruitment-service.service';
import { candidate } from './../../../Models/Candidate';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { GlobalMenuMappingServicesService } from 'src/app/Services/GlobalMenuMappingServices/global-menu-mapping-services.service';
import { candidateCount } from 'src/app/Models/candidatesCount';
import { VendorServiceService } from 'src/app/Services/VendorServices/vendor-service.service';
import { vendor } from 'src/app/Models/vendor';
import { ReportServiceService } from 'src/app/Services/ReportServices/report-service.service';
declare function highlightRecruitment(): any;
declare function closeModal(): any;
import * as FileSaver from 'file-saver';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css'],
})
export class CandidateDetailsComponent implements OnInit {
  loader: number;
  vendorUniqueId: string;
  isVendor: string;
  loggedInUserId: string;
  constructor(
    private rserv: RecruitmentServiceService,
    private _router: Router,
    private alertify: AlertifyService,
    private iserv: ImageServicesService,
    private recStatServ: RecStatusServiceService,
    private vendorService: VendorServiceService,
    private _gmenu: GlobalMenuMappingServicesService,
    private reportService: ReportServiceService
  ) {}
  mapStatus: any;
  subMenuName: string;
  ngOnInit(): void {
    this.vendorUniqueId = sessionStorage.getItem('currentVendorId');
    this.isVendor = sessionStorage.getItem('isVendor');
    highlightRecruitment();
    this.subMenuName = sessionStorage.getItem('subMenuNames');
    this.showUploadedCandidateTab();
    this.getCandidatesCount();
    this.loadAllJobRequestNumbers();
    this.loadActiveVendors();
    this.loggedInUserId = sessionStorage.getItem('currentUserId');
  }

  activeVendors: vendor[];
  loadActiveVendors() {
    this.vendorService.getActiveVendors().subscribe((data) => {
      console.log(data);
      this.activeVendors = data;
    });
  }

  /**
   * Handles key up
   * @param e
   */
  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.globalSearch();
    }
  }
  /**
   * Goto candidate view
   * @param id
   */
  gotoCandidateView(id) {
    this._router.navigate(['hirepros/view-candidate', id]);
  }
  /**
   * Goto job req view
   * @param id
   */
  gotoJobReqView(id) {
    this._router.navigate(['hirepros/view-job-request', id]);
  }
  /**
   * Goto update candidate
   * @param id
   */
  gotoUpdateCandidate(id) {
    this._router.navigate(['hirepros/update-candidate', id]);
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
   * Goto view history
   * @param jrNum
   * @param candidateId
   */
  gotoViewHistory(jrNum: string, candidateId: string) {
    this._router.navigate(['hirepros/candidate-history', jrNum, candidateId]);
  }

  /**
   * Enables delete icon
   * @param mainMenu
   * @returns true if delete icon
   */
  enableDeleteIcon(mainMenu: string): boolean {
    return this._gmenu.mainMenuAccess2(this.subMenuName, mainMenu);
  }
  /**
   * Enables edit candidate
   * @param subMenu
   * @returns true if edit candidate
   */
  enableEditCandidate(subMenu: string): boolean {
    return this._gmenu.subMenuAccess2(this.subMenuName, subMenu);
  }

  deleteResData: any;
  /**
   * Deletes candidate
   * @param id
   */
  deleteCandidate(id) {
    this.rserv.deleteCandidate(id).subscribe((data) => {
      this.deleteResData = data;
      console.log(data);
      if (this.deleteResData.status == 1) {
        this.alertify.errorMsg(this.deleteResData.message);
        return;
      } else {
        this.alertify.deleteMsg('Candidate');
      }
    });
  }
  /**
   * Resets candidate details component
   */
  reset() {
    this.candidateSearch.keyword = '';
    this.candidateSearch.refId = undefined;
    this.candidateSearch.vendorId = undefined;
    this.enableGlobalResult = false;
  }

  CandidatesCount: candidateCount;
  /**
   * Gets candidates count
   */
  getCandidatesCount() {
    if (this.isVendor == '1') {
      this.rserv
        .getCandidatesCountForVendor(this.vendorUniqueId)
        .subscribe((data) => {
          this.CandidatesCount = data;
          console.log(this.CandidatesCount);
        });
    } else {
      this.rserv.getCandidatesCount().subscribe((data) => {
        this.CandidatesCount = data;
        console.log(this.CandidatesCount);
      });
    }
  }
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
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
   * @param event
   */
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }
  // expandable Table Details
  /**
   * Finds details for all candidates
   * @param data
   * @returns
   */
  findDetailsForAllCandidates(data) {
    return this.globalSearchList.filter((x) => x.id === data.id);
  }
  /**
   * Sets rec status
   * @param recStatus
   * @returns rec status
   */
  setRecStatus(recStatus: string): string {
    return this.recStatServ.getRecStatus(recStatus);
  }

  enableGlobalResult: boolean = false;
  allListArray: string[] = [null];
  candidateSearch: candidate = new candidate();
  globalSearchList: any;
  globalSearchListCount: number;
  /**
   * Globals search
   * @returns
   */
  globalSearch() {
    if (
      (this.candidateSearch.keyword == '' ||
        this.candidateSearch.keyword == undefined) &&
      (this.candidateSearch.refId == undefined ||
        this.candidateSearch.refId == '') &&
      (this.candidateSearch.vendorId == undefined ||
        this.candidateSearch.vendorId == '')
    ) {
      this.alertify.errorMsg('Select any one Criteria');
      return;
    }
    if (this.candidateSearch.keyword == undefined) {
      this.candidateSearch.keyword = '';
    }
    if (this.candidateSearch.refId == undefined) {
      this.candidateSearch.refId = '';
    }
    if (this.candidateSearch.vendorId == undefined) {
      this.candidateSearch.vendorId = '';
    }

    this.enableGlobalResult = true;
    this.loader = 1;
    console.log();
    this.rserv
      .searchCandidateByRecStatusList(
        this.candidateSearch.refId,
        this.candidateSearch.keyword,
        this.allListArray,
        this.vendorUniqueId
      )
      .subscribe((data) => {
        console.log(data);
        this.loader = 0;
        this.globalSearchList = data;
        this.globalSearchListCount = this.globalSearchList.length;
      });
  }

  JobRequestNumbersList: any;
  /**
   * Loads all job request numbers
   */
  loadAllJobRequestNumbers() {
    this.rserv.getAllJobRequestNumbers().subscribe((data) => {
      this.JobRequestNumbersList = data;
      //console.log(this.JobRequestNumbersList);
    });
  }

  uploadCandidateTab: boolean = true;
  shortlistedCandidateTab: boolean = false;
  holdedCandidateTab: boolean = false;
  rejectedCandidateTab: boolean = false;
  selectedCandidateTab: boolean = false;
  onboardedCandidateTab: boolean = false;
  droppedCandidateTab: boolean = false;
  /**
   * Shows uploaded candidate tab
   */
  showUploadedCandidateTab() {
    this.uploadCandidateTab = true;
    this.shortlistedCandidateTab = false;
    this.holdedCandidateTab = false;
    this.rejectedCandidateTab = false;
    this.selectedCandidateTab = false;
    this.onboardedCandidateTab = false;
    this.droppedCandidateTab = false;
  }
  /**
   * Shows shortlisted candidate tab
   */
  showShortlistedCandidateTab() {
    this.uploadCandidateTab = false;
    this.shortlistedCandidateTab = true;
    this.holdedCandidateTab = false;
    this.rejectedCandidateTab = false;
    this.selectedCandidateTab = false;
    this.onboardedCandidateTab = false;
    this.droppedCandidateTab = false;
  }
  /**
   * Showholded candidate tab
   */
  showholdedCandidateTab() {
    this.uploadCandidateTab = false;
    this.shortlistedCandidateTab = false;
    this.rejectedCandidateTab = false;
    this.holdedCandidateTab = true;
    this.selectedCandidateTab = false;
    this.onboardedCandidateTab = false;
    this.droppedCandidateTab = false;
  }
  /**
   * Shows rejected candidate tab
   */
  showRejectedCandidateTab() {
    this.uploadCandidateTab = false;
    this.shortlistedCandidateTab = false;
    this.rejectedCandidateTab = true;
    this.holdedCandidateTab = false;
    this.selectedCandidateTab = false;
    this.onboardedCandidateTab = false;
    this.droppedCandidateTab = false;
  }
  /**
   * Shows selected candidate tab
   */
  showSelectedCandidateTab() {
    this.uploadCandidateTab = false;
    this.shortlistedCandidateTab = false;
    this.rejectedCandidateTab = false;
    this.holdedCandidateTab = false;
    this.selectedCandidateTab = true;
    this.onboardedCandidateTab = false;
    this.droppedCandidateTab = false;
  }
  /**
   * Shows onboarded candidate tab
   */
  showOnboardedCandidateTab() {
    this.uploadCandidateTab = false;
    this.shortlistedCandidateTab = false;
    this.rejectedCandidateTab = false;
    this.holdedCandidateTab = false;
    this.selectedCandidateTab = false;
    this.onboardedCandidateTab = true;
    this.droppedCandidateTab = false;
  }
  /**
   * Shows dropped candidate tab
   */
  showDroppedCandidateTab() {
    this.uploadCandidateTab = false;
    this.shortlistedCandidateTab = false;
    this.rejectedCandidateTab = false;
    this.holdedCandidateTab = false;
    this.selectedCandidateTab = false;
    this.onboardedCandidateTab = false;
    this.droppedCandidateTab = true;
  }
  jrForResumeCandidate: string;
  candidateDto: any;
  getRejectedStatus(item: any) {
    this.candidateDto = item;
    console.log(item);
  }
  dataStatus: any;
  rejectToUploadedStatus(f: NgForm) {
    console.log(this.jrForResumeCandidate);
    if (this.jrForResumeCandidate == undefined) {
      this.alertify.errorMsg('Job Request Number is required!');
      return;
    }
    this.candidateDto.updatedBy = this.loggedInUserId;
    this.rserv
      .rejectToUploadedStatus(this.candidateDto, this.jrForResumeCandidate)
      .subscribe((data) => {
        console.log(data);
        this.dataStatus = data;
        this.loader = 0;
        if (this.dataStatus.status == 1) {
          this.alertify.errorMsg(this.dataStatus.message);
        } else {
          this.alertify.successMsg('Record');
          this.getCandidatesCount();
          this.showUploadedCandidateTab();
          closeModal();
          this.clearResumeFields();
        }
      });
  }

  clearResumeFields() {
    this.jrForResumeCandidate = undefined;
  }
}
