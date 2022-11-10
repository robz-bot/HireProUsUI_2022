import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare function highlightReports(): any;
@Component({
  selector: 'app-select-report',
  templateUrl: './select-report.component.html',
  styleUrls: ['./select-report.component.css'],
})
export class SelectReportComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {
    highlightReports();
  }

  // statusList:boolean=true;
  // selectedStatus:boolean=false;
  // reports:any[]=["Job Request Status Report","Shortlisted Candidate Report","Rejected Candidates Report","Interview Schedule Summary Report"];
  // selectedReport:string;
  // onChange(e){
  //   this.selectedReport=e.target.value;
  //     this.statusList=false;
  //   this.selectedStatus=true;
  //   // if(e.target.value.match(this.reports)){

  //   // console.log("valueeeeee :"+e.target.value);
  //   // }
  //   // else{
  //   //   this.statusList=true;
  //   // this.selectedStatus=false;
  //   // }

  //   // if(this.selectedReport.length>0){
  //   //   this.statusList=false;
  //   // this.selectedStatus=true;
  //   // }
  //   // this.statusList=true;
  //   // this.selectedStatus=false;
  // }
  gotoJobRequestReport() {
    this._router.navigateByUrl('hirepros/job-request-report');
  }
  gotoRequirementProgRep() {
    this._router.navigateByUrl('hirepros/requirement-progress-report');
  }
  gotoShortListedCandidate() {
    this._router.navigateByUrl('hirepros/shortlisted-candidate-report');
  }
  gotoNotshortListedCandidate() {
    this._router.navigateByUrl('hirepros/not-shortlisted-candidate-report');
  }
  gotoInterviewScheduleRep() {
    this._router.navigateByUrl('hirepros/interview-schedule-summary-report');
  }
}
