import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { resourceaccomplishment } from 'src/app/Models/resourceaccomplishment';
import { AchievementServicesService } from 'src/app/Services/AchievementServices/achievement-services.service';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import * as FileSaver from 'file-saver';
import { DatePipe } from '@angular/common';
import { BusinessUnit } from 'src/app/Models/BusinessUnit';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import { Session } from 'protractor';
declare function closeModal(): any;
@Component({
  selector: 'app-reviewlist',
  templateUrl: './reviewlist.component.html',
  styleUrls: ['./reviewlist.component.css'],
})
export class ReviewlistComponent implements OnInit {
  SS_currentUserName: string;
  SS_Role: string;
  SS_BUName: string;
  resourceDisplay: string;
  itemToUpdate: resourceaccomplishment;
  SS_UserName : string;

  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15, 20];
  SS_currentUserId: string;
  SS_BUId: string;
  accomplishmentRating: resourceaccomplishment[];
  loader: number = 0;
  SS_Designation: string;
  SS_refId: string;
  SS_loginType: string;
  constructor(
    private aserv: AchievementServicesService,
    private _router: Router,
    private alertify: AlertifyService,
    private mserv: MasterserviceService
  ) {}

  ngOnInit(): void {
    this.SS_currentUserName = sessionStorage.getItem('currentUserName');
    this.SS_Role = sessionStorage.getItem('Role');
    this.SS_BUName = sessionStorage.getItem('BUName');
    this.SS_BUId = sessionStorage.getItem('BUId');
    this.SS_loginType = sessionStorage.getItem('loginType');
    this.SS_currentUserId = sessionStorage.getItem('currentUserId');
    this.SS_Designation = sessionStorage.getItem('designation');
    this.SS_refId = sessionStorage.getItem('refId');
    this.SS_UserName = sessionStorage.getItem('userName');

    this.loadAchievements();
    this.loadbu();
  }
  achievements: any[]=[];
  updateRating: resourceaccomplishment = new resourceaccomplishment();
  reviewLength: number = 0;
  roleIds: string[]=['26','29','31','33'];
  // roleIds: string[]=['3','4','6','7'];
  loadAchievements() {
    this.searchRating.buId = undefined;
    this.searchRating.status = undefined;


    // if(this.SS_UserName == "nagarajan@promantus.com"){
      if(this.SS_UserName == "Elango@promantusinc.com"){
        this.aserv.getResourceAccomplishmentByRoleIds(this.roleIds).subscribe((data)=>{
          this.achievements = data;
          this.reviewLength = this.achievements.length;
        });
      }
    else{
      this.aserv.getResourceAccomplishmentByBuId(this.SS_BUId).subscribe((data) => {
        this.achievements = data;
        this.reviewLength = this.achievements.length;
        console.log(this.achievements);
      });
    }

  }
  yearSelection: string;
  onchangeYear() {
    console.log(this.yearSelection);
    if (this.yearSelection == 'undefined') {
      this.loadAchievements();
    } else {
      this.aserv
        .getResourceAccomplishmentByBuIdYear(this.SS_BUId,this.yearSelection)
        .subscribe((data) => {

          this.achievements=data
          console.log(this.achievements);
          // this.reviewLength = this.achievements.length;
        });
    }
    console.log(this.achievements);
    this.reviewLength = this.achievements.length;
  }

  /**
   * Handles page change
   * @param event
   */
  handlePageChange(event): void {
    this.page = event;
  }
  /**
   * Handles page size change
   * @param event
   */
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }

  getAch(item) {
    this.updateRating = item;
    console.log(this.updateRating);
    this.resourceDisplay =
      this.updateRating.resourceName +
      ' | ' +
      this.updateRating.buName +
      ' | ' +
      this.updateRating.designation;
  }
  downloadAccomplishmentReport() {
    this.loader = 1;
    console.log(this.accomplishmentRating);
    this.aserv
      .downloadAccomplishmentReport(this.achievements)
      .subscribe((data) => {
        console.log(data);
        this.loader = 0;
        this.saveAsBlob(data);
      });
  }
  saveAsBlob(data: any) {
    FileSaver.saveAs(
      new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }),
      'Accomplishment_Report_' + this.getCurrentDateTime() + '.xlsx'
    );
  }

  getCurrentDateTime(): string {
    const pipe = new DatePipe('en-US');
    return pipe.transform(new Date(), 'yyyyMMddhhmmss');
  }
  updatedatares: any;
  updateRatings(f: NgForm) {
    console.log(f);
    if (
      this.updateRating.comments == null ||
      this.updateRating.comments == ''
    ) {
      this.alertify.errorMsg('Comments is required!');
      return;
    }
    if (
      this.updateRating.rating == null ||
      this.updateRating.rating == 'Yet To Review'
    ) {
      this.alertify.errorMsg('Rating is required!');
      return;
    }
    if (f.form.valid) {
      this.updateRating.ratingbyId = this.SS_currentUserId;
      this.updateRating.ratingByname = this.SS_currentUserName;
      this.updateRating.roleId = this.updateRating.roleId;
    }
    console.log('update Rating:' + this.updateRating);
    this.aserv
      .updateAccomplishmentRating(this.updateRating)
      .subscribe((data) => {
        this.updatedatares = data;

        if (this.updatedatares.status == 1) {
          this.alertify.errorMsg(this.updatedatares.message);
        } else {
          this.alertify.updatedMsg('Rating');
          closeModal();
          //this._router.navigateByUrl('entry-list');
        }
      });
  }

  //Load Dropdown Values
  bulist: BusinessUnit[];
  loadbu() {
    this.mserv.getBUList().subscribe((data) => {
      this.bulist = data;
      this.bulist = this.bulist.sort((a, b) =>
        a.businessUnitName.localeCompare(b.businessUnitName)
      );
      console.log(this.bulist);
    });
  }
  searchRating: resourceaccomplishment = new resourceaccomplishment();
  search() {
    this.searchRating.buId=this.SS_BUId;
    //console.log(this.searchRating.buId + ' ' + this.searchRating.year);
    if (
      this.searchRating.status == null ||
      this.searchRating.status == '' ||
      this.searchRating.status == undefined
    ) {
      this.alertify.errorMsg('Select any one creteria!');
      return;
    }
    console.log(this.searchRating);
    // this.aserv.searchAccomplishments(this.searchRating).subscribe((data) => {
    //   this.achievements = data;
    //   this.reviewLength = this.achievements.length;
    // });
  }
}
