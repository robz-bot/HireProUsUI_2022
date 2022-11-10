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
import { Router } from '@angular/router';
import { candidate } from 'src/app/Models/Candidate';
import { vendor } from 'src/app/Models/vendor';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { GlobalMenuMappingServicesService } from 'src/app/Services/GlobalMenuMappingServices/global-menu-mapping-services.service';
import { ImageServicesService } from 'src/app/Services/ImageServices/image-services.service';
import { RecruitmentServiceService } from 'src/app/Services/RecruitmentServices/recruitment-service.service';
import { RecStatusServiceService } from 'src/app/Services/RecStatusServices/rec-status-service.service';
import { VendorServiceService } from 'src/app/Services/VendorServices/vendor-service.service';

@Component({
  selector: 'app-dropped-candidates-list',
  templateUrl: './dropped-candidates-list.component.html',
  styleUrls: ['./dropped-candidates-list.component.css'],
})
export class DroppedCandidatesListComponent implements OnInit {
  subMenuName: string;
  vendorUniqueId: string;
  isVendor: string;
  constructor(
    private rserv: RecruitmentServiceService,
    private _router: Router,
    private alertify: AlertifyService,
    private recStatServ: RecStatusServiceService,
    private iserv: ImageServicesService,
    private _gmenu: GlobalMenuMappingServicesService,
    private vendorService: VendorServiceService
  ) {}

  ngOnInit(): void {
    this.vendorUniqueId = sessionStorage.getItem('currentVendorId');
    this.isVendor = sessionStorage.getItem('isVendor');
    this.loadAllJobRequestNumbers();
    this.subMenuName = sessionStorage.getItem('subMenuNames');
    this.getdroppedCandidates();
    this.loadActiveVendors();
  }

  activeVendors: vendor[];
  loadActiveVendors() {
    this.vendorService.getActiveVendors().subscribe((data) => {
      console.log(data);
      this.activeVendors = data;
    });
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

  candidate: candidate = new candidate();
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
  /**
   * Goto update candidate
   * @param id
   */
  gotoUpdateCandidate(id) {
    this._router.navigate(['hirepros/update-candidate', id]);
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
        this.droppedCandidateList();
      }
    });
  }

  ////////////////////
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
  ///////////////////////
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
  /**
   * Finds details fordropped candidates
   * @param data
   * @returns
   */
  findDetailsFordroppedCandidates(data) {
    return this.droppedCandidateList.filter((x) => x.id === data.id);
  }
  /**
   * Determines whether changedropped candidates ref id on
   * @param id
   */
  onChangedroppedCandidatesRefId(id: string) {
    console.log(id);
    this.rserv
      .getCandidatesByJRNumAndRecStatusList(id, this.droppedCandidates)
      .subscribe((data) => {
        console.log(data);
        this.droppedCandidateList = data;
      });
  }
  /**
   * Searchdropped candidates
   * @param f
   * @returns
   */
  searchdroppedCandidates(f: NgForm) {
    if (
      (this.candidate.keyword == '' || this.candidate.keyword == undefined) &&
      (this.candidate.refId == undefined || this.candidate.refId == '') &&
      (this.candidate.vendorId == undefined || this.candidate.vendorId == '')
    ) {
      this.alertify.errorMsg('Select any one Criteria');
      return;
    }
    if (this.candidate.keyword == undefined) {
      this.candidate.keyword = '';
    }
    if (this.candidate.refId == undefined) {
      this.candidate.refId = '';
    }
    if (this.candidate.vendorId == undefined) {
      this.candidate.vendorId = '';
    }
    if (f.form.valid) {
      this.loader = 1;

      this.rserv
        .searchCandidateByRecStatusList(
          this.candidate.refId,
          this.candidate.keyword,
          this.droppedCandidates,
          this.vendorUniqueId
        )
        .subscribe((data) => {
          console.log(data);
          this.loader = 0;
          this.droppedCandidateList = data;
          this.droppedCandidatesCount = this.droppedCandidateList.length;
          this.handlePageChange(1);
        });
    } else {
      this.alertify.errorMsg('Search keyword is Required');
    }
  }
  /**
   * Resetdropped candidates
   */
  resetdroppedCandidates() {
    this.candidate.keyword = '';
    this.candidate.refId = undefined;
    this.candidate.vendorId = undefined;
    this.getdroppedCandidates();
  }

  droppedCandidates: string[] = ['26'];
  droppedCandidateList: any;
  droppedCandidatesCount: number;
  /**
   * Getdropped candidates
   */
  getdroppedCandidates() {
    this.candidate.refId = undefined;
    this.loader = 1;
    if (this.isVendor == '1') {
      this.rserv
        .getCandidatesByRecStatusListForVendor(
          this.droppedCandidates,
          this.vendorUniqueId
        )
        .subscribe((data) => {
          this.loader = 0;
          this.droppedCandidateList = data;
          console.log(this.droppedCandidateList);
          this.droppedCandidatesCount = this.droppedCandidateList.length;
        });
    } else {
      this.rserv
        .getCandidatesByRecStatusList(this.droppedCandidates)
        .subscribe((data) => {
          this.loader = 0;
          this.droppedCandidateList = data;
          console.log(this.droppedCandidateList);
          this.droppedCandidatesCount = this.droppedCandidateList.length;
        });
    }
  }
  /**
   * Sets rec status
   * @param recStatus
   * @returns rec status
   */
  setRecStatus(recStatus: string): string {
    return this.recStatServ.getRecStatus(recStatus);
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
   * Onlys number
   * @param event
   */
  onlyNumber(event) {
    var inputValue = event.charCode;
    if (!(inputValue >= 48 && inputValue <= 57)) {
      event.preventDefault();
    }
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
   * Clones candidate
   * @param candidateId
   * added on 11/12/2021
   */
  cloneCandidate(candidateId: string) {
    console.log(candidateId);
    this._router.navigate(['hirepros/clone-candidate', candidateId]);
  }
}
