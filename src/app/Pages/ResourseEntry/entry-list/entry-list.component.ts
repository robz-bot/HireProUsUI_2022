import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { resourceaccomplishment } from 'src/app/Models/resourceaccomplishment';
import { AchievementServicesService } from 'src/app/Services/AchievementServices/achievement-services.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css'],
})
export class EntryListComponent implements OnInit {
  loggedInAchievements: string;
  loggedInDate: string;
  loggedInReviewed: string;
  resourceAccomplishment: resourceaccomplishment = new resourceaccomplishment();
  SS_currentUserName: string;
  SS_loginType: string;
  SS_Designation: string;

  constructor(
    private aserv: AchievementServicesService,
    private _router: Router
  ) {}
  date: any;
  achievements: resourceaccomplishment[];
  reviewed: any;
  name: string;
  ngOnInit(): void {
    this.SS_currentUserName = sessionStorage.getItem('currentUserName');
    this.loggedInDate = sessionStorage.getItem('Date');
    this.loggedInAchievements = sessionStorage.getItem('Achievements');
    this.loggedInReviewed = sessionStorage.getItem('Reviewed');
    this.name = sessionStorage.getItem('currentUserName');
    this.SS_loginType = sessionStorage.getItem('loginType');
    this.SS_Designation = sessionStorage.getItem('designation');

    console.log(this.name);
    this.loadAchievements();
  }
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15, 20];
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
  achievementsLength: number = 0;
  loadAchievements() {
    this.aserv.getResourceAccomplishmentByName(this.name).subscribe((data) => {
      this.achievements = data;
      this.achievementsLength = this.achievements.length;
      console.log(this.achievements);
    });
  }

  updateEntry(id: string) {
    console.log(id);
    this._router.navigate(['/update-entry',id]);
  }
  yearSelection: string;

  onchangeYear() {
    console.log(this.yearSelection);
    if (this.yearSelection == 'undefined') {
      this.loadAchievements();
    } else {
      this.aserv
        .getResourceAccomplishmentByName(this.name)
        .subscribe((data) => {
          // this.achievements = data;
          this.achievements = data.filter(
            (x) => x.createdDateTime.split('-')[0] === this.yearSelection
          );
          this.achievementsLength = this.achievements.length;
          console.log(this.achievements);
        });
    }
    console.log(this.achievements);
    this.achievementsLength = this.achievements.length;
  }

  viewDet: resourceaccomplishment = new resourceaccomplishment();
  reviewedYear: string;
  getAchDet(item) {
    this.viewDet = item;
    this.reviewedYear = this.viewDet.updatedDateTime.split('-')[0];
  }
}
