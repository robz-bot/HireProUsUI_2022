import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { resourceaccomplishment } from 'src/app/Models/resourceaccomplishment';
import { AchievementServicesService } from 'src/app/Services/AchievementServices/achievement-services.service';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';

@Component({
  selector: 'app-update-entry',
  templateUrl: './update-entry.component.html',
  styleUrls: ['./update-entry.component.css']
})
export class UpdateEntryComponent implements OnInit {
  id: string;
  updateResourceAccomplishment: resourceaccomplishment = new resourceaccomplishment();
  achievements: resourceaccomplishment;
  SS_currentUserName: string;
  SS_Role: string;
  SS_BUName: string;
  SS_BUId: string;
  SS_currentUserId: string;
  resourceDisplay: string;
  datares: any;
  SS_loginType: string;

  constructor(private aroute: ActivatedRoute,
    private _router: Router, private aserv: AchievementServicesService,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.SS_currentUserName = sessionStorage.getItem("currentUserName")
    this.SS_Role = sessionStorage.getItem("Role")
    this.SS_BUName = sessionStorage.getItem("BUName")
    this.SS_BUId = sessionStorage.getItem("BUId")
    this.SS_currentUserId = sessionStorage.getItem("currentUserId")
    this.SS_loginType = sessionStorage.getItem('loginType');

    this.resourceDisplay = this.SS_currentUserName + " | " + this.SS_Role + " | " + this.SS_BUName;

    this.id = this.aroute.snapshot.params['id'];

    this.aserv.getResourceAccomplishmentById(this.id.toString()).subscribe((data) => {
      this.updateResourceAccomplishment = data;
      console.log(this.achievements)
    });

  }

  updateAchievement(f: NgForm) {
    console.log(f);
    console.log(this.updateResourceAccomplishment.achievements);
    if (this.updateResourceAccomplishment.achievements == null || this.updateResourceAccomplishment.achievements == ""
      || this.updateResourceAccomplishment.achievements == 'undefined' || this.updateResourceAccomplishment.achievements == '\n') {
      this.alertify.errorMsg("Achievements is required!")
      return
    }
    if (f.form.valid) {
      this.updateResourceAccomplishment.resourceName = this.SS_currentUserName;
      this.updateResourceAccomplishment.achievements = f.form.value.achievements;
      this.updateResourceAccomplishment.buId = this.SS_BUId;
      this.updateResourceAccomplishment.buName = this.SS_BUName;
      this.updateResourceAccomplishment.createdBy = this.SS_currentUserId;
      this.updateResourceAccomplishment.updatedBy = this.SS_currentUserId;
      this.updateResourceAccomplishment.createdByname = this.SS_currentUserName;
      this.updateResourceAccomplishment.updatedByName = this.SS_currentUserName;
    }
    this.aserv.updateAchievement(this.updateResourceAccomplishment).subscribe((data) => {
      this.datares = data;
      console.log(this.datares)
      if (this.datares.resultStatus == 1) {
        this.alertify.errorMsg(this.datares.message);
      } else {
        this.alertify.updatedMsg("Entry");
        this._router.navigateByUrl('entry-list');
      }
    });
  }
}
