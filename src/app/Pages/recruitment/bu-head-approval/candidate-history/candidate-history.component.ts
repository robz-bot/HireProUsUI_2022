/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { RecStatusServiceService } from 'src/app/Services/RecStatusServices/rec-status-service.service';
import { interviewSchedule } from './../../../../Models/InterviewSchedule';
import { candidate } from './../../../../Models/Candidate';
import { RecruitmentServiceService } from 'src/app/Services/RecruitmentServices/recruitment-service.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare function highlightRecruitment(): any;
@Component({
  selector: 'app-candidate-history',
  templateUrl: './candidate-history.component.html',
  styleUrls: ['./candidate-history.component.css'],
})
export class CandidateHistoryComponent implements OnInit {
  constructor(
    private aroute: ActivatedRoute,
    private rserv: RecruitmentServiceService,
    private recStatServ: RecStatusServiceService
  ) {}

  jrNumber: string;
  candidateId: string;
  buindex: number;
  candidateDetails: any;
  loader: number = 0;

  ngOnInit(): void {
    highlightRecruitment();

    this.jrNumber = this.aroute.snapshot.params['jr'];
    this.candidateId = this.aroute.snapshot.params['id'];
    this.getCandidateDet();
  }
  round0: interviewSchedule;
  round1: interviewSchedule;
  round2: interviewSchedule;
  round3: interviewSchedule;
  round4: interviewSchedule;
  round5: interviewSchedule;
  /**
   * Gets candidate det
   */
  getCandidateDet() {
    this.loader = 1;
    this.rserv
      .viewHistory(this.jrNumber, this.candidateId)
      .subscribe((data) => {
        console.log(data);
        this.round0 = data[0];
        this.round1 = data[1];
        this.round2 = data[2];
        this.round3 = data[3];
        this.round4 = data[4];
        this.round5 = data[5];
        this.loader = 0;
      });
  }
  /**
   * Goto to back
   */
  gotoToBack() {
    history.back();
  }
  /**
   * Sets rec status
   * @param recStatus
   * @returns rec status
   */
  setRecStatus(recStatus: string): string {
    return this.recStatServ.getRecStatus(recStatus);
  }
}
