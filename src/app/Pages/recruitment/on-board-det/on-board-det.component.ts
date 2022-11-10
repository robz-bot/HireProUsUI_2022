/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { ResourceMgntServiceService } from './../../../Services/ResourceMgntServices/resource-mgnt-service.service';
import { employeeDetails } from 'src/app/Models/EmployeeDetails';
import { project } from 'src/app/Models/Projects';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import { OnboardDet } from './../../../Models/OnBoardDet';
import { RecruitmentServiceService } from 'src/app/Services/RecruitmentServices/recruitment-service.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { Router } from '@angular/router';
import { GlobalMenuMappingServicesService } from 'src/app/Services/GlobalMenuMappingServices/global-menu-mapping-services.service';
import { onBoardSearch } from 'src/app/Models/onBoardSearch';
import { candidate } from 'src/app/Models/Candidate';
declare function closeModal(): any;
declare function closeFilter(): any;
declare function highlightRecruitment(): any;
@Component({
  selector: 'app-on-board-det',
  templateUrl: './on-board-det.component.html',
  styleUrls: ['./on-board-det.component.css'],
})
export class OnBoardDetComponent implements OnInit {
  subMenuName: string;
  vendorUniqueId: string;
  constructor(
    private rserv: RecruitmentServiceService,
    private mserv: MasterserviceService,
    private rmserv: ResourceMgntServiceService,
    private alertify: AlertifyService,
    private _router: Router,
    private _gmenu: GlobalMenuMappingServicesService
  ) {}
  loggedInUserName: string;
  loggedInUserRole: string;
  loggedInUserId: any;
  ngOnInit(): void {
    highlightRecruitment();
    this.vendorUniqueId = sessionStorage.getItem('currentVendorId');
    this.getAllOnBoards();
    this.loggedInUserId = sessionStorage.getItem('currentUserId');
    this.loggedInUserName = sessionStorage.getItem('currentUserName');
    console.log(this.loggedInUserName);
    this.loggedInUserRole = sessionStorage.getItem('Role');

    this.subMenuName = sessionStorage.getItem('subMenuNames');

    this.enableNewSchedule = 0;
    this.enableOnboardList = 1;

    this.loadDate();
  }
  todayDate: Date;
  loadDate() {
    this.todayDate = new Date();
    console.log(this.todayDate);
  }
  ////////////////////
  enableDeleteIcon(mainMenu: string): boolean {
    return this._gmenu.mainMenuAccess2(this.subMenuName, mainMenu);
  }
  ///////////////////////
  enableNewSchedule: number;
  enableOnboardList: number;
  showNewSchedule() {
    this.getSelectedCandidates();
    this.enableNewSchedule = 1;
    this.enableOnboardList = 0;
  }
  showScheduleList() {
    this.enableNewSchedule = 0;
    this.enableOnboardList = 1;
  }
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15, 20];
  index = 0;

  handlePageChange(event): void {
    console.log(event);
    this.page = event;
    //this.index = (event - 1) * this.pageSize + 1;
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }

  loader = 0;
  selectedCandidates: string[] = ['24'];
  selectedCandidatesList: any;
  selectedCandidatesListCount: number;
  getSelectedCandidates() {
    this.rserv
      .getCandidatesByRecStatusList(this.selectedCandidates)
      .subscribe((data) => {
        console.log(data);
        this.selectedCandidatesList = data;
        this.selectedCandidatesListCount = this.selectedCandidatesList.length;
      });
  }

  onBoardListCount: number;
  getAllOnBoards() {
    this.loader = 1;
    this.rserv.getAllOnBoards().subscribe((data) => {
      console.log(data);
      this.loader = 0;
      this.onBoardList = data;
      this.onBoardListCount = this.onBoardList.length;
    });
  }

  projectList: project[];
  getAllProjects(buId: string) {
    this.mserv.getProjectsByBuId(buId).subscribe((data) => {
      console.log(data);
      this.projectList = data;
      this.projectList = this.projectList.sort((a, b) =>
        a.projectName.localeCompare(b.projectName)
      );
    });
  }

  searchOnboardDto: onBoardSearch = new onBoardSearch();
  /**
   * Searchs onboard
   * @returns
   */
  searchOnboard() {
    if (this.searchOnboardDto.jrNumber == '') {
      this.alertify.errorMsg('Job Request is Required');
      return;
    }
    this.loader = 1;
    this.rserv.searchOnboard(this.searchOnboardDto).subscribe((data) => {
      console.log(data);
      this.resetBtn = true;
      this.loader = 0;
      this.onBoardList = data;
      closeFilter();
      this.handlePageChange(1);
    });
  }

  searchOnboardAdv() {
    if (
      (this.searchOnboardDto.jrNumber == '' ||
        this.searchOnboardDto.jrNumber == undefined) &&
      (this.searchOnboardDto.workOrderNumber == '' ||
        this.searchOnboardDto.workOrderNumber == undefined) &&
      (this.searchOnboardDto.employeeId == '' ||
        this.searchOnboardDto.employeeId == undefined) &&
      (this.searchOnboardDto.employeeIdByHR == '' ||
        this.searchOnboardDto.employeeIdByHR == undefined)
    ) {
      this.alertify.errorMsg('Employee ID or Work Order ID is Required.');
      return;
    }

    this.loader = 1;
    this.rserv.searchOnboard(this.searchOnboardDto).subscribe((data) => {
      console.log(data);
      this.resetBtn = true;
      this.loader = 0;
      this.onBoardList = data;
      closeFilter();
      this.handlePageChange(1);
    });
  }

  reset() {
    this.searchOnboardDto.workOrderNumber = '';
    this.searchOnboardDto.jrNumber = '';
    this.searchOnboardDto.employeeId = '';
    this.searchOnboardDto.employeeIdByHR = '';
    this.candidate.keyword = '';
    this.getAllOnBoards();
    this.getSelectedCandidates();
    this.resetBtn = false;
  }

  candidate: candidate = new candidate();
  SelectedCandidates: string[] = ['24'];
  searchCandidateByRecStatusList() {
    if (
      this.candidate.keyword == null ||
      this.candidate.keyword == '' ||
      this.candidate.keyword == undefined
    ) {
      this.alertify.errorMsg('Candidate Name is Required');
      return;
    }
    this.rserv
      .searchCandidateByRecStatusList(
        '',
        this.candidate.keyword,
        this.SelectedCandidates,
        this.vendorUniqueId
      )
      .subscribe((data) => {
        console.log(data);
        this.selectedCandidatesList = data;
        this.selectedCandidatesListCount = this.selectedCandidatesList.length;
      });
  }

  candidateId: string;
  JRNum: string;
  getResourceId: string;
  getCandidateType: string;
  buIdOnOnboard: string;
  getContactNumber: string;

  enablebenchData: boolean = false;
  getDet(
    buId: string,
    id: string,
    jrNumber: string,
    resourceId: string,
    canType: string,
    contactNum: string
  ) {
    this.getAllProjects(buId);
    this.buIdOnOnboard = buId;
    console.log('ContactNum: ' + contactNum);
    this.candidateId = id;
    this.JRNum = jrNumber;
    this.getResourceId = resourceId;
    this.getCandidateType = canType;
    this.getContactNumber = contactNum;

    if (
      this.getResourceId != undefined &&
      this.getResourceId != null &&
      this.getResourceId != ''
    ) {
      this.enablebenchData = true;
      this.getEmpDetById(this.getResourceId);
    } else {
      this.enablebenchData = false;
      this.onBoard.docsVerified = undefined;
      this.onBoard.joined = undefined;
      this.onBoard.workOrderNumber = '';
      this.onBoard.employeeId = '';
      this.onBoard.employeeIdByHR = '';
    }
  }

  resourceDet: employeeDetails = new employeeDetails();
  getEmpDetById(id) {
    this.rmserv.getResourceMgmt(id).subscribe((data) => {
      console.log(data);
      this.resourceDet = data;
      this.onBoard.docsVerified = '1';
      this.onBoard.joined = '1';
      this.onBoard.workOrderNumber = this.resourceDet.workOrderNumber;
      this.onBoard.employeeId = this.resourceDet.employeeId;
      this.onBoard.employeeIdByHR = this.resourceDet.employeeIdByHR;
      this.onBoard.email = this.resourceDet.email;
      this.onBoard.contactNumber = this.resourceDet.contactNumber;
    });
  }

  /**
   * Validates email
   * @param email
   * @returns true if email
   */
  validateEmail(email): boolean {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g;
    return emailRegex.test(String(email.toLowerCase()));
  }

  resetBtn: boolean = false;
  onBoard: OnboardDet = new OnboardDet();
  onBoardList: any;
  addAPIData: any;
  addOnBoard(f: NgForm) {
    console.log(f);
    if (this.onBoard.email == null || this.onBoard.email == '') {
      this.alertify.errorMsg('Email is Required!');
      return;
    }
    if (!this.validateEmail(this.onBoard.email)) {
      this.alertify.errorMsg('Email is Invalid!');
      return;
    }

    this.loader = 1;
    this.onBoard.updatedBy = this.loggedInUserId;
    this.onBoard.createdBy = this.loggedInUserId;
    this.onBoard.candidateId = this.candidateId;
    this.onBoard.jrNumber = this.JRNum;
    this.onBoard.resourceId =
      this.getResourceId == null ? '' : this.getResourceId;
    this.onBoard.candidateType = this.getCandidateType;
    this.onBoard.buId = this.buIdOnOnboard;
    this.onBoard.contactNumber = this.getContactNumber;
    this.onBoard.projectId =
      this.onBoard.projectId == null || this.onBoard.projectId == 'undefined'
        ? '0'
        : this.onBoard.projectId;

    console.log(this.onBoard);

    this.rserv.addOnBoard(this.onBoard).subscribe((data) => {
      console.log(data);
      this.addAPIData = data;
      this.loader = 0;
      if (this.addAPIData.status == 1) {
        this.alertify.errorMsg(this.addAPIData.message);
        if (
          this.onBoard.projectId == null ||
          this.onBoard.projectId == '' ||
          this.onBoard.projectId == '0'
        ) {
          this.onBoard.projectId = undefined;
        }
      } else {
        closeModal();
        this.alertify.updatedMsg('Onboard Details');
        this.getAllOnBoards();
        this.getSelectedCandidates();
        this.showScheduleList();
        f.resetForm();
      }
    });
  }

  gotoJobReqView(id) {
    this._router.navigate(['hirepros/view-job-request', id]);
  }

  gotoCandidateView(id) {
    this._router.navigate(['hirepros/view-candidate', id]);
  }

  updateid: string;
  updateCandidateId: string;
  updateJrNum: string;
  addedRes: any;
  getId(
    buId: string,
    id: string,
    candidateId: string,
    jrNumber: string,
    resourceId: string
  ) {
    this.getResourceId = resourceId;
    this.loader = 1;
    this.getAllProjects(buId);
    console.log(id);
    this.updateid = id;
    this.updateCandidateId = candidateId;
    this.updateJrNum = jrNumber;
    this.rserv.getOnBoard(id).subscribe((data) => {
      this.onBoard = data;
      if (this.onBoard.projectId == null) {
        this.onBoard.projectId = undefined;
      }
      this.loader = 0;
      console.log(data);
    });
  }
  datares: any;
  updateOnBoardDet(f: NgForm) {
    console.log(f);

    if (!this.validateEmail(this.onBoard.email)) {
      this.alertify.errorMsg('Email is Invalid!');
      return;
    }

    this.loader = 1;
    this.onBoard.createdBy = this.loggedInUserId;
    this.onBoard.updatedBy = this.loggedInUserId;
    this.onBoard.candidateId = this.updateCandidateId;
    this.onBoard.jrNumber = this.updateJrNum;
    this.onBoard.resourceId =
      this.getResourceId == null ? '' : this.getResourceId;
    this.onBoard.projectId =
      this.onBoard.projectId == null || this.onBoard.projectId == 'undefined'
        ? '0'
        : this.onBoard.projectId;

    console.log(this.onBoard);
    this.rserv.updateOnBoard(this.onBoard).subscribe((data) => {
      console.log(data);
      this.datares = data;
      this.loader = 0;
      if (this.datares.status == 1) {
        this.alertify.errorMsg(this.datares.message);
        if (
          this.onBoard.projectId == null ||
          this.onBoard.projectId == '' ||
          this.onBoard.projectId == '0'
        ) {
          this.onBoard.projectId = undefined;
        }
      } else {
        this.alertify.updatedMsg('Onboard Details');
        closeModal();
        this.getAllOnBoards();
      }
    });
  }

  deleteOnboardDetail(id: string) {
    this.loader = 1;
    this.rserv.deleteOnBoardById(id).subscribe((data) => {
      console.log(data);
      this.loader = 0;
      if (data) {
        this.alertify.deleteMsg('Onboard Details');
        this.getAllOnBoards();
      }
    });
  }

  resetForm(f: NgForm) {
    f.resetForm({
      projectId: 'undefined',
      docsVerified: 'undefined',
      joined: 'undefined',
    });
    this.enablebenchData = false;
  }

  noManualType(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
}
