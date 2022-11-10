/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BusinessUnit } from 'src/app/Models/BusinessUnit';
import { interviewSchedule } from 'src/app/Models/InterviewSchedule';
import { searchInterviewSchedule } from 'src/app/Models/searchInterviewSchedule';
import { timeZone } from 'src/app/Models/timeZone';
import { UserReg } from 'src/app/Models/UserReg';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { GlobalMenuMappingServicesService } from 'src/app/Services/GlobalMenuMappingServices/global-menu-mapping-services.service';
import { ImageServicesService } from 'src/app/Services/ImageServices/image-services.service';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import { RecruitmentServiceService } from 'src/app/Services/RecruitmentServices/recruitment-service.service';
import { UserRegServicesService } from 'src/app/Services/UserRegServices/user-reg-services.service';

declare function closeModal(): any;
declare function closeFilter(): any;

@Component({
  selector: 'app-my-interviews-list',
  templateUrl: './my-interviews-list.component.html',
  styleUrls: ['./my-interviews-list.component.css'],
})
export class MyInterviewsListComponent implements OnInit {
  subMenuName: string;

  constructor(
    private _router: Router,
    private rserv: RecruitmentServiceService,
    private alertify: AlertifyService,
    private iserv: ImageServicesService,
    private _gmenu: GlobalMenuMappingServicesService,
    private mserv: MasterserviceService,
    private userv: UserRegServicesService
  ) {}
  loggedInUserName: string;
  loggedInUserRole: string;
  loggedInUserId: any;
  ngOnInit(): void {
    this.loggedInUserId = sessionStorage.getItem('currentUserId');
    this.loggedInUserName = sessionStorage.getItem('currentUserName');
    console.log(this.loggedInUserName);
    this.loggedInUserRole = sessionStorage.getItem('Role');
    this.enableNewSchedule = 0;
    this.enableScheduleList = 1;
    this.subMenuName = sessionStorage.getItem('subMenuNames');

    this.loadDate();
    this.getTimeZone();
    this.loadBu();
    this.loadRecruiters();
    this.getInterviewScheduledList();
  }
  checkInterviewer(interviewerId: string): boolean {
    var result = false;
    if (interviewerId == this.loggedInUserId) {
      result = true;
      return result;
    }
    return result;
  }

  todayDate: Date;
  loadDate() {
    this.todayDate = new Date();
    console.log(this.todayDate);
  }
  ///////////////////
  enableDeleteIcon(mainMenu: string): boolean {
    return this._gmenu.mainMenuAccess2(this.subMenuName, mainMenu);
  }
  enableSubMenu(mainMenu: string): boolean {
    return this._gmenu.subMenuAccess2(this.subMenuName, mainMenu);
  }
  ///////////////////////

  findDetails(data) {
    return this.interviewList.filter((x) => x.id === data.id);
  }

