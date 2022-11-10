import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BusinessUnit } from 'src/app/Models/BusinessUnit';
import { jobReqSearch } from 'src/app/Models/jobReqSearch';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import { jobReq } from './../../../Models/JobRequest';
import { RecruitmentServiceService } from './../../../Services/RecruitmentServices/recruitment-service.service';

declare function closeModal(): any;
declare function closeFilter(): any;
declare function highlightRecruitment(): any;
@Component({
  selector: 'app-vendor-jobrequests',
  templateUrl: './vendor-jobrequests.component.html',
  styleUrls: ['./vendor-jobrequests.component.css'],
})
export class VendorJobrequestsComponent implements OnInit {
  vendorUniqueId: string;
  vendorPriority: string;

  constructor(
    private mserv: MasterserviceService,
    private rserv: RecruitmentServiceService,
    private alertify: AlertifyService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.vendorUniqueId = sessionStorage.getItem('currentVendorId');
    this.loadbu();
    this.vendorPriority =
      sessionStorage.getItem('vendorPriority') == 'Primary' ? 'Primary' : 'All';
    this.loadJobReqByVendorPriority();
  }

  findDetails(data) {
    return this.jobReqList.filter(
      (x) => x.referenceNumber === data.referenceNumber
    );
  }

  bulist: BusinessUnit[];
  loadbu() {
    this.mserv.getBUList().subscribe((data) => {
      this.bulist = data;
    });
  }
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15, 20];

  handlePageChange(event): void {
    this.page = event;
    //this.loadJobReq();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    //this.loadJobReq();
  }

  candidateCountforVendorJr: any;
  /**
   * Goto add candidate
   * @param id
   * @param roleName
   * @param type
   */
  gotoAddCandidate(id: string, roleName: string, type: string) {
    this.rserv.getJobRequestsByJRNumber(id).subscribe((data) => {
      if (data.vendorActionStatus != 'Active') {
        this.alertify.errorMsg(data.vendorActionStatus);
      } else {
        // this.rserv
        //   .getCandidatesCountVendorVsJr(this.vendorUniqueId, id)
        //   .subscribe((data) => {
        //     this.candidateCountforVendorJr = data;
        //     if (this.candidateCountforVendorJr.totalTagged >= 5) {
        //       this.alertify.errorMsg('Maximum candidate uploaded');
        //     } else {
        this._router.navigate(['hirepros/add-candidate', id, type]);
        //   }
        // });
      }
    });
  }

  jobReq: jobReq = new jobReq();
  jobReqList: any;
  loader: number = 0;
  // Load Job Request List
  // loadJobReq() {
  //   this.loader = 1;
  //   this.jobReq.keyword = '';
  //   this.rserv.getJRsByVendorId(this.vendorUniqueId).subscribe((data) => {
  //     this.jobReqList = data;
  //     console.log(this.jobReqList);
  //     this.loader = 0;
  //   });
  // }
  loadJobReqByVendorPriority() {
    this.loader = 1;
    this.jobReq.keyword = '';
    console.log('Vendor Priority: ' + this.vendorPriority);
    this.rserv.getJRsByVendorPriority(this.vendorPriority).subscribe((data) => {
      this.jobReqList = data;
      console.log(this.jobReqList);
      this.loader = 0;
    });
  }

  resetBtn: boolean = false;
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
    this.searchJobReq.jobReqStatus = undefined;
    this.resetBtn = false;
    this.loadJobReqByVendorPriority();
  }

  /**
   * Goto job req view
   * @param id
   */
  gotoJobReqView(id) {
    this._router.navigate(['hirepros/view-job-request', id]);
  }

  searchJobReq: jobReqSearch = new jobReqSearch();
  search(f: NgForm) {
    if (
      (this.searchJobReq.jrNumber == '' ||
        this.searchJobReq.jrNumber == null ||
        this.searchJobReq.jrNumber == undefined) &&
      (this.searchJobReq.employmentType == '' ||
        this.searchJobReq.employmentType == null ||
        this.searchJobReq.employmentType == undefined) &&
      (this.searchJobReq.buId == '' ||
        this.searchJobReq.buId == null ||
        this.searchJobReq.buId == undefined) &&
      (this.searchJobReq.jobReqStatus == '' ||
        this.searchJobReq.jobReqStatus == null ||
        this.searchJobReq.jobReqStatus == undefined)
    ) {
      this.alertify.errorMsg('Select any one Criteria');
      return;
    }
    console.log(this.searchJobReq);
    this.searchJobReq.vendorId = this.vendorUniqueId;
    this.searchJobReq.vendorPriority = this.vendorPriority;
    this.loader = 1;
    this.rserv.searchJobRequest(this.searchJobReq).subscribe((data) => {
      this.jobReqList = data;
      this.resetBtn = true;
      console.log(this.jobReqList);
      this.loader = 0;
      closeFilter();
      this.handlePageChange(1);
    });
  }
}
