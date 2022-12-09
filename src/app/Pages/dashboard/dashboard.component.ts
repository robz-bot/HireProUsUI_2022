/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { jobRequestAging } from './../../Models/jobRequestAging';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {
  BUsAndJobRequestCount,
  jobRequestCount,
  LatestJobRequests,
  WidgetData,
} from './../../Models/dashboard';
import { RecruitmentServiceService } from 'src/app/Services/RecruitmentServices/recruitment-service.service';
import { GlobalMenuMappingServicesService } from './../../Services/GlobalMenuMappingServices/global-menu-mapping-services.service';
import { DashboardServiceService } from './../../Services/DashboardServices/dashboard-service.service';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { jobReqSearch } from 'src/app/Models/jobReqSearch';

declare function highlightDashboard(): any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  loggedInUserId: string;
  constructor(
    private dserv: DashboardServiceService,
    private rserv: RecruitmentServiceService,
    private _gmenu: GlobalMenuMappingServicesService,
    private _rserv: RecruitmentServiceService,
    private _router: Router,
    private alertify: AlertifyService
  ) {}
  cUser: string;
  loggedInUserRole: string;
  mainMenuName: string;
  subMenuName: string;
  vendorUniqueId: string;
  ngOnInit(): void {
    highlightDashboard();

    this.cUser = sessionStorage.getItem('currentUserName');
    this.loggedInUserRole = sessionStorage.getItem('Role');
    this.mainMenuName = sessionStorage.getItem('mainMenuNames');
    this.subMenuName = sessionStorage.getItem('subMenuNames');
    this.loggedInUserId = sessionStorage.getItem('currentUserId');

    this.defaultLoads();
    console.log(environment.apiUrl);
  }
  title: string;
  type: string;
  data: {};
  agingData: {};
  columnNames: {};
  options: {};
  width: number;
  height: number;

  piechartTitle1: string;
  pieChartType1: string;
  pieChartdata1: {};
  pieChartcolumnNames1: {};
  pieChartoptions1: {};
  pieChartwidth1: number;
  pieChartheight1: number;

  piechartTitle2: string;
  pieChartType2: string;
  pieChartdata2: {};
  pieChartcolumnNames2: {};
  pieChartoptions2: {};
  pieChartwidth2: number;
  pieChartheight2: number;
  /**
   * Defaults loads
   */
  defaultLoads() {
    this.getWidgetData();
    this.getActiveRequestsData();
    this.LatestJobRequests();
    this.getJobRequestAgingCount();
    //this.JobRequestStagesCount();
    highlightDashboard();
    //////////////////////////////////////////

    this.type = 'ColumnChart';

    this.columnNames = ['Metrics', 'Count'];

    this.options = {
      explorer: { axis: 'horizontal' },

      annotations: {
        textStyle: {
          fontName: 'sans-serif',
        },
      },

      vAxis: {
        minValue: 0,
      },
      bar: { groupWidth: '25%' },
    };
    this.width = 1000;
    this.height = 325;
    //////////////////////////////////////////
    this.pieChartType1 = 'PieChart';
    this.pieChartoptions1 = {
      pieHole: 0.4,
      legend: 'none',
      colors: ['#1254a1', '#38b6ff'],
    };
    this.pieChartwidth1 = 400;
    this.pieChartheight1 = 365;
    //////////////////////////////////////////

    this.pieChartType2 = 'PieChart';
    this.pieChartoptions2 = {
      pieHole: 0.4,
      legend: 'none',
    };
    this.pieChartwidth2 = 400;
    this.pieChartheight2 = 365;
  }

  selectedBUName: string;
  recordFoundForJR: boolean = false;
  /**
   * Onclicks buname for jrprogression
   * @param index
   */
  onclickBUNameForJRProgression(index: number) {
    //let index: number = event.target['selectedIndex'] - 1;
    this.piechartTitle1 =
      'Active Job Request Count - ' + this.ActiveRequestsData[index].buName;
    this.autoSelectBUForJRProgression = this.ActiveRequestsData[index].buName; //added on 10/9/2021
    this.recordFoundForJR =
      this.ActiveRequestsData[index].inprogress != 0 ||
      this.ActiveRequestsData[index].open != 0
        ? false
        : true;
    this.pieChartdata1 = [
      [
        'In Progress',
        this.ActiveRequestsData[index].inprogress == null
          ? (this.ActiveRequestsData[index].inprogress = 0)
          : this.ActiveRequestsData[index].inprogress,
      ],
      [
        'Open',
        this.ActiveRequestsData[index].open == null
          ? (this.ActiveRequestsData[index].open = 0)
          : this.ActiveRequestsData[index].open,
      ],
    ];
  }

  recordFoundForCandidate: boolean = false;
  /**
   * Onclicks buname for candidate progression
   * @param index
   */
  onclickBUNameForCandidateProgression(index: number) {
    this.piechartTitle2 =
      'Total Tagged Candidates For ' +
      this.ActiveRequestsData[index].buName +
      ' - ' +
      this.ActiveRequestsData[index].totalTagged;
    this.autoSelectBUForCandidateProgression =
      this.ActiveRequestsData[index].buName; //added on 10/14/2021
    this.recordFoundForCandidate =
      this.ActiveRequestsData[index].totalTagged > 0 ? true : false;
    this.pieChartdata2 = [
      ['Uploaded Candidates', this.ActiveRequestsData[index].uploaded],
      ['Shortlisted Candidates', this.ActiveRequestsData[index].shortlisted],
      ['Holded Candidates', this.ActiveRequestsData[index].hold],
      ['Rejected Candidates', this.ActiveRequestsData[index].rejected],
      ['Selected Candidates', this.ActiveRequestsData[index].selected],
      ['Onboarded Candidates', this.ActiveRequestsData[index].onboarded],
    ];
  }
  ///////////////////
  /**
   * Enables add candidate
   * @param icon
   * @returns true if add candidate
   */
  enableAddCandidate(icon: string): boolean {
    return this._gmenu.subMenuAccess(icon);
  }
  ////////////////

  page = 1;
  bupage = 1;

  count = 0;

  pageSize = 5;
  bupageSize = 5;

  /**
   * Handles page change
   * @param event
   */
  handlePageChange(event): void {
    this.bupage = event;
  }
  /**
   * Handles page change for jr
   * @param event
   */
  handlePageChangeForJr(event): void {
    this.page = event;
  }

  widgetData: WidgetData;
  widget1: any;
  widget2: any;
  widget3: any;
  widget4: any;
  widget5: any;
  widget6: any;
  /**
   * Gets widget data
   */
  getWidgetData() {
    this.dserv.getWidgetData(this.loggedInUserId).subscribe((data) => {
      this.widgetData = data;
      this.widget1 = this.widgetData[0]; //My Work Items
      this.widget2 = this.widgetData[1]; //Job Requests
      this.widget3 = this.widgetData[2]; //"Interviews"
      this.widget4 = this.widgetData[3]; //Active Job Requests
      this.widget5 = this.widgetData[4]; //Total Selected Candidates
      this.widget6 = this.widgetData[5]; //Total On-boarded Candidates

      console.log(data);
    });
  }

  ActiveRequestsData: BUsAndJobRequestCount;
  autoSelectBUForJRProgression: any;
  autoSelectBUForCandidateProgression: any;
  /**
   * Gets active requests data
   */
  getActiveRequestsData() {
    this.dserv.getBUsAndJobRequestCount().subscribe((data) => {
      this.ActiveRequestsData = data;

      this.onclickBUNameForJRProgression(0);
      this.onclickBUNameForCandidateProgression(0);
      console.log(data);
    });
  }

  JobRequestAgingCountData: jobRequestAging;
  /**
   * Gets job request aging count
   */
  getJobRequestAgingCount() {
    this.dserv.getJobRequestAgingCount().subscribe((data) => {
      this.JobRequestAgingCountData = data;
      this.title = 'Total: ' + this.JobRequestAgingCountData.totalCount;
      this.agingData = [
        ['0-10 Days', this.JobRequestAgingCountData.age10Days],
        ['11-20 Days ', this.JobRequestAgingCountData.age20Days],
        ['21-30 Days', this.JobRequestAgingCountData.age30Days],
        ['31-60 Days', this.JobRequestAgingCountData.age60Days],
        ['61-90 Days', this.JobRequestAgingCountData.age90Days],
        ['90 Days & Above', this.JobRequestAgingCountData.moreThan90Days],
      ];
      console.log(data);
    });
  }

  /**
   * Gets job request aging count by bu id
   * @param buId
   */
  getJobRequestAgingCountByBuId(buId: string) {
    console.log(buId);
    this.dserv.getJobRequestAgingCountByBuId(buId).subscribe((data) => {
      this.JobRequestAgingCountData = data;
      this.title = 'Total: ' + this.JobRequestAgingCountData.totalCount;
      this.agingData = [
        [
          '0-10 Days',
          this.JobRequestAgingCountData.age10Days == null
            ? (this.JobRequestAgingCountData.age10Days = 0)
            : this.JobRequestAgingCountData.age10Days,
        ],
        [
          '11-20 Days ',
          this.JobRequestAgingCountData.age20Days == null
            ? (this.JobRequestAgingCountData.age20Days = 0)
            : this.JobRequestAgingCountData.age20Days,
        ],
        [
          '21-30 Days',
          this.JobRequestAgingCountData.age30Days == null
            ? (this.JobRequestAgingCountData.age30Days = 0)
            : this.JobRequestAgingCountData.age30Days,
        ],
        [
          '31-60 Days',
          this.JobRequestAgingCountData.age60Days == null
            ? (this.JobRequestAgingCountData.age60Days = 0)
            : this.JobRequestAgingCountData.age60Days,
        ],
        [
          '61-90 Days',
          this.JobRequestAgingCountData.age90Days == null
            ? (this.JobRequestAgingCountData.age90Days = 0)
            : this.JobRequestAgingCountData.age90Days,
        ],
        [
          '90 Days & Above',
          this.JobRequestAgingCountData.moreThan90Days == null
            ? (this.JobRequestAgingCountData.moreThan90Days = 0)
            : this.JobRequestAgingCountData.moreThan90Days,
        ],
      ];
      console.log(data);
    });
  }

  LatestJobRequestsData: LatestJobRequests[];
  LatestJobRequestsDataLength: number;
  /**
   * Latests job requests
   */
  LatestJobRequests() {
    this.dserv.getLatestJobRequests().subscribe((data) => {
      this.LatestJobRequestsData = data;
      this.LatestJobRequestsDataLength = this.LatestJobRequestsData.length;
      console.log(data);
    });
  }

  JobRequestStagesCountData: jobRequestCount;
  /**
   * Jobs request stages count
   */
  // JobRequestStagesCount() {
  //   this.dserv.getAllJobRequestStagesCount().subscribe((data) => {
  //     this.JobRequestStagesCountData = data;
  //     this.data = [
  //       ['Total Request', this.JobRequestStagesCountData.totalRequest],
  //       ['Contract ', this.JobRequestStagesCountData.contract],
  //       ['Full Time', this.JobRequestStagesCountData.fullTime],
  //       ['Resumes Tagged ', this.JobRequestStagesCountData.resumesTagged],
  //       [
  //         'Resumes Shortlisted ',
  //         this.JobRequestStagesCountData.resumesShortlisted,
  //       ],
  //       ['Interview 1', this.JobRequestStagesCountData.ir1Cleared],
  //       ['Interview 2', this.JobRequestStagesCountData.ir2Cleared],
  //       ['Client Interview', this.JobRequestStagesCountData.crCleared],
  //       ['HR Interview', this.JobRequestStagesCountData.hrCleared],
  //       ['Selected', this.JobRequestStagesCountData.selected],
  //       ['Onboarded', this.JobRequestStagesCountData.onboarded],
  //     ];
  //     console.log(data);
  //   });
  // }

  jobReqList: any;
  searchJobReq: jobReqSearch = new jobReqSearch();
  disableTable: boolean = false;
  /**
   * Searchs dashboard component
   * @returns
   */
  search() {
    console.log(this.searchJobReq.jrNumber);
    if (
      this.searchJobReq.jrNumber == '' ||
      this.searchJobReq.jrNumber == undefined
    ) {
      this.alertify.errorMsg('Job Request Number is Required');
      return;
    } else {
      this.disableTable = true;
      this.rserv.searchJobRequest(this.searchJobReq).subscribe((data) => {
        this.jobReqList = data;
      });
    }
  }
  /**
   * Handles key up
   * @param e
   */
  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.search();
    }
  }
  /**
   * Goto job req view
   * @param id
   */
  gotoJobReqView(id) {
    this._router.navigate(['hirepros/view-job-request', id]);
  }
  /**
   * Goto add candidate
   * @param id
   * @param type
   */
  gotoAddCandidate(id: string, type: string) {
    this._router.navigate(['hirepros/add-candidate', id, type]);
  }
  /**
   * Clears job request
   */
  clearJobRequest() {
    this.searchJobReq.jrNumber = '';
    this.disableTable = false;
  }
  /**
   * Goto my job requests
   * created on 10/6/2021
   */
  gotoMyJobRequests() {
    this._router.navigate(['hirepros/my-job-requests', this.loggedInUserId]);
  }
  /**
   * Goto my interviews list
   * added on 10/6/2021
   */
  gotoMyinterviews() {
    this._router.navigateByUrl('hirepros/my-interviews');
  }
  /**
   * Goto bench candidate list
   * @param refNumber
   */
  gotoBenchCandidateList(refNumber) {
    this._router.navigate(['hirepros/bench-details', refNumber]);
  }
}
