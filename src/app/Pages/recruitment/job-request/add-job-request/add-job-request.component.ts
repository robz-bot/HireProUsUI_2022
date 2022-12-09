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
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessUnit } from 'src/app/Models/BusinessUnit';
import { recRoleByCustomer } from 'src/app/Models/cus-recrole-map';
import { customer } from 'src/app/Models/Customers';
import { jobReq } from 'src/app/Models/JobRequest';
import { recrole } from 'src/app/Models/RecRoles';
import { UserReg } from 'src/app/Models/UserReg';
import { vendor } from 'src/app/Models/vendor';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import { RecruitmentServiceService } from 'src/app/Services/RecruitmentServices/recruitment-service.service';
import { UserRegServicesService } from 'src/app/Services/UserRegServices/user-reg-services.service';
import { VendorServiceService } from 'src/app/Services/VendorServices/vendor-service.service';
declare function highlightRecruitment(): any;
declare function closeModal(): any;

@Component({
  selector: 'app-add-job-request',
  templateUrl: './add-job-request.component.html',
  styleUrls: ['./add-job-request.component.css'],
})
export class AddJobRequestComponent implements OnInit {
  loggedInUserId: string;

  constructor(
    private aroute: ActivatedRoute,
    private _router: Router,
    private mserv: MasterserviceService,
    private alertify: AlertifyService,
    private rserv: RecruitmentServiceService,
    private userv: UserRegServicesService,
    private vendorService: VendorServiceService
  ) {}
  id: string;
  currentUserId: any;
  currentUserBUId: any;
  SS_Role: any;
  loggedInUserName: string;
  loggedInUserRole: string;
  loader: number = 0;
  jobReq: jobReq = new jobReq();

  ngOnInit(): void {
    highlightRecruitment();

    this.loadRecruiters();
    this.loggedInUserId = sessionStorage.getItem('currentUserId');
    this.loggedInUserName = sessionStorage.getItem('currentUserName');
    this.currentUserId = sessionStorage.getItem('currentUserId');
    this.currentUserBUId = sessionStorage.getItem('currentUserBUId');
    this.SS_Role = sessionStorage.getItem('Role');

    this.loadroles();
    this.loadcustomers();
    this.loadbu();

    this.loadDate();
    this.loadActiveVendors();
    this.loadDefaultValues();
  }

  loadDefaultValues(){
    this.jobReq.payRange = 'As Per Standard'
    this.jobReq.payFrequency = 'Monthly'
    this.jobReq.remoteOption = 'No'
    this.jobReq.employmentType = 'Full Time'
  }

  activeVendors: vendor[];
  loadActiveVendors() {
    this.vendorService.getActiveVendors().subscribe((data) => {
      console.log(data);
      this.activeVendors = data;
    });
  }

  todayDate: Date;
  loadDate() {
    this.todayDate = new Date();
    console.log(this.todayDate);
  }
  currencyList: any[] = [{ name: 'INR' }, { name: 'JPY' }, { name: 'USD' }];
  payFrequencyList: any[] = [
    { name: 'Hourly' },
    { name: 'Weekly' },
    { name: 'Monthly' },
    { name: 'Yearly' },
  ];
  availableRecRoleTab: number = 1;
  newRecRoleTab: number = 0;
  showAvailableRecRole() {
    this.availableRecRoleTab = 1;
    this.newRecRoleTab = 0;
  }
  showNewRecRole() {
    this.availableRecRoleTab = 0;
    this.newRecRoleTab = 1;
  }

  disableRecRole: boolean = false;
  visibleAdd: boolean = false;
  rolelist: recrole[];
  loadroles() {
    this.mserv.getrecroleList().subscribe((data) => {
      this.rolelist = data;
      this.rolelist = this.rolelist.sort((a, b) =>
        a.recruitmentRoleName.localeCompare(b.recruitmentRoleName)
      );
      console.log(this.rolelist);
    });
  }
  changeCusId: string;
  recRoleDdl: recRoleByCustomer[];
  onChangeCustomer(cusId: string) {
    this.changeCusId = cusId;
    this.disableRecRole = true;
    this.visibleAdd = true;
    this.mserv.getRecRolesByCustomerId(cusId).subscribe((data) => {
      this.recRoleDdl = data;
      console.log(this.recRoleDdl);
    });
  }
  selId: string;
  getSelectedId(id: string) {
    this.selId = id;
  }

