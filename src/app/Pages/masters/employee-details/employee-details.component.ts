/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
 import { ResourceMgntServiceService } from './../../../Services/ResourceMgntServices/resource-mgnt-service.service';
 import { employeeDetails } from './../../../Models/EmployeeDetails';
 import { customer } from 'src/app/Models/Customers';
 import { project } from 'src/app/Models/Projects';
 import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
 import { NgForm } from '@angular/forms';
 import { Component, OnInit } from '@angular/core';
 import { BusinessUnit } from 'src/app/Models/BusinessUnit';
 import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
 declare function highlightService(): any;
 declare function closeFilter(): any;
 declare function closeModal(): any;

 @Component({
   selector: 'app-employee-details',
   templateUrl: './employee-details.component.html',
   styleUrls: ['./employee-details.component.css'],
 })
 export class EmployeeDetailsComponent implements OnInit {
   constructor(
     private rmserv: ResourceMgntServiceService,
     private mserv: MasterserviceService,
     private alertify: AlertifyService
   ) {}

   loggedInUserId: string;
   ngOnInit(): void {
     highlightService();
     this.showListEmp();
     this.loadBu();
     this.loadProject();
     this.loadCustomer();
     this.getAllEmployeeIds();
     this.getAllWorkOrderNumbers();

     this.loggedInUserId = sessionStorage.getItem('currentUserId');

     this.getAllResourceMgmts();
     this.loadDate();
   }

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
    * @param event
    */
   handlePageSizeChange(event): void {
     this.pageSize = event.target.value;
     this.page = 1;
   }

   loader: number = 0;
   /**
    * Resets form
    * @param f
    */
   resetForm(f: NgForm) {
     f.resetForm({
       projectAllocation: 'undefined',
       employmentType: 'undefined',
       projectId: 'undefined',
       buId: 'undefined',
     });
   }
   /**
    * Resets form add show list emp
    * added on 10/8/2021
    * @param f
    */
   resetFormAddShowListEmp(f: NgForm) {
     f.resetForm({
       projectAllocation: 'undefined',
       employmentType: 'undefined',
       projectId: 'undefined',
       buId: 'undefined',
     });
     this.showListEmp();
   }

   addEmp: boolean = false;
   updateEmp: boolean = false;
   listEmp: boolean = false;
   editEmp: boolean = false;
   /**
    * Shows add emp
    */
   showAddEmp() {
     this.addEmp = true;
     this.listEmp = false;
     this.editEmp = false;
     this.updateEmp = false;
   }
   /**
    * Shows update emp
    * @param id
    */
   showUpdateEmp(id) {
     this.addEmp = false;
     this.listEmp = false;
     this.editEmp = false;
     this.updateEmp = true;

     this.getEmpDetById(id);
   }
   /**
    * Shows list emp
    */
   showListEmp() {
     this.addEmp = false;
     this.listEmp = true;
     this.editEmp = false;
     this.updateEmp = false;
   }
   employeeDetFilter: boolean = false;
   /**
    * Shows filter
    */
   showFilter() {
     this.employeeDetFilter = true;
   }
   allEmpIds: any;
   /**
    * Gets all employee ids
    */
   getAllEmployeeIds(): void {
     this.rmserv.getAllEmployeeIds().subscribe((data) => {
       this.allEmpIds = data;
     });
   }
   allWONum: any;
   /**
    * Gets all work order numbers
    */
   getAllWorkOrderNumbers() {
     this.rmserv.getAllWorkOrderNumbers().subscribe((data) => {
       this.allWONum = data;
     });
   }

   bulist: BusinessUnit[];
   /**
    * Loads bu
    */
   loadBu() {
     this.mserv.getBUList().subscribe((data) => {
       this.bulist = data;
       console.log('BU: ' + data);
       this.bulist = this.bulist.sort((a, b) =>
         a.businessUnitName.localeCompare(b.businessUnitName)
       );
     });
   }
   /**
    * Finds details
    * @param data
    * @returns
    */
   findDetails(data) {
     return this.allResources.filter((x) => x.id === data.id);
   }

   projectList: project[];
   customerprojectList: project[];

   /**
    * Loads project
    */
   loadProject() {
     this.mserv.getprojectList().subscribe((data) => {
       this.projectList = data;
       console.log('Project: ' + data);
       this.projectList = this.projectList.sort((a, b) =>
         a.projectName.localeCompare(b.projectName)
       );
     });
   }

   changedCusId: number;
   changedCustomerName: string;
   changedBuId: string;
   changedBuName: string;
   /**
    * Onchanges proj
    * @param customerId
    */
    onChangeCus(customerId: string) {  //onchangeCus
     console.log(customerId);
     // gegt c
     this.mserv.getProjectsByCustomerId(customerId).subscribe((data) => {
       console.log(data);
       this.customerprojectList=data;
       console.log(this.customerprojectList)
      /* this.changedCusId = data.customerId;
       this.changedCustomerName = data.customerName;
       this.changedBuId = data.businessUnitId;
       this.changedBuName = data.businessUnitName;*/
     });
   }

   onchangeProj(projId: string) {
       console.log(projId);
      //  this.empDet.customerId = 0
    this.mserv.getprojectById(projId).subscribe((data) => {

      console.log(data);

      this.changedCusId = data.customerId;

      this.changedCustomerName = data.customerName;

      this.changedBuId = data.businessUnitId;

      this.changedBuName = data.businessUnitName;

    });

  }


cusList: customer[];
   /**
    * Loads customer
    */
   loadCustomer() {
     this.mserv.getCustomersList().subscribe((data) => {
       this.cusList = data;
       console.log('Customer: ' + data);
       this.cusList = this.cusList.sort((a, b) =>
         a.customerName.localeCompare(b.customerName)
       );
     });
   }

   enableBu: boolean = true;
   enableOther: boolean = false;
   enableProject: boolean = true;
   enableProjectOther: boolean = false;
   enableCustomerOther: boolean = false;
   enableCustomer: boolean = true;
   /**
    * Onchanges proj alloc
    * @param alloc
    */
   onchangeProjAlloc(alloc: string) {
     if (alloc == 'Yes') {
       this.updateEmpDet.projectId = undefined;
       this.enableOther = true;
       this.enableBu = false;
       this.enableProjectOther = false;
       this.enableProject = true;
       this.enableCustomerOther =  false;
       this.enableCustomer = true;

     } else {
       this.enableBu = true;
       this.empDet.customerId = undefined;
       this.updateEmpDet.customerId = undefined;
       this.enableOther = false;
       this.enableProjectOther = true;
       this.enableProject = false;
       this.empDet.projectId = undefined;
       this.updateEmpDet.projectId = undefined;
       this.changedCustomerName = '';
       this.changedBuName = '';
       this.enableCustomerOther = true;
       this.enableCustomer = false;
     }
   }

   allResources: any;
   allResourcesCount: number;
   /**
    * Gets all resource mgmts
    */
   getAllResourceMgmts() {
     this.rmserv.getAllResourceMgmts().subscribe((data) => {
       console.log(data);
       this.allResources = data;
       this.allResourcesCount = this.allResources.length;
     });
   }

   searchModal: employeeDetails = new employeeDetails();
   /**
    * Searchs resource mgmt
    * @returns
    */
   searchResourceMgmt() {
     if (
       (this.searchModal.fullName == undefined ||
         this.searchModal.fullName == '') &&
       this.searchModal.employeeId == undefined &&
       this.searchModal.buId == undefined &&
       this.searchModal.projectAllocation == undefined &&
       this.searchModal.workOrderNumber == undefined &&
       (this.searchModal.email == undefined || this.searchModal.email == '') &&
       this.searchModal.resourceStatus == undefined
     ) {
       this.restBtn = false;
       this.alertify.errorMsg('Select any one Criteria');
       return;
     }
     this.restBtn = true;
     this.rmserv.searchResourceMgmt(this.searchModal).subscribe((data) => {
       closeFilter();
       console.log(data);
       this.handlePageChange(1);
       this.allResources = data;
       this.allResourcesCount = this.allResources.length;
     });
   }

   restBtn: boolean = false;
   /**
    * Clears search modal
    */
   clearSearchModal() {
     this.searchModal.fullName = '';
     this.searchModal.employeeId = undefined;
     this.searchModal.projectAllocation = undefined;
     this.searchModal.resourceStatus = undefined;
     this.searchModal.workOrderNumber = undefined;
     this.searchModal.buId = undefined;
     this.searchModal.email = '';
     this.getAllResourceMgmts();
     this.restBtn = false;
   }
   /**
    * Closes filter modal
    */
   closeFilterModal() {
     this.clearSearchModal();
     this.employeeDetFilter = false;
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

   empDet: employeeDetails = new employeeDetails();
   addResData: any;
   /**
    * Adds new employee
    * @param f
    * @returns
    */
   addNewEmployee(f: NgForm) {
     if (f.valid) {
       if (this.empDet.contactNumber.length < 10) {
         this.alertify.errorMsg('Contact Number should be atleast 10 digits');
         return;
       }

       if (!this.validateEmail(this.empDet.email)) {
         this.alertify.errorMsg('Email is Invalid!');
         return;
       }
       this.loader = 1;
       this.empDet.customerId = this.changedCusId;
       this.empDet.buId =
         this.changedBuId == null || this.changedBuId == undefined
           ? this.empDet.buId
           : this.changedBuId;
       this.empDet.createdBy = this.loggedInUserId;
       this.empDet.updatedBy = this.loggedInUserId;
       this.empDet.employeeId = this.empDet.employeeIdByHR;

       if(this.empDet.customerId == undefined || this.empDet.customerId ==  null){
        this.empDet.customerId = 0;
       }

       if(this.empDet.projectId == undefined || this.empDet.projectId ==  null){
        this.empDet.projectId = 0;
       }

       this.rmserv.addResourceMgmt(this.empDet).subscribe((data) => {
         console.log(data);
         this.addResData = data;
         this.loader = 0;
         if (this.addResData.status == 1) {
           this.alertify.errorMsg(this.addResData.message);
         } else {
           f.resetForm();
           this.getAllResourceMgmts();
           this.showListEmp();
           this.alertify.successMsg('Record');
           this.getAllWorkOrderNumbers();
           this.getAllEmployeeIds();
         }
       });
     }
   }
   /**
    * Gets emp det by id
    * @param id
    */
   getEmpDetById(id) {
     this.rmserv.getResourceMgmt(id).subscribe((data) => {
       console.log(data);
       this.updateEmpDet = data;
       if (this.updateEmpDet.projectAllocation == 'Yes') {
         this.enableOther = true;
         this.enableBu = false;
         //this.updateEmpDet.projectId = undefined;
         this.changedCustomerName = this.updateEmpDet.customerName;
         this.changedBuName = this.updateEmpDet.buName;
         this.changedBuId = this.updateEmpDet.buId;
         this.changedCusId = this.updateEmpDet.customerId;

       } else {
         this.enableBu = true;
         this.enableOther = false;
         this.enableProjectOther = true;
         this.enableProject = false;
         this.updateEmpDet.projectId = undefined;
         this.updateEmpDet.projectId = undefined;
         this.changedCustomerName = '';
         this.changedBuName = '';
       }
     });
   }
   toupdateStatusId: string;
   /**
    * Gets id
    * @param id
    */
   getId(id: string) {
     this.toupdateStatusId = id;

     this.rmserv.getResourceMgmt(id).subscribe((data) => {
       console.log(data);
       this.statusUpdate = data;
     });
   }

   updateStatusResData: any;
   statusUpdate: employeeDetails = new employeeDetails();
   /**
    * Updates emp status
    * @param f
    */
   updateEmpStatus(f: NgForm) {
     if (f.valid) {
       this.statusUpdate.id = this.toupdateStatusId;

       this.rmserv
         .updateResourceMgmtStatus(this.statusUpdate)
         .subscribe((data) => {
           this.updateStatusResData = data;
           this.loader = 0;
           if (this.updateStatusResData.status == 1) {
             this.alertify.errorMsg(this.updateStatusResData.message);
           } else {
             f.resetForm();
             closeModal();
             this.getAllResourceMgmts();
             this.alertify.updatedMsg('Record');
           }
         });
     }
   }

   updateEmpDet: employeeDetails = new employeeDetails();
   updateResData: any;
   /**
    * Updates employee
    * @param f
    * @returns
    */
   updateEmployee(f: NgForm) {
     if (f.valid) {
       if (this.updateEmpDet.contactNumber.length < 10) {
         this.alertify.errorMsg('Contact Number should be atleast 10 digits');
         return;
       }

       if (!this.validateEmail(this.updateEmpDet.email)) {
         this.alertify.errorMsg('Email is Invalid!');
         return;
       }

       this.loader = 1;
       this.updateEmpDet.customerId = this.changedCusId;
       this.updateEmpDet.buId =
         this.changedBuId == null || this.changedBuId == undefined
           ? this.updateEmpDet.buId
           : this.changedBuId;
       this.updateEmpDet.updatedBy = this.loggedInUserId;
       this.empDet.employeeId = this.empDet.employeeIdByHR;

       this.rmserv.updateResourceMgmt(this.updateEmpDet).subscribe((data) => {
         console.log(data);
         this.updateResData = data;
         this.loader = 0;
         if (this.updateResData.status == 1) {
           this.alertify.errorMsg(this.updateResData.message);
         } else {
           f.resetForm();
           this.getAllResourceMgmts();
           this.showListEmp();
           this.alertify.updatedMsg('Record');
           this.getAllWorkOrderNumbers();
           this.getAllEmployeeIds();
         }
       });
     }
   }

   deleteData: any;
   /**
    * Deletes resource mgmt by id
    * @param id
    * @param empId
    */
   deleteResourceMgmtById(id, empId) {
     this.loader = 1;
     console.log(id);
     this.rmserv.deleteResourceMgmtById(id).subscribe((data) => {
       this.loader = 0;
       this.deleteData = data;
       if (this.deleteData.status == 1) {
         this.alertify.errorMsg(this.deleteData.message);
       } else {
         console.log(data);
         this.alertify.deleteMsg(empId);
         this.getAllResourceMgmts();
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
     if (!(inputValue >= 33 && inputValue <= 57)) {
       event.preventDefault();
     }
   }

   todayDate: Date;
   loadDate() {
     this.todayDate = new Date();
     console.log(this.todayDate);
   }
 }
