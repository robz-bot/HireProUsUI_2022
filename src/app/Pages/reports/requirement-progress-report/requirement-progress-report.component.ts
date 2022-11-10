import { UserRegServicesService } from 'src/app/Services/UserRegServices/user-reg-services.service';
import { RecruitmentServiceService } from './../../../Services/RecruitmentServices/recruitment-service.service';
import { jobReq } from './../../../Models/JobRequest';
import { BusinessUnit } from 'src/app/Models/BusinessUnit';
import { customer } from './../../../Models/Customers';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { recrole } from 'src/app/Models/RecRoles';
import { JobReq } from 'src/app/Services/GlobalConstants';
import { UserReg } from 'src/app/Models/UserReg';
import { jobReqSearch } from 'src/app/Models/jobReqSearch';
import { candidate } from './../../../Models/Candidate';
import { ActivatedRoute, Router } from '@angular/router';
import { RecStatusServiceService } from './../../../Services/RecStatusServices/rec-status-service.service';

declare function closeModal(): any;
declare function redirectToList(): any;

@Component({
  selector: 'app-requirement-progress-report',
  templateUrl: './requirement-progress-report.component.html',
  styleUrls: ['./requirement-progress-report.component.css'],
})
export class RequirementProgressReportComponent implements OnInit {
  constructor(
    private rserv: RecruitmentServiceService,
    private recStatServ: RecStatusServiceService,
    private mserv: MasterserviceService,
    private alertify: AlertifyService,
    private _router: Router,
    private userv: UserRegServicesService,
    private aroute: ActivatedRoute
  ) {}

  loggedInUserName: string;
  loggedInUserRole: string;
  UserType: number;
  loggedInUserId: any;
  jreNum: string;
  jobReq: jobReq = new jobReq();
  loader: number = 0;

  ngOnInit(): void {
    //document.getElementById('recruitment').classList.add('active');
    this.jreNum = this.aroute.snapshot.params['id'];
    console.log(this.jreNum);
    this.loadCandidates();
    this.rserv.getJobRequestsByJRNumber(this.jreNum).subscribe(
      (data) => {
        this.jobReq = data;
        console.log(this.jobReq);
      },
      (error) => console.log(error)
    );

    this.loadbu();

    this.loggedInUserId = sessionStorage.getItem('currentUserId');
    this.loggedInUserName = sessionStorage.getItem('currentUserName');
    console.log(this.loggedInUserName);
    this.loggedInUserRole = sessionStorage.getItem('Role');
    if (
      this.loggedInUserRole == 'Recruitment Team' ||
      this.loggedInUserRole == 'Recruitment Manager'
    ) {
      this.UserType = 1;
    } else if (
      this.loggedInUserRole == 'BU Head' ||
      this.loggedInUserRole == 'Sales Manager' ||
      this.loggedInUserRole == 'Delivery Manager'
    ) {
      this.UserType = 2;
    } else {
      this.UserType = 0;
    }
    //console.log(this.UserType);
  }

  //Load candidates for reference number
  candidateList: any;
  loadCandidates() {
    console.log(this.jreNum);
    this.rserv.getCandidatesByJRNum(this.jreNum).subscribe((data) => {
      console.log(data);
      this.candidateList = data;
    });
  }
  goback() {
    history.back();
  }

  ///--------------------------------------------
  bulist: BusinessUnit[];
  loadbu() {
    this.mserv.getBUList().subscribe((data) => {
      this.bulist = data;
    });
  }
  cuslist: customer[];
  loadcustomers() {
    this.mserv.getCustomersList().subscribe((data) => {
      this.cuslist = data;
    });
  }
  recruitersList: UserReg[];
  loadRecruiters() {
    this.userv.getRecruitersList().subscribe((data) => {
      this.recruitersList = data;
      console.log(this.recruitersList);
    });
  }
  rolelist: recrole[];
  loadroles() {
    this.mserv.getrecroleList().subscribe((data) => {
      this.rolelist = data;
    });
  }
  JobRequestNumbersList: any;
  loadAllJobRequestNumbers() {
    this.rserv.getAllJobRequestNumbers().subscribe((data) => {
      this.JobRequestNumbersList = data;
      console.log(this.JobRequestNumbersList);
    });
  }

