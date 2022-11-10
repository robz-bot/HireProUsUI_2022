import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'ratingdashboard',
  templateUrl: './ratingdashboard.component.html',
  styleUrls: ['./ratingdashboard.component.css']

})

export class RatingdashboardComponent implements OnInit {
  private _router: any;
  resourceAccomplishment: any;
  SS_BUId: any;
  datares: any;
  alertify: any;
  aserv: any;
  constructor() { }
  SS_currentUserName: string
  SS_Role: string
  SS_BUName: string
  resourceDisplay: string
  ngOnInit(): void {
    this.SS_currentUserName = sessionStorage.getItem("currentUserName")
    this.SS_Role = sessionStorage.getItem("Role")
    this.SS_BUName = sessionStorage.getItem("BUName")
    this.resourceDisplay = this.SS_currentUserName + " | " + this.SS_Role + " | " + this.SS_BUName;

  }
  gotoEntrylist() {
    console.log("goto");
    this._router.navigateByUrl('ratingdashboard');

  }
  addAchievements(f: NgForm) {
    console.log(f);
    if (f.form.valid) {
      this.resourceAccomplishment.resourceName = this.SS_currentUserName;
      this.resourceAccomplishment.buId = this.SS_BUId;
      this.resourceAccomplishment.buName = this.SS_BUName;
      this.resourceAccomplishment.createdBy = this.SS_currentUserName;
      this.resourceAccomplishment.updatedBy = this.SS_currentUserName;
      this.resourceAccomplishment.createdByname = this.SS_currentUserName;
      this.resourceAccomplishment.updatedByName = this.SS_currentUserName;
    }
    this.aserv.addAchievements(this.resourceAccomplishment).subscribe((data: any) => {
      //console.log(data);
      this.datares = data;

      if (this.datares.status == 1) {
        // this.alertify.errorMsg(this.datares.message);
      } else {
        this.alertify.successMsg(
          "New Entry Added Successfully"
        );
        // this._router.navigateByUrl('hirepros/job-request');
        //this.loadJobReq();
        //this.clearJobReqField();
      }
    });
  }
}
