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
import { forAllSchedule } from 'src/app/Models/ForAllScheduleDto';
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
  selector: 'app-schedule-interview',
  templateUrl: './schedule-interview.component.html',
  styleUrls: ['./schedule-interview.component.css'],
})
export class ScheduleInterviewComponent implements OnInit {
  loggedInUserRole: string;
  subMenuName: string;
  loggedInUserId: string;

  constructor(
    private _router: Router,
    private rserv: RecruitmentServiceService,
    private alertify: AlertifyService,
    private iserv: ImageServicesService,
    private _gmenu: GlobalMenuMappingServicesService,
    private mserv: MasterserviceService,
    private userv: UserRegServicesService
  ) {}

  ngOnInit(): void {
    this.loggedInUserRole = sessionStorage.getItem('Role');
    this.subMenuName = sessionStorage.getItem('subMenuNames');
    this.loggedInUserId = sessionStorage.getItem('currentUserId');

    this.getAllForSchedule();
    this.loadDate();
    this.getTimeZone();
    this.getRecruitersList();
  }
  todayDate: Date;
  loadDate() {
    this.todayDate = new Date();
    console.log(this.todayDate);
  }

  timeZoneList: timeZone[];
  getTimeZone() {
    this.rserv.getTimeZoneList().subscribe((data) => {
      this.timeZoneList = data;
      this.timeZoneList.sort((a, b) => a.name.localeCompare(b.name));
      console.log(data);
    });
  }

  ///////////////////
  enableDeleteIcon(mainMenu: string): boolean {
    return this._gmenu.mainMenuAccess2(this.subMenuName, mainMenu);
  }

  enableSubMenu(mainMenu: string): boolean {
    return this._gmenu.subMenuAccess2(this.subMenuName, mainMenu);
  }
  ///////////////////////

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

  allScheduleList: forAllSchedule[];
  allScheduleListCount: number;
  getAllForSchedule() {
    this.rserv.getAllForSchedule().subscribe((data) => {
      console.log(data);
      this.allScheduleList = data;
      this.allScheduleListCount = this.allScheduleList.length;
    });
  }

  resetBtn: boolean = false;
  scheduleDto: searchInterviewSchedule = new searchInterviewSchedule();
  getAllSearchForSchedule() {
    if (this.scheduleDto.jrNumber == undefined) {
      this.scheduleDto.jrNumber = '';
    }
    if (this.scheduleDto.interviewerIdList == undefined) {
      this.scheduleDto.interviewerIdList = null;
    }
    if (this.scheduleDto.candidateName == undefined) {
      this.scheduleDto.candidateName = '';
    }

    console.log(this.scheduleDto);
    if (
      this.scheduleDto.candidateName == '' &&
      this.scheduleDto.interviewerIdList == null &&
      this.scheduleDto.round == undefined &&
      this.scheduleDto.jrNumber == ''
    ) {
      this.alertify.errorMsg('Search any Filter...');
      return;
    }
    this.rserv.getAllSearchForSchedule(this.scheduleDto).subscribe((data) => {
      console.log(data);
      this.allScheduleList = data;
      this.allScheduleListCount = this.allScheduleList.length;
      this.resetBtn = true;
      closeFilter();
    });
  }

  reset() {
    this.resetBtn = false;
    this.scheduleDto.candidateName = '';
    this.scheduleDto.interviewerIdList = undefined;
    this.scheduleDto.round = undefined;
    this.scheduleDto.jrNumber = '';
    this.getAllForSchedule();
  }

  Recinterviewers: UserReg[];
  getRecruitersList() {
    this.userv.getRecruitersList().subscribe((data) => {
      console.log(data);
      this.Recinterviewers = data;
      this.Recinterviewers = this.Recinterviewers.sort((a, b) =>
        a.fullName.localeCompare(b.fullName)
      );
    });
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
  getScheduledId(id: string) {
    console.log(id);
    this.scheduledId = id;
  }

  interviewers: UserReg[];
  cId: string;
  jrNum: string;
  getRound: string;
  getRecStatus: string;
  toScheduleHR: boolean = false;
  toScheduleOther: boolean = false;
  getInterviewersByBuId(
    id: string,
    candidateId: string,
    jrNumber: string,
    round: string,
    recStatus: string
  ) {
    console.log(id);
    this.cId = candidateId;
    this.jrNum = jrNumber;
    this.getRound = round + 1;
    this.getRecStatus = recStatus;
    if (this.getRecStatus == '13') {
      this.toScheduleHR = true;
      this.toScheduleOther = false;
    } else {
      this.toScheduleHR = false;
      this.toScheduleOther = true;
    }

    this.rserv.getInterviewersByBuId(id).subscribe((data) => {
      console.log(data);
      this.interviewers = data;
      this.interviewers = this.interviewers.sort((a, b) =>
        a.fullName.localeCompare(b.fullName)
      );
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
  interviewSchedule: interviewSchedule = new interviewSchedule();

  datares: any;
  addInterviewSchedule(f: NgForm) {
    if (f.form.valid) {
      this.loader = 1;
      this.interviewSchedule.createdBy = this.loggedInUserId;
      this.interviewSchedule.updatedBy = this.loggedInUserId;
      this.interviewSchedule.candidateId = this.cId;
      this.interviewSchedule.jrNumber = this.jrNum;
      if (this.getRecStatus == '01') {
        this.interviewSchedule.recStatus = '04';
        this.interviewSchedule.round = '1';
      } else if (this.getRecStatus == '05') {
        this.interviewSchedule.recStatus = '08';
        this.interviewSchedule.round = '2';
      } else if (this.getRecStatus == '09') {
        this.interviewSchedule.recStatus = '12';
        this.interviewSchedule.round = '3';
      } else if (this.getRecStatus == '13') {
        this.interviewSchedule.recStatus = '16';
        this.interviewSchedule.round = '4';
      }

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
            this.interviewSchedule.scheduleDateTime =
              this.interviewSchedule.scheduleDateTime.split('T')[0];
            this.alertify.errorMsg(this.datares.message);
          } else {
            f.resetForm({
              mode: 'undefined',
              duration: 'undefined',
              timeZone: 'undefined',
              interviewerId: 'undefined',
            });
            closeModal();
            this.alertify.successMsg('Interview Schedule');
            if (this.interviewSchedule.recStatus == '04') {
              this._router.navigateByUrl('/hirepros/internal-round1');
            } else if (this.interviewSchedule.recStatus == '08') {
              this._router.navigateByUrl('/hirepros/internal-round2');
            } else if (this.interviewSchedule.recStatus == '12') {
              this._router.navigateByUrl('/hirepros/customer-round');
            } else if (this.interviewSchedule.recStatus == '16') {
              this._router.navigateByUrl('/hirepros/hr-round');
            }
          }
        });
    }
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
