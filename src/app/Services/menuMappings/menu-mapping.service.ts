import { Injectable } from '@angular/core';
import { mappingMenu } from 'src/app/Models/mappingMenu';

@Injectable({
  providedIn: 'root',
})
export class MenuMappingService {
  constructor() {}

  enableBU: number = 0;
  enableProject: number = 0;
  enableDashboard: number = 0;
  enableCustomers: number = 0;
  enableHireProRoles: number = 0;
  enableRecruitmentRoles: number = 0;
  enableInterviewPanel: number = 0;
  enableMenus: number = 0;
  enableRRM: number = 0;
  enableJobRequest: number = 0;
  enableCandidateDetails: number = 0;
  enableResumeShortlist: number = 0;
  enableInterviewProcess: number = 0;
  enableBUHeadApproval: number = 0;
  enableOnboardDetails: number = 0;
  enableUserRegistration: number = 0;
  enableReports: number = 0;
  enableJobRequestList: number = 0;
  enableNewJobRequest: number = 0;
  enableScheduledCandidateList: number = 0;
  enableNewSchedule: number = 0;

  menus: any;
  mapMenus(menus) {}
  // mapMenus(menus) {
  //   //this.menus = sessionStorage.getItem('Menus').split(',');
  //   // console.log(this.menus);
  //   // for (var i = 0; i < this.menus.length; i++) {
  //   //   console.log(this.menus[i]);
  //   //   if(this.menus[i] == )
  //   // }
  //   menus.forEach((element) => {
  //     //console.log(element);
  //     // element == mappingMenu['Business Units']
  //     //   ? (this.enableBU = 1)
  //     //   : (this.enableBU = 0);

  //     if (element == mappingMenu['Business Units']) {
  //       this.enableBU = 1;
  //     } else if (element == mappingMenu['Projects']) {
  //       //console.log('proj enabled');
  //       this.enableProject = 1;
  //     } else if (element == mappingMenu['Dashboard']) {
  //       this.enableDashboard = 1;
  //     } else if (element == mappingMenu['Customers']) {
  //       this.enableCustomers = 1;
  //     } else if (element == mappingMenu['Projects']) {
  //       this.enableProject = 1;
  //     } else if (element == mappingMenu['HirePro Roles']) {
  //       this.enableHireProRoles = 1;
  //     } else if (element == mappingMenu['Recruitment Roles']) {
  //       this.enableRecruitmentRoles = 1;
  //     } else if (element == mappingMenu['Interview Panel']) {
  //       this.enableInterviewPanel = 1;
  //     } else if (element == mappingMenu['Menus']) {
  //       this.enableMenus = 1;
  //     } else if (element == mappingMenu['Role Menu Mapping']) {
  //       this.enableRRM = 1;
  //     } else if (element == mappingMenu['Menus']) {
  //       this.enableMenus = 1;
  //     } else if (element == mappingMenu['Job Request']) {
  //       this.enableJobRequest = 1;
  //     } else if (element == mappingMenu['Candidate Details']) {
  //       this.enableCandidateDetails = 1;
  //     } else if (element == mappingMenu['Interview Process']) {
  //       this.enableInterviewProcess = 1;
  //     } else if (element == mappingMenu['BU Head Approval']) {
  //       this.enableBUHeadApproval = 1;
  //     } else if (element == mappingMenu['Onboard Details']) {
  //       this.enableOnboardDetails = 1;
  //     } else if (element == mappingMenu['User Registration']) {
  //       this.enableUserRegistration = 1;
  //     } else if (element == mappingMenu['Reports']) {
  //       this.enableReports = 1;
  //     } else if (element == mappingMenu['Job Request List']) {
  //       this.enableJobRequestList = 1;
  //     } else if (element == mappingMenu['New Job Request']) {
  //       this.enableNewJobRequest = 1;
  //     } else if (element == mappingMenu['Scheduled Candidate List']) {
  //       this.enableScheduledCandidateList = 1;
  //     } else if (element == mappingMenu['New Schedule']) {
  //       this.enableNewSchedule = 1;
  //     } else if (element == ' ' || element == '') {
  //       return;
  //     }
  //   });
  // }
}
