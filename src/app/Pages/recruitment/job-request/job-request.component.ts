/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { GlobalMenuMappingServicesService } from 'src/app/Services/GlobalMenuMappingServices/global-menu-mapping-services.service';
import { UserRegServicesService } from 'src/app/Services/UserRegServices/user-reg-services.service';
import { RecruitmentServiceService } from './../../../Services/RecruitmentServices/recruitment-service.service';
import { jobReq } from './../../../Models/JobRequest';
import { BusinessUnit } from 'src/app/Models/BusinessUnit';
import { customer } from './../../../Models/Customers';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { recrole } from 'src/app/Models/RecRoles';
import { JobReq } from 'src/app/Services/GlobalConstants';
import { UserReg } from 'src/app/Models/UserReg';
import { jobReqSearch } from 'src/app/Models/jobReqSearch';
import { vendor } from 'src/app/Models/vendor';
import { LoggedInVendorServiceService } from 'src/app/Services/LoggedInVendorServices/logged-in-vendor-service.service';
import { VendorServiceService } from 'src/app/Services/VendorServices/vendor-service.service';

declare function closeModal(): any;
declare function closeFilter(): any;
declare function highlightRecruitment(): any;

@Component({
  selector: 'app-job-request',
  templateUrl: './job-request.component.html',
  styleUrls: ['./job-request.component.css'],
})
export class JobRequestComponent implements OnInit {
  loggedInUserBUId: string;
  constructor(
    private rserv: RecruitmentServiceService,
    private mserv: MasterserviceService,
    private alertify: AlertifyService,
    private _router: Router,
    private userv: UserRegServicesService,
    private _gmenu: GlobalMenuMappingServicesService,
    private vendorService: VendorServiceService
  ) {}

  loggedInUserName: string;
  loggedInUserRole: string;
  UserType: number;
  loggedInUserId: any;
  expandContent = true;
  subMenuName: string;

  ngOnInit(): void {
    highlightRecruitment();

    this.loadJobReq();
    this.loadroles();
    this.loadcustomers();
    this.loadbu();
    this.loadUsers();
    this.loadRecruiters();
    this.loadActiveVendors();

    this.loggedInUserId = sessionStorage.getItem('currentUserId');
    this.loggedInUserName = sessionStorage.getItem('currentUserName');
    this.loggedInUserRole = sessionStorage.getItem('Role');
    this.subMenuName = sessionStorage.getItem('subMenuNames');
    this.loggedInUserBUId = sessionStorage.getItem('currentUserBUId');
  }

  activeVendors: vendor[];
  loadActiveVendors() {
    this.vendorService.getActiveVendors().subscribe((data) => {
      console.log(data);
      this.activeVendors = data;
    });
  }

  enableDeleteIcon(subMenu: string): boolean {
    // return this._gmenu.subMenuAccess(icon);
    return this._gmenu.subMenuAccess2(this.subMenuName, subMenu);
  }

  enableAddCandidate(subMenu: string): boolean {
    // return this._gmenu.subMenuAccess(icon);
    return this._gmenu.subMenuAccess2(this.subMenuName, subMenu);
  }

  enableSubMenu(subMenu: string): boolean {
    // return this._gmenu.subMenuAccess(icon);
    return this._gmenu.subMenuAccess2(this.subMenuName, subMenu);
  }

  checkLoggedInBuAndJRBu(jrBuId: string) {
    var isTrue = false;
    if (jrBuId == this.loggedInUserBUId) {
      isTrue = true;
      return isTrue;
    }
    return isTrue;
  }

  cloneJobRequest(jRUniqueId: string) {
    this._router.navigate(['hirepros/clone-job-request', jRUniqueId]);
  }

