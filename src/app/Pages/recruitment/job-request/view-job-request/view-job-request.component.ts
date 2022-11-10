/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jobReq } from 'src/app/Models/JobRequest';
import { GlobalMenuMappingServicesService } from 'src/app/Services/GlobalMenuMappingServices/global-menu-mapping-services.service';
import { RecruitmentServiceService } from 'src/app/Services/RecruitmentServices/recruitment-service.service';
declare function highlightRecruitment(): any;
@Component({
  selector: 'app-view-job-request',
  templateUrl: './view-job-request.component.html',
  styleUrls: ['./view-job-request.component.css'],
})
export class ViewJobRequestComponent implements OnInit {
  subMenuName: string;
  constructor(
    private _router: Router,
    private rserv: RecruitmentServiceService,
    private aroute: ActivatedRoute,
    private _gmenu: GlobalMenuMappingServicesService
  ) {}
  id: string;
  jobReq: jobReq = new jobReq();
  ngOnInit(): void {
    highlightRecruitment();
    this.subMenuName = sessionStorage.getItem('subMenuNames');

    this.id = this.aroute.snapshot.params['id'];
    this.rserv.getJobRequestsByJRNumber(this.id).subscribe(
      (data) => {
        this.jobReq = data;
        console.log(this.jobReq);
      },
      (error) => console.log(error)
    );
  }
  ////////////////
  enableSubMenu(mainMenu: string): boolean {
    return this._gmenu.subMenuAccess2(this.subMenuName, mainMenu);
  }
  ////////////////////
  goback() {
    history.back();
  }

  gotoJobReqList() {
    this._router.navigateByUrl('hirepros/job-request');
  }

  gotoAddCandidate(jrNum, type) {
    this._router.navigate(['hirepros/add-candidate', jrNum, type]);
  }
  /**
   * Goto bench candidate list
   * @param refNumber
   */
  gotoBenchCandidateList(refNumber) {
    this._router.navigate(['hirepros/bench-details', refNumber]);
  }
}
