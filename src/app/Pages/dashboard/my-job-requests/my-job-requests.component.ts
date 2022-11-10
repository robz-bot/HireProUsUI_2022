/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BusinessUnit } from 'src/app/Models/BusinessUnit';
import { customer } from 'src/app/Models/Customers';
import { jobReqSearch } from 'src/app/Models/jobReqSearch';
import { jobReq } from 'src/app/Models/JobRequest';
import { recrole } from 'src/app/Models/RecRoles';
import { UserReg } from 'src/app/Models/UserReg';
import { vendor } from 'src/app/Models/vendor';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { JobReq } from 'src/app/Services/GlobalConstants';
import { GlobalMenuMappingServicesService } from 'src/app/Services/GlobalMenuMappingServices/global-menu-mapping-services.service';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import { RecruitmentServiceService } from 'src/app/Services/RecruitmentServices/recruitment-service.service';
import { UserRegServicesService } from 'src/app/Services/UserRegServices/user-reg-services.service';
import { VendorServiceService } from 'src/app/Services/VendorServices/vendor-service.service';

declare function closeModal(): any;
declare function closeFilter(): any;
declare function highlightRecruitment(): any;

@Component({
  selector: 'app-my-job-requests',
  templateUrl: './my-job-requests.component.html',
  styleUrls: ['./my-job-requests.component.css'],
})
export class MyJobRequestsComponent implements OnInit {
  cVendorId: string;
  isVendor: string;
  constructor(
    private rserv: RecruitmentServiceService,
    private mserv: MasterserviceService,
    private alertify: AlertifyService,
    private _router: Router,
    private aroute: ActivatedRoute,
    private userv: UserRegServicesService,
    private _gmenu: GlobalMenuMappingServicesService,
    private vendorService: VendorServiceService
  ) {}

  loggedInUserName: string;
  loggedInUserRole: string;
  UserType: number;
  loggedInUserId: string;
  expandContent = true;
  subMenuName: string;

  ngOnInit(): void {
    highlightRecruitment();

    this.loggedInUserId = sessionStorage.getItem('currentUserId');
    this.loggedInUserId = this.aroute.snapshot.params['userId'];
    this.loggedInUserName = sessionStorage.getItem('currentUserName');
    this.loggedInUserRole = sessionStorage.getItem('Role');
    this.subMenuName = sessionStorage.getItem('subMenuNames');

    this.cVendorId = sessionStorage.getItem('currentVendorId');

    this.isVendor = sessionStorage.getItem('isVendor');
    console.log(this.loggedInUserId);

    this.loadJobReq();
    this.loadroles();
    this.loadcustomers();
    this.loadbu();
    this.loadUsers();
    this.loadRecruiters();
    this.loadActiveVendors();
  }
  activeVendors: vendor[];
  loadActiveVendors() {
    this.vendorService.getActiveVendors().subscribe((data) => {
      console.log(data);
      this.activeVendors = data;
    });
  }

  enableDeleteIcon(subMenu: string): boolean {
    //return this._gmenu.subMenuAccess(icon);
    return this._gmenu.subMenuAccess2(this.subMenuName, subMenu);
  }

  enableAddCandidate(subMenu: string): boolean {
    //return this._gmenu.subMenuAccess(icon);
    return this._gmenu.subMenuAccess2(this.subMenuName, subMenu);
  }

  enableSubMenu(subMenu: string): boolean {
    //return this._gmenu.subMenuAccess(icon);
    return this._gmenu.subMenuAccess2(this.subMenuName, subMenu);
  }
  ///////////////////////

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
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
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
      (this.searchJobReq.vendorPriority == null ||
        this.searchJobReq.vendorPriority == undefined)
    ) {
      this.alertify.errorMsg('Select any one Criteria');
      return;
    }
    console.log(this.searchJobReq);

    this.loader = 1;
    //this.searchJobReq.vendorId = this.cVendorId;
    this.rserv
      .searchMyJobRequest(this.loggedInUserId, this.searchJobReq)
      .subscribe((data) => {
        this.jobReqList = data;
        this.resetBtn = true;
        //console.log(this.jobReqList);
        this.loader = 0;
        closeFilter();
        this.handlePageChange(1);
      });
  }
  gotoAddCandidate(id: string, roleName: string, type: string) {
    JobReq.RecRoleFromJobReq = roleName;
    this._router.navigate(['hirepros/add-candidate', id, type]);
  }

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
    console.log(this.loggedInUserId);
    if (this.isVendor == '0') {
      this.rserv.getMyJobRequests(this.loggedInUserId).subscribe((data) => {
        this.jobReqList = data;
        console.log(this.jobReqList);
        this.loader = 0;
      });
    } else if (this.isVendor == '1') {
      this.rserv.getMyJobRequestsForVendor(this.cVendorId).subscribe((data) => {
        this.jobReqList = data;
        console.log(this.jobReqList);
        this.loader = 0;
      });
    }
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
    ////console.log(id);
    this.rserv.deleteJobRequest(id).subscribe((data) => {
      this.deleteResData = data;
      ////console.log(data);
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
  gotoBenchCandidateList(refNumber) {
    this._router.navigate(['hirepros/bench-details', refNumber]);
  }
}
