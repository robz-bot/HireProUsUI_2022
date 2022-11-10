import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { resourceaccomplishment } from 'src/app/Models/resourceaccomplishment';
import { AchievementServicesService } from 'src/app/Services/AchievementServices/achievement-services.service';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css'],
})
export class AddEntryComponent implements OnInit {
  resourceAccomplishment: resourceaccomplishment = new resourceaccomplishment();
  datares: any;
  SS_RoleName: string;
  SS_RoleId: string;
  SS_Designation: string;
  SS_loginType: string;
  SS_refId: string;

  constructor(
    private _router: Router,
    private aserv: AchievementServicesService,
    private alertify: AlertifyService
  ) {}

  SS_currentUserName: string;
  SS_Role: string;
  SS_BUName: string;
  SS_BUId: any;
  SS_currentUserId: any;

  resourceDisplay: string;
  ngOnInit(): void {
    this.SS_currentUserName = sessionStorage.getItem('currentUserName');
    this.SS_Role = sessionStorage.getItem('Role');
    this.SS_BUName = sessionStorage.getItem('BUName');
    this.SS_BUId = sessionStorage.getItem('BUId');
    this.SS_currentUserId = sessionStorage.getItem('currentUserId');
    this.SS_RoleId = sessionStorage.getItem('RoleId');
    this.SS_Designation = sessionStorage.getItem('designation');
    this.SS_loginType = sessionStorage.getItem('loginType');
    this.SS_refId = sessionStorage.getItem('refId');

    this.resourceDisplay =
      this.SS_currentUserName + ' | ' + this.SS_Role + ' | ' + this.SS_BUName;
    sessionStorage.getItem('BuId');
    this.checkEntryValidity();
  }
  year: number = new Date().getFullYear();
  checkRes: any;
  entryFormDisabled: number = 1;
  checkEntryValidity() {
    this.aserv
      .checkEntryValidity(this.SS_currentUserName, this.year)
      .subscribe((data) => {
        console.log(data);
        this.checkRes = data;
        if (this.checkRes.resultStatus == 1) {
          //1 - ERR
          this.entryFormDisabled = 0;
        } else {
          //0 - New
          this.entryFormDisabled = 1;
        }
      });
  }

  addAchievements(f: NgForm) {
    if (
      this.resourceAccomplishment.achievements == null ||
      this.resourceAccomplishment.achievements == '' ||
      this.resourceAccomplishment.achievements == 'undefined' ||
      this.resourceAccomplishment.achievements == '\n'
    ) {
      this.alertify.errorMsg('Achievements is required!');
      return;
    }
    console.log(f);
    if (f.form.valid) {
      this.resourceAccomplishment.resourceName = this.SS_currentUserName;
      this.resourceAccomplishment.buId = this.SS_BUId;
      this.resourceAccomplishment.buName = this.SS_BUName;
      this.resourceAccomplishment.createdBy = this.SS_currentUserId;
      this.resourceAccomplishment.updatedBy = this.SS_currentUserId;
      this.resourceAccomplishment.createdByname = this.SS_currentUserName;
      this.resourceAccomplishment.updatedByName = this.SS_currentUserName;
      this.resourceAccomplishment.roleId = this.SS_RoleId;
      this.resourceAccomplishment.roleName = this.SS_RoleName;
      this.resourceAccomplishment.refId=this.SS_refId;
    }
    this.aserv
      .addAchievements(this.resourceAccomplishment)
      .subscribe((data) => {
        //console.log(data);
        this.datares = data;

        if (this.datares.status == 1) {
          // this.alertify.errorMsg(this.datares.message);
        } else {
          this.alertify.successMsg('New Entry');
          this._router.navigateByUrl('/entry-list');
          this.checkEntryValidity();
        }
      });
  }
}