  gotoInternalRound1() {
    this._router.navigateByUrl('hirepros/internal-round1');
  }
  gotoInternalRound2() {
    this._router.navigateByUrl('hirepros/internal-round2');
  }
  gotoCusRound() {
    this._router.navigateByUrl('hirepros/customer-round');
  }
  gotoHrRound() {
    this._router.navigateByUrl('hirepros/hr-round');
  }

  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15, 20];
  index = 0;
  loader = 0;

  handlePageChange(event): void {
    console.log(event);
    this.page = event;
    //this.index = (event - 1) * this.pageSize + 1;
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }

  timeZoneList: timeZone[];
  getTimeZone() {
    this.rserv.getTimeZoneList().subscribe((data) => {
      this.timeZoneList = data;
      this.timeZoneList.sort((a, b) => a.name.localeCompare(b.name));
      console.log(data);
    });
  }

  buList: BusinessUnit[];
  loadBu() {
    this.mserv.getBUList().subscribe((data) => {
      this.buList = data;
      this.buList = this.buList.sort((a, b) =>
        a.businessUnitName.localeCompare(b.businessUnitName)
      );
      console.log(data);
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
  resetBtn: boolean = false;
  searchDto: searchInterviewSchedule = new searchInterviewSchedule();
  searchInterviewScheduledList() {
    if (this.searchDto.jrNumber == undefined) {
      this.searchDto.jrNumber = '';
    }
    if (this.searchDto.interviewerIdList == undefined) {
      this.searchDto.interviewerIdList = null;
    }
    if (this.searchDto.candidateName == undefined) {
      this.searchDto.candidateName = '';
    }

    if (
      this.searchDto.jrNumber == '' ||
      this.searchDto.jrNumber == null ||
      this.searchDto.jrNumber == undefined
    ) {
      this.alertify.errorMsg('Job Request Number is Required.');
      return;
    } else {
      this.resetBtn = true;
      this.rserv
        .searchInterviewScheduledList('1', this.searchDto)
        .subscribe((data) => {
          this.interviewList = data;
          console.log(data);
        });
    }
  }

  searchForSchedule() {
    if (this.searchDto.jrNumber == undefined) {
      this.searchDto.jrNumber = '';
    }
    if (this.searchDto.interviewerIdList == undefined) {
      this.searchDto.interviewerIdList = null;
    }
    if (this.searchDto.candidateName == undefined) {
      this.searchDto.candidateName = '';
    }

    if (
      this.searchDto.interviewerIdList == undefined &&
      this.searchDto.candidateName == ''
    ) {
      this.alertify.errorMsg('Search any Filter');
      return;
    } else {
      this.resetBtn = true;
      this.rserv.searchForSchedule('1', this.searchDto).subscribe((data) => {
        this.ShortlistedCandidatesList = data;
        console.log(data);
        closeFilter();
      });
    }
  }

  searchInterviewScheduledListAdvanced() {
    if (this.searchDto.jrNumber == undefined) {
      this.searchDto.jrNumber = '';
    }
    if (this.searchDto.interviewerIdList == undefined) {
      this.searchDto.interviewerIdList = null;
    }
    if (this.searchDto.candidateName == undefined) {
      this.searchDto.candidateName = '';
    }

    if (
      this.searchDto.interviewerIdList == undefined &&
      this.searchDto.candidateName == '' &&
      this.searchDto.jrNumber == '' &&
      this.searchDto.buId == undefined
    ) {
      this.alertify.errorMsg('Search any Filter');
      return;
    } else {
      if (this.searchDto.interviewerIdList != null) {
        this.searchDto.interviewerIdList = [this.searchDto.interviewerIdList];
      }
      this.resetBtn = true;
      this.rserv
        .searchMyInterviews(this.loggedInUserId, this.searchDto)
        .subscribe((data) => {
          this.interviewList = data;
          console.log(data);
          closeFilter();
        });
    }
  }

  isInterviewerDisabled: boolean = true;
  getInterviewersByBuIdOnly(id: string) {
    console.log(id);
    this.isInterviewerDisabled = false;
    this.rserv.getInterviewersByBuId(id).subscribe((data) => {
      console.log(data);
      this.interviewers = data;
      this.interviewers = this.interviewers.sort((a, b) =>
        a.fullName.localeCompare(b.fullName)
      );
    });
  }

  reset() {
    this.searchDto.jrNumber = '';
    this.searchDto.candidateName = '';
    this.searchDto.buId = undefined;
    this.isInterviewerDisabled = true;
    this.searchDto.interviewerIdList = undefined;
    this.resetBtn = false;
    this.getInterviewScheduledList();
    this.getForSchedule();
  }

  clearScheduleFields() {
    this.interviewSchedule.scheduleDateTime = '';
    this.interviewSchedule.interviewerId = undefined;
    this.interviewSchedule.mode = undefined;
    this.interviewSchedule.startsFrom = '';
    this.interviewSchedule.scheduleRemarks = '';
    this.interviewSchedule.venue = '';
    this.interviewSchedule.timeZone = undefined;
    this.interviewSchedule.duration = undefined;
  }

  enableNewSchedule: number;
  enableScheduleList: number;
  showNewSchedule() {
    this.getForSchedule();
    this.enableNewSchedule = 1;
    this.enableScheduleList = 0;
  }

  showScheduleList() {
    this.enableNewSchedule = 0;
    this.enableScheduleList = 1;
  }

  resumeRes: any;
  getResume(id: string) {
    console.log(id);
    this.iserv.getResume('resume_' + id).subscribe((data) => {
      console.log(data);
      this.resumeRes = data;
      if (this.resumeRes.resume != null || this.resumeRes.resume != '') {
        const pdfWindow = window.open('');

        pdfWindow.document.write(
          '<title>View Resume</title><html><body><iframe' +
            " style='width: 100%;height: 100%' src='" +
            this.resumeRes.resume +
            "'></iframe></body></html>"
        );
      } else {
        this.alertify.errorMsg('Resume Not Uploaded');
      }
    });
  }

  scheduledId: string;
  currentResRound: string;
  getScheduledId(id: string, currentRound: string) {
    this.currentResRound = currentRound;
    console.log(id);
    this.scheduledId = id;
  }

  updateid: string;
  updateScheduleRecStatus: string;
  getId(
    id,
    buid: string,
    candidateId: string,
    jrNumber: string,
    recStatus: string
  ) {
    this.loader = 1;
    console.log(id);
    this.updateScheduleRecStatus = recStatus;
    this.getInterviewersByBuId(buid, candidateId, jrNumber);
    this.updateid = id;
    this.rserv.getInterviewSchedule(id).subscribe((data) => {
      this.interviewSchedule = data;
      //2021-09-07T08:22:00
      this.interviewSchedule.startsFrom =
        this.interviewSchedule.scheduleDateTime.substring(11, 16);
      this.interviewSchedule.scheduleDateTime =
        this.interviewSchedule.scheduleDateTime.substring(0, 10);

      this.loader = 0;
      //console.log(data);
      //console.log(this.interviewSchedule.startsFrom);
      //console.log(this.interviewSchedule.scheduleDateTime);
    });
  }

  interviewSchedule: interviewSchedule = new interviewSchedule();
  interviewScheduleList: interviewSchedule[];
  addInterviewStatus(f: NgForm) {
    console.log(f);
    if (f.form.valid) {
      if (this.currentResRound == '1') {
        if (this.interviewSchedule.status == '1') {
          this.interviewSchedule.recStatus = '05';
        } else if (this.interviewSchedule.status == '2') {
          this.interviewSchedule.recStatus = '06';
        } else if (this.interviewSchedule.status == '3') {
          this.interviewSchedule.recStatus = '07';
        }
      } else if (this.currentResRound == '2') {
        if (this.interviewSchedule.status == '1') {
          this.interviewSchedule.recStatus = '09';
        } else if (this.interviewSchedule.status == '2') {
          this.interviewSchedule.recStatus = '10';
        } else if (this.interviewSchedule.status == '3') {
          this.interviewSchedule.recStatus = '11';
        }
      } else if (this.currentResRound == '3') {
        if (this.interviewSchedule.status == '1') {
          this.interviewSchedule.recStatus = '13';
        } else if (this.interviewSchedule.status == '2') {
          this.interviewSchedule.recStatus = '14';
        } else if (this.interviewSchedule.status == '3') {
          this.interviewSchedule.recStatus = '15';
        }
      } else if (this.currentResRound == '4') {
        if (this.interviewSchedule.status == '1') {
          this.interviewSchedule.recStatus = '17';
        } else if (this.interviewSchedule.status == '2') {
          this.interviewSchedule.recStatus = '18';
        } else if (this.interviewSchedule.status == '3') {
          this.interviewSchedule.recStatus = '19';
        }
      }

      this.interviewSchedule.id = this.scheduledId;
      this.interviewSchedule.updatedBy = this.loggedInUserId;
      this.interviewSchedule.createdBy = this.loggedInUserId;
      this.interviewSchedule.round = this.currentResRound;
      console.log(this.interviewSchedule);
      this.loader = 1;
      this.rserv.updateResult(this.interviewSchedule).subscribe((data) => {
        console.log(data);
        this.loader = 0;
        f.resetForm({
          status: 'undefined',
        });
        closeModal();
        this.getInterviewScheduledList();
        this.getForSchedule();
      });
    }
  }

  interviewers: UserReg[];
  cId: string;
  jrNum: string;
  getInterviewersByBuId(id: string, candidateId: string, jrNumber: string) {
    console.log(id);

    this.cId = candidateId;
    this.jrNum = jrNumber;
    this.rserv.getInterviewersByBuId(id).subscribe((data) => {
      console.log(data);
      this.interviewers = data;
      this.interviewers = this.interviewers.sort((a, b) =>
        a.fullName.localeCompare(b.fullName)
      );
    });
  }

  datares: any;
  addInterviewSchedule(f: NgForm) {
    console.log(f);
    if (f.form.valid) {
      this.loader = 1;
      this.interviewSchedule.createdBy = this.loggedInUserId;
      this.interviewSchedule.updatedBy = this.loggedInUserId;
      this.interviewSchedule.candidateId = this.cId;
      this.interviewSchedule.round = '1';
      this.interviewSchedule.jrNumber = this.jrNum;
      this.interviewSchedule.recStatus = '04';
      //2021-08-31T14:13:19.149
      this.interviewSchedule.scheduleDateTime =
        this.interviewSchedule.scheduleDateTime +
        'T' +
        this.interviewSchedule.startsFrom +
        ':00.000';

      console.log(this.interviewSchedule);
      this.rserv
        .addInterviewSchedule(this.interviewSchedule)
        .subscribe((data) => {
          console.log(data);
          this.datares = data;
          this.loader = 0;
          if (this.datares.status == 1) {
            this.alertify.errorMsg(this.datares.message);
          } else {
            closeModal();
            f.resetForm();
            this.alertify.successMsg('Interview Schedule');
            this.showScheduleList();
            this.getInterviewScheduledList();
            this.getForSchedule();
          }
        });
    }
  }

  updateInterviewSchedule(f: NgForm) {
    console.log(f);
    if (f.form.valid) {
      this.loader = 1;
      this.interviewSchedule.createdBy = this.loggedInUserId;
      this.interviewSchedule.updatedBy = this.loggedInUserId;
      this.interviewSchedule.candidateId = this.cId;
      // this.interviewSchedule.round = '1';
      this.interviewSchedule.jrNumber = this.jrNum;
      // this.interviewSchedule.recStatus = '04';
      this.interviewSchedule.id = this.updateid;
      //2021-08-31T14:13:19.149
      this.interviewSchedule.scheduleDateTime =
        this.interviewSchedule.scheduleDateTime +
        'T' +
        this.interviewSchedule.startsFrom +
        ':00.000';

      console.log(this.interviewSchedule);
      this.rserv
        .updateInterviewSchedule(this.interviewSchedule)
        .subscribe((data) => {
          console.log(data);
          this.datares = data;
          this.loader = 0;
          if (this.datares.status == 1) {
            this.alertify.errorMsg(this.datares.message);
          } else {
            closeModal();
            this.alertify.successMsg('Interview Schedule');
            this.getInterviewScheduledList();
            this.getForSchedule();
          }
        });
    }
  }

  ShortlistedCandidatesList: any;
  getForSchedule() {
    this.loader = 1;
    //console.log(this.ShortlistedCandidates);
    this.rserv.getForSchedule('1').subscribe((data) => {
      console.log(data);
      this.loader = 0;
      this.ShortlistedCandidatesList = data;
    });
  }

  interviewList: any;
  getInterviewScheduledList() {
    this.loader = 1;
    //console.log(this.ShortlistedCandidates);
    this.rserv.getMyInterviews(this.loggedInUserId).subscribe((data) => {
      console.log(data);
      this.loader = 0;
      this.interviewList = data;
    });
  }

  deleteInterviewSchedule(id: string) {
    this.loader = 1;
    this.rserv.deleteInterviewScheduleById(id).subscribe((data) => {
      console.log(data);
      this.loader = 0;
      this.alertify.deleteMsg('Interview Schedule');
      this.getInterviewScheduledList();
      this.getForSchedule();
    });
  }

  gotoJobReqView(id) {
    this._router.navigate(['hirepros/view-job-request', id]);
  }

  gotoCandidateView(id) {
    this._router.navigate(['hirepros/view-candidate', id]);
  }

  gotoViewHistory(jrNum: string, candidateId: string) {
    this._router.navigate(['hirepros/candidate-history', jrNum, candidateId]);
  }

  resetForm(f: NgForm) {
    f.resetForm();
  }

  noManualType(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
}