  rolelist: recrole[];
  loadroles() {
    this.mserv.getrecroleList().subscribe((data) => {
      this.rolelist = data;
    });
  }
  userList: UserReg[];
  loadUsers() {
    this.userv.getUsersList().subscribe((data) => {
      this.userList = data;
    });
  }
  recruitersList: UserReg[];
  loadRecruiters() {
    this.userv.getRecruitersList().subscribe((data) => {
      this.recruitersList = data;
      //console.log(this.recruitersList);
    });
  }
  cuslist: customer[];
  loadcustomers() {
    this.mserv.getCustomersList().subscribe((data) => {
      this.cuslist = data;
    });
  }
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15, 20];

  handlePageChange(event): void {
    this.page = event;
    //this.loadJobReq();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    //this.loadJobReq();
  }
  bulist: BusinessUnit[];
  loadbu() {
    this.mserv.getBUList().subscribe((data) => {
      this.bulist = data;
    });
  }

  reset() {
    this.searchJobReq.customerId = undefined;
    this.searchJobReq.buId = undefined;
    this.searchJobReq.roleId = undefined;
    this.searchJobReq.recruiterId = undefined;
    this.searchJobReq.employmentType = undefined;
    this.searchJobReq.placementFor = undefined;
    this.searchJobReq.fromDateTime = null;
    this.searchJobReq.toDateTime = null;
    this.searchJobReq.jrNumber = '';
    this.searchJobReq.jobReqStatus = undefined;
    this.searchJobReq.vendorId = undefined;
    this.searchJobReq.vendorPriority = undefined;
    this.resetBtn = false;
    this.loadJobReq();
  }
  resetBtn: boolean = false;
  searchJobReq: jobReqSearch = new jobReqSearch();
  search(f: NgForm) {
    if (
      (this.searchJobReq.jrNumber == '' ||
        this.searchJobReq.jrNumber == null ||
        this.searchJobReq.jrNumber == undefined) &&
      (this.searchJobReq.employmentType == '' ||
        this.searchJobReq.employmentType == null ||
        this.searchJobReq.employmentType == undefined) &&
      (this.searchJobReq.buId == '' ||
        this.searchJobReq.buId == null ||
        this.searchJobReq.buId == undefined) &&
      (this.searchJobReq.jobReqStatus == '' ||
        this.searchJobReq.jobReqStatus == null ||
        this.searchJobReq.jobReqStatus == undefined) &&
      (this.searchJobReq.vendorPriority == '' ||
        this.searchJobReq.vendorPriority == null ||
        this.searchJobReq.vendorPriority == undefined)
    ) {
      this.alertify.errorMsg('Select any one Criteria');
      return;
    }
    console.log(this.searchJobReq);

    this.loader = 1;
    this.rserv.searchJobRequest(this.searchJobReq).subscribe((data) => {
      this.jobReqList = data;
      this.resetBtn = true;
      //console.log(this.jobReqList);
      this.loader = 0;
      closeFilter();
      this.handlePageChange(1);
    });
  }
  /**
   * Goto add candidate
   * @param id
   * @param roleName
   * @param type
   */
  gotoAddCandidate(id: string, roleName: string, type: string) {
    JobReq.RecRoleFromJobReq = roleName;
    this._router.navigate(['hirepros/add-candidate', id, type]);
  }
  /**
   * Goto job req view
   * @param id
   */
  gotoJobReqView(id) {
    this._router.navigate(['hirepros/view-job-request', id]);
  }
  //Validate Text Fields based on inputs
  isNumberKey(evt) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
    return true;
  }
  isAlphabetKey(evt) {
    var acharCode = evt.which ? evt.which : evt.keyCode;
    if (
      (acharCode > 64 && acharCode < 91) ||
      (acharCode > 96 && acharCode < 123)
    )
      return true;
    return false;
  }
  // Declarations
  jobReq: jobReq = new jobReq();
  jobReqList: any;
  loader: number = 0;

  // Load Job Request List
  loadJobReq() {
    this.loader = 1;
    this.jobReq.keyword = '';
    this.rserv.getJobRequestList().subscribe((data) => {
      this.jobReqList = data;
      console.log(this.jobReqList);
      this.loader = 0;
    });
  }

  findDetails(data) {
    return this.jobReqList.filter(
      (x) => x.referenceNumber === data.referenceNumber
    );
  }

  //To clear Job Req Fields
  clearJobReqField() {
    this.jobReq.placementFor = undefined;
    this.jobReq.remoteOption = undefined;
    this.jobReq.roleId = undefined;
    this.jobReq.buId = undefined;
    this.jobReq.noOfOpenings = ' ';
    this.jobReq.optionalSkills = ' ';
    this.jobReq.mandatorySkills = ' ';
    this.jobReq.jobDescription = ' ';
    this.jobReq.location = ' ';
    this.jobReq.payRange = ' ';
    this.jobReq.employmentType = undefined;
    this.jobReq.contractDuration = ' ';
    this.jobReq.projectStartDate = undefined;
    this.jobReq.buId = undefined;
    this.jobReq.recruiterId = undefined;
    this.jobReq.jobReqStatus = undefined;
  }

  jrId: string;
  recruiter: string;
  getJRNumber(id) {
    this.jrId = id;
  }
  @ViewChild('recruiterId') recId: ElementRef;
  //Update Recruiter
  updateRecruiter(f: NgForm) {
    //console.log(this.jrId);
    //console.log(this.jobReq.recruiterId);
    //console.log(this.loggedInUserId);
    if (
      this.jobReq.recruiterId != null ||
      this.jobReq.recruiterId != undefined
    ) {
      this.jobReq.updatedBy = this.loggedInUserId;
      this.loader = 1;
      this.rserv
        .updateRecruiter(
          this.jrId,
          this.jobReq.recruiterId,
          this.loggedInUserId
        )
        .subscribe((data) => {
          //console.log(data);
          if (data) {
            this.loader = 0;
            closeModal();
            this.loadJobReq();
            this.alertify.updatedMsg('Recruiter');
            this.jobReq.recruiterId = undefined;
          }
        });
    } else {
      this.alertify.errorMsg('Recruiter is Required!');
    }
  }

  gotoNewJobRequest() {
    this._router.navigateByUrl('hirepros/add-job-request');
  }

  //Update Job Request
  updateJobReq(id) {
    this._router.navigate(['hirepros/update-job-request', id]);
  }

  //Delete Job Req By Id
  deleteResData: any;
  deleteJobReq(id) {
    this.loader = 1;

    this.rserv.deleteJobRequest(id).subscribe((data) => {
      this.deleteResData = data;

      this.loader = 0;
      if (this.deleteResData.status == 1) {
        this.alertify.errorMsg(this.deleteResData.message);
        return;
      } else {
        this.alertify.deleteMsg('Job Request');
        this.loadJobReq();
      }
    });
  }
  /**
   * Goto bench candidate list
   * @param refNumber
   */
  gotoBenchCandidateList(refNumber) {
    this._router.navigate(['hirepros/bench-details', refNumber]);
  }

  resetForm(anyForm: NgForm) {
    anyForm.resetForm();
  }

  gotoAICandidate(item: any) {
    this._router.navigate(['hirepros/add-candidate-ai', item.referenceNumber]);
  }
}
