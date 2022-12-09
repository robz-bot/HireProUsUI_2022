/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-11
 * @modify date 2021-10-11
 * @desc [description]
 */
import { Component, OnInit } from '@angular/core';
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
  selector: 'app-job-request-clone',
  templateUrl: './job-request-clone.component.html',
  styleUrls: ['./job-request-clone.component.css'],
})
export class JobRequestCloneComponent implements OnInit {
  loggedInUserName: string;
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
  loader: number = 0;
  jobReq: jobReq = new jobReq();
  ngOnInit(): void {
    highlightRecruitment();

    this.loadroles();
    this.loadcustomers();
    this.loadbu();
    this.loadRecruiters();
    this.currentUserId = sessionStorage.getItem('currentUserId');
    this.loggedInUserName = sessionStorage.getItem('currentUserName');
    this.currentUserBUId = sessionStorage.getItem('currentUserBUId');
    this.SS_Role = sessionStorage.getItem('Role');

    this.id = this.aroute.snapshot.params['id'];
    this.rserv.getJobRequestById(this.id).subscribe(
      (data) => {
        this.jobReq = data;
        console.log(this.jobReq);
        this.onChangeCustomer(this.jobReq.customerId);
      },
      (error) => console.log(error)
    );
    this.loadDate();
    this.loadActiveVendors();
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
      console.log(data);
    });
  }
  selId: string;
  getSelectedId(id: string) {
    this.selId = id;
  }

  selDataRes: any;
  selectRecRole() {
    console.log(this.changeCusId, this.currentUserId, this.selId);
    this.loader = 1;
    this.mserv
      .mapExistingRecRoleWithCustomer(
        this.changeCusId,
        this.currentUserId,
        this.selId
      )
      .subscribe((data) => {
        this.selDataRes = data;
        console.log('selectRecRole: ' + this.selDataRes);
        this.loader = 0;
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
    console.log(this.changeCusId, this.currentUserId, this.newRoleText);
    this.loader = 1;
    this.mserv
      .mapNewRecRoleWithCustomer(
        this.changeCusId,
        this.currentUserId,
        this.newRoleText
      )
      .subscribe((data) => {
        console.log('mapNewRecRoleWithCustomer: ' + data);
        this.loader = 0;
        this.alertify.successMsg('New Role Mapped and');
        this.onChangeCustomer(this.changeCusId);
        closeModal();
      });
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
  bulist: BusinessUnit[];
  selectedBUList: BusinessUnit[] = [];
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
  noManualType(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
  //Clone Job Request
  cloneJobReq(f: NgForm) {
    //consolelog(f.form.value);
    if (f.form.valid) {
      this.loader = 1;
      this.jobReq.createdBy = this.currentUserId;
      this.jobReq.updatedBy = this.currentUserId;
      this.jobReq.requesterId = this.currentUserId;
      this.rserv.newJobRequest(this.jobReq).subscribe((data) => {
        //consolelog('Data:' + data);
        this.loader = 0;
        if (data) {
          this._router.navigateByUrl('hirepros/job-request');
          this.alertify.clonedMsg('Job Request');
        }
      });
    }
  }
}