  searchJobReq: jobReqSearch = new jobReqSearch();
  search(f: NgForm) {
    console.log(this.jobReq.keyword);
    console.log(f);
    if (f.form.valid) {
      this.loader = 1;
      this.rserv.searchJobRequest(this.searchJobReq).subscribe((data) => {
        this.candidateList = data;
        closeModal();
        console.log(this.candidateList);
        this.loader = 0;
      });
    } else {
      this.alertify.errorMsg('Search Keyword is Required');
    }
  }

  reset() {
    this.searchJobReq.customerId = undefined;
    this.searchJobReq.buId = undefined;
    this.searchJobReq.roleId = undefined;
    this.searchJobReq.recruiterId = undefined;
    this.searchJobReq.employmentType = undefined;
    this.searchJobReq.placementFor = undefined;
    this.searchJobReq.fromDateTime = null;
    this.searchJobReq.toDateTime = null;
    this.searchJobReq.jrNumber = '';
    this.loadCandidates();
  }

  // onChangeBu(id) {
  //   this.loader = 1;
  //   this.jobReq.customerId = undefined;
  //   this.jobReq.roleId = undefined;
  //   this.jobReq.recruiterId = undefined;
  //   console.log(id);
  //   this.rserv.getJRByBuId(id).subscribe((data) => {
  //     console.log(data);
  //     this.loader = 0;
  //     this.jobReqList = data;
  //     console.log(this.jobReqList);
  //     // this.searchKey =
  //     //   this.jobReqList[0].buName == null
  //     //     ? 'No Record(s)'
  //     //     : this.jobReqList[0].buName;
  //   });
  // }

  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15, 20];

  handlePageChange(event): void {
    this.page = event;
    this.loadCandidates();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.loadCandidates();
  }

  gotoJobReqReportView(id) {
    this._router.navigate(['hirepros/view-report', id]);
  }
  // //Validate Text Fields based on inputs
  // isNumberKey(evt) {
  //   var charCode = evt.which ? evt.which : evt.keyCode;
  //   if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
  //   return true;
  // }
  // isAlphabetKey(evt) {
  //   var acharCode = evt.which ? evt.which : evt.keyCode;
  //   if (
  //     (acharCode > 64 && acharCode < 91) ||
  //     (acharCode > 96 && acharCode < 123)
  //   )
  //     return true;
  //   return false;
  // }
  // Declarations
  // jobReq: jobReq = new jobReq();
  // jobReqList: any;
  // loader: number = 0;

  // // Load Job Request List
  // loadJobReq() {
  //   this.loader = 1;
  //   this.jobReq.keyword = '';
  //   this.rserv.getJobRequestList().subscribe((data) => {
  //     this.jobReqList = data;
  //     console.log(this.jobReqList);
  //     this.loader = 0;
  //   });
  // }

  jrId: string;
  recruiter: string;
  getJRNumber(id) {
    this.jrId = id;
  }

  gotoJobReqView(id) {
    this._router.navigate(['hirepros/view-job-request', id]);
  }
  setRecStatus(recStatus: string): string {
    return this.recStatServ.getRecStatus(recStatus);
  }

  gotoDownLoad(jrNumber) {
    console.log(jrNumber);
  }
  // urlElement:any;
  // ulrLink:any;
  // gotoDownload(id){
  //   console.log(id)
  //   this.urlElement=document.getElementById("downloadurl");
  //   this.ulrLink="http://localhost:8080/api/v1/downloadJobRequestPdf";
  //   this.urlElement.href=this.ulrLink;
  // }
}