  selDataRes: any;
  selectRecRole() {
    console.log(this.changeCusId, this.loggedInUserId, this.selId);
    this.mserv
      .mapExistingRecRoleWithCustomer(
        this.changeCusId,
        this.loggedInUserId,
        this.selId
      )
      .subscribe((data) => {
        this.selDataRes = data;
        console.log('selectRecRole: ' + this.selDataRes);
        // this.jobReq.roleId = this.selDataRes.id;
        this.alertify.successMsg('Recruitment Role Selected');
        this.onChangeCustomer(this.changeCusId);
        closeModal();
      });
  }
  disableContract: boolean = false;
  onChangeEmpType(type: string) {
    if (type == 'Contract') {
      this.disableContract = true;
    } else {
      this.disableContract = false;
      this.jobReq.contractDuration = '';
    }
  }

  newRoleText: string;
  mapNewRecRoleWithCustomer() {
    console.log(this.changeCusId, this.loggedInUserId, this.newRoleText);
    if (this.newRoleText != undefined || this.newRoleText != null) {
      this.mserv
        .mapNewRecRoleWithCustomer(
          this.changeCusId,
          this.loggedInUserId,
          this.newRoleText
        )
        .subscribe((data) => {
          console.log('mapNewRecRoleWithCustomer: ' + data);
          this.alertify.successMsg('Recruitment Role');
          this.onChangeCustomer(this.changeCusId);
          closeModal();
        });
    } else {
      this.alertify.errorMsg('Recruitment Role is Required!');
    }
  }

  cuslist: customer[];
  loadcustomers() {
    this.mserv.getCustomersList().subscribe((data) => {
      this.cuslist = data;
      this.cuslist = this.cuslist.sort((a, b) =>
        a.customerName.localeCompare(b.customerName)
      );
    });
  }

  recruitersList: UserReg[];
  loadRecruiters() {
    this.userv.getRecruitersList().subscribe((data) => {
      this.recruitersList = data;
      this.recruitersList = this.recruitersList.sort((a, b) =>
        a.fullName.localeCompare(b.fullName)
      );
    });
  }
  bulist: BusinessUnit[]=[];
  selectedBUList: BusinessUnit[]=[];
  loadbu() {
    this.mserv.getBUList().subscribe((data) => {
      this.bulist = data;
      if (
        this.SS_Role != 'Sales Manager' &&
        this.SS_Role != 'Recruitment Manager' &&
        this.SS_Role != 'Super Admin'
      ) {
        this.bulist.forEach((element: any) => {
          if (element.id == this.currentUserBUId) {
            this.selectedBUList.push(element);
          }
        });
      } else {
        this.selectedBUList = this.bulist;
      }
      this.selectedBUList = this.selectedBUList.sort((a, b) =>
        a.businessUnitName.localeCompare(b.businessUnitName)
      );
    });
    console.log(this.selectedBUList);
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
  jobReqList: any;
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
  //Add New Job Request
  @ViewChild('requesterName') requesterName: ElementRef;
  addNewJobReq(f: NgForm) {
    //
    console.log(f);

    if (f.form.valid) {
      //console.log(this.loggedInUserId);
      this.loader = 1;
      this.jobReq.createdBy = this.loggedInUserId;
      this.jobReq.updatedBy = this.loggedInUserId;
      this.jobReq.requesterId = this.loggedInUserId;
      this.jobReq.requesterName = this.requesterName.nativeElement.value;

      this.savenewJobReq(this.jobReq);
    }
  }
  datares: any;
  savenewJobReq(jobReq) {
    this.rserv.newJobRequest(jobReq).subscribe((data) => {
      //console.log(data);
      this.datares = data;
      this.loader = 0;
      if (this.datares.status == 1) {
        this.alertify.errorMsg(this.datares.message);
      } else {
        this.alertify.successMsg(
          this.datares.referenceNumber + ' - Job Request'
        );
        this._router.navigateByUrl('hirepros/job-request');
        this.loadJobReq();
        this.clearJobReqField();
      }
    });
    this.loadJobReq();
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
  }

  noManualType(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }

  goBack() {
    history.back();
  }
}
