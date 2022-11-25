/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
 import { emailConfig } from 'src/app/Models/emailConfig';
 import { BusinessUnit } from 'src/app/Models/BusinessUnit';
 import { Component, OnInit } from '@angular/core';
 import { NgForm } from '@angular/forms';
 import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
 import { LoginServicesService } from 'src/app/Services/LoginServices/login-services.service';
 import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
 declare function closeModal(): any;


 @Component({
   selector: 'app-email-configuration',
   templateUrl: './email-configuration.component.html',
   styleUrls: ['./email-configuration.component.css'],
 })
 export class EmailConfigurationComponent implements OnInit {
   constructor(
     private mserv: MasterserviceService,
     private alertify: AlertifyService,
     private lserv: LoginServicesService
   ) {}
   loggedInUserId: any;
   loader: number = 0;
   datares: any;
   ngOnInit(): void {
     this.loggedInUserId = sessionStorage.getItem('currentUserId');
     this.loadBu();
     this.loademailConfig();
     this.loadPurpose();
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
     //this.loademailConfig();
   }
   /**
    * Handles page size change
    * @param event
    */
   handlePageSizeChange(event): void {
     this.pageSize = event.target.value;
     this.page = 1;
     //this.loademailConfig();
   }
   email: emailConfig = new emailConfig();
   emailList: emailConfig[];
   bulist: BusinessUnit[];
   /**
    * Loads bu
    */
   loadBu() {
     this.mserv.getBUList().subscribe((data) => {
       this.bulist = data;
       this.bulist = this.bulist.sort((a, b) =>
         a.businessUnitName.localeCompare(b.businessUnitName)
       );
       console.log(this.bulist);
     });
   }
   /**
    * Purpose  of email configuration component
    */
   Purpose: any[] = [
     { purpose: 'CONFIGURATION_CREATE' },
     { purpose: 'CONFIGURATION_UPDATE' },
     // { purpose: 'USER_REGISTRATION' },
     // { purpose: 'PROFILE_UPDATE' },
     // { purpose: 'PASSWORD_CHANGE' },
     { purpose: 'JOB_REQUEST_CREATE' },
     { purpose: 'JOB_REQUEST_UPDATE' },
     { purpose: 'CANDIDATE_UPLOAD' },
     { purpose: 'CANDIDATE_UPDATED' },
     { purpose: 'RESUME_SHORTLIST' },
     { purpose: 'INTERNAL_ROUND1_SCHEDULED' },
     { purpose: 'INTERNAL_ROUND1_RESULT' },
     { purpose: 'INTERNAL_ROUND2_SCHEDULED' },
     { purpose: 'INTERNAL_ROUND2_RESULT' },
     { purpose: 'CUSTOMER_ROUND_SCHEDULED' },
     { purpose: 'CUSTOMER_ROUND_RESULT' },
     { purpose: 'HR_ROUND_SCHEDULED' },
     { purpose: 'HR_ROUND_RESULT' },
     { purpose: 'FOR_BU_APPROVAL' },
     { purpose: 'SELECTED' },
     { purpose: 'ON_BOARDED' },
     // { purpose: 'WEEKLY_REPORT' },
     // { purpose: 'MONTHLY_REPORT' },
     // { purpose: 'YEARLY_REPORT' },
   ];
   /**
    * Loads purpose
    */
   loadPurpose() {
     this.Purpose = this.Purpose.sort((a, b) =>
       a.purpose.localeCompare(b.purpose)
     );
   }
   /**
    * Loademails config
    */
   loademailConfig() {
     //this.clearemailConfigFiled();
     this.loader = 1;
     this.mserv.getAllEmailConfig().subscribe((data) => {
       this.emailList = data;
       this.loader = 0;
       console.log(this.emailList);
     });
   }
   /**
    * Validates email format
    * @param email
    * @returns true if email format
    */
   validateEmailFormat(email): boolean {
     const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g;
     return emailRegex.test(String(email.toLowerCase()));
   }


   Emails: any[];
   /**
    * Validates emails
    * @param emails
    * @returns true if emails
    */
   validateEmails(emails: string): boolean {
     var valid_email = true;


     if (emails == undefined || emails ==  "" || emails == null) {
       return valid_email;
     }
     this.Emails = emails.split(',');
     if (this.Emails.length > 0) {
       for (let e of this.Emails) {
         if (!this.validateEmailFormat(e)) {
           this.alertify.errorMsg(e + ' Incorrect email format');
           valid_email = false;
         }
         //this.valid_email = true;
       }
     }
     return valid_email;
   }
   /**
    * Adds newemail config
    * @param f
    */
   addNewemailConfig(f: NgForm) {
     console.log(f);
     if (f.form.valid) {
       if (this.validateEmails(this.email.to)) {
         if (this.validateEmails(this.email.cc)) {
           if (this.validateEmails(this.email.bcc)) {
             this.loader = 1;
             //console.log(this.loggedInUserId);
             console.log(this.email);
             this.email.createdBy = this.loggedInUserId;
             this.email.updatedBy = this.loggedInUserId;
             this.email.to = this.email.to.trim();
             this.email.cc =
               this.email.cc != null ? this.email.cc.trim() : this.email.cc;
             this.email.bcc =
               this.email.bcc != null ? this.email.bcc.trim() : this.email.bcc;


             this.mserv.addEmailConfig(this.email).subscribe((data) => {
               //console.log(data);


               this.datares = data;
               if (this.datares != null || this.datares != undefined) {
                 if (this.datares.status == 1) {
                   this.alertify.errorMsg(this.datares.message);
                 } else {
                   closeModal();
                   this.alertify.successMsg('Record');
                   this.loademailConfig();
                   f.resetForm();
                   this.clearemailConfigFiled();
                 }
                 this.loader = 0;
               }
             });
           }
         }
       }
     }
   }
   /**
    * Searchemails config
    * @param f
    * @returns
    */
   searchemailConfig(f: NgForm) {
     console.log(this.email.keyword);
     if (
       this.email.keyword == null ||
       this.email.keyword == '' ||
       this.email.keyword == undefined
     ) {
       this.alertify.errorMsg('Email Configuration is Required!');
       return;
     }
     if (f.form.valid) {
       this.loader = 1;
       this.mserv.searchEmailConf(this.email.keyword).subscribe((data) => {
         this.handlePageChange(1);
         this.emailList = data;
         this.loader = 0;
         console.log(data);
       });
     }
   }
   /**
    * Onchanges bu
    */
   onchangeBu() {
     this.email.buId = this.email.searchBuId;
     if (this.email.buId == undefined) {
       this.alertify.errorMsg('Business Unit is Required!');
       return;
     }
     //console.log();
     this.loader = 1;
     this.mserv.getAllEmailConfByBuId(this.email.buId).subscribe((data) => {
       this.handlePageChange(1);
       this.emailList = data;
       this.loader = 0;
       console.log(data);
     });
   }
   selectedElement: any;
   /**
    * Clearemails config filed
    */
   clearemailConfigFiled() {
     this.email.buId = undefined;
     this.email.cc = '';
     this.email.bcc = '';
     this.email.subject = '';
     this.email.to = '';
     this.email.purpose = undefined;
     this.email.keyword = '';
     this.loademailConfig();
   }
   apidata: any;
   updateid: string;
   /**
    * Gets id
    * @param id
    */
   getId(id) {
     this.loadBu();
     //console.log(id);
     this.loader = 1;
     this.updateid = id;
     this.mserv.getEmailConfById(id).subscribe((data) => {
       this.email = data;
       console.log(this.email);
       this.loader = 0;
     });
     //console.log(this.email);
   }
   /**
    * Updates email config
    * @param f
    */
   updateEmailConfig(f: NgForm) {
     console.log(f.form.status);
     console.log(this.updateid);
     if (f.form.valid) {
       console.log(f);

       if (this.validateEmails(this.email.to)) {
         if (this.validateEmails(this.email.cc)) {
           if (this.validateEmails(this.email.bcc)) {
             this.loader = 1;
             this.email.updatedBy = this.loggedInUserId;
             this.email.to = this.email.to.trim();
             this.email.cc =
               this.email.cc != null ? this.email.cc.trim() : this.email.cc;
             this.email.bcc =
               this.email.bcc != null ? this.email.bcc.trim() : this.email.bcc;
             if (this.email.id == this.updateid) {
               this.mserv.updateemailConfig(this.email).subscribe((data) => {
                 //console.log(data);
                 this.apidata = data;
                 this.loader = 0;
                 if (this.apidata.status == 1) {
                   this.alertify.errorMsg(this.apidata.message);
                 } else {
                   closeModal();
                   this.alertify.updatedMsg('Record');
                   this.loademailConfig();
                 }
               });
             }
           }
         }
       }
     }
   }
   /**
    * Deletes email conf by id
    * @param id
    * @param emailName
    */
   deleteEmailConfById(id, emailName) {
     this.loader = 1;
     //console.log(id);
     this.mserv.deleteEmailConfById(id).subscribe((data) => {
       //console.log(data);
       this.loader = 0;
       this.alertify.deleteMsg(emailName);
       this.loademailConfig();
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
    * Resets form
    * @param f
    */
   resetForm(f: NgForm) {
     f.resetForm({
       purpose: 'undefined',
       buId: 'undefined',
     });
   }
 }



