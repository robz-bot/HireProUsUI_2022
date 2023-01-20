import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { jobReq } from 'src/app/Models/JobRequest';
import { GlobalMenuMappingServicesService } from 'src/app/Services/GlobalMenuMappingServices/global-menu-mapping-services.service';
import { RecruitmentServiceService } from 'src/app/Services/RecruitmentServices/recruitment-service.service';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { PythonServiceService } from 'src/app/Services/python-service.service';
import { candidate } from 'src/app/Models/Candidate';
import { VendorServiceService } from 'src/app/Services/VendorServices/vendor-service.service';
import { vendor } from 'src/app/Models/vendor';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-add-candidate-ai',
  templateUrl: './add-candidate-ai.component.html',
  styleUrls: ['./add-candidate-ai.component.css'],
})
export class AddCandidateAiComponent implements OnInit {
  loggedInUserId: string;
  loggedInUserName: string;
  loggedInUserRole: string;
  subMenuName: string;
  loggedInUserBUId: string;
  constructor(
    private _router: Router,
    private rserv: RecruitmentServiceService,
    private aroute: ActivatedRoute,
    private _gmenu: GlobalMenuMappingServicesService,
    private alertify: AlertifyService,
    private pythonService: PythonServiceService,
    private vendorService: VendorServiceService
  ) {}
  id: string;
  jobReq: jobReq = new jobReq();
  @ViewChild('myInput')
  myInputVariable!: ElementRef;
  fileName: string;
  loader = 0;
  source: string = '';

  ngOnInit(): void {
    this.loggedInUserId = sessionStorage.getItem('currentUserId');
    this.loggedInUserName = sessionStorage.getItem('currentUserName');
    this.loggedInUserRole = sessionStorage.getItem('Role');
    this.subMenuName = sessionStorage.getItem('subMenuNames');
    this.loggedInUserBUId = sessionStorage.getItem('currentUserBUId');

    this.loadActiveVendors();

    this.fileName = '';
    this.id = this.aroute.snapshot.params['id'];
    this.rserv.getJobRequestsByJRNumber(this.id).subscribe(
      (data) => {
        this.jobReq = data;
        console.log(this.jobReq);
      },
      (error) => console.log(error)
    );
  }

  enableSubMenu(subMenu: string): boolean {
    // return this._gmenu.subMenuAccess(icon);
    return this._gmenu.subMenuAccess2(this.subMenuName, subMenu);
  }

  goback() {
    history.back();
  }

  // shortlistArr = [
  //   {
  //     candidateId: 1,
  //     candidateName: 'Robin',
  //     percent: '30%',
  //     remarks: 'good to go',
  //   },
  //   {
  //     candidateId: 2,
  //     candidateName: 'Rajesh',
  //     percent: '30%',
  //     remarks: 'good to go',
  //   },
  // ];
  shortlistArr: any[] = [];
  notShortlistArr: any[] = [];
  resCheckedShortlistArr: any[] = [];
  showResultCard: boolean = false;
  file: any;
  pythonResData: any;

  uploadFile() {
    console.log(this.file);
    var desc_skills =
      this.jobReq.jobDescription +
      ' ' +
      this.jobReq.mandatorySkills +
      ' ' +
      this.jobReq.optionalSkills;

    if (this.source == undefined || this.source == '') {
      this.alertify.errorMsg('Source is required!');
      return;
    }
    if (this.file.name == undefined || this.file.name == '') {
      this.alertify.errorMsg('File is required!');
      return;
    }

    this.fileName = this.file.name;
    this.loader = 1;
    this.pythonService
      .parseTable(
        this.file,
        desc_skills,
        this.jobReq.referenceNumber,
        this.source,
        this.loggedInUserId
      )
      .subscribe((data: any) => {
        console.log('Python Reesult:');
        this.loader = 0;
        console.log(data);
        this.pythonResData = data;
        if (this.pythonResData.isSuccess == 'False') {
          this.alertify.errorMsg(this.pythonResData.message);
        } else {
          this.shortlistArr = data['Shortlisted'][0];
          this.notShortlistArr = data['NotShortlisted'][0];

          this.showResultCard =
            this.shortlistArr.length > 0 || this.notShortlistArr.length > 0
              ? true
              : false;

          console.log(this.shortlistArr);
          console.log(this.notShortlistArr);
          this.alertify.successMsg1(this.pythonResData.message);
        }
      });
  }

  activeVendors: vendor[];
  loadActiveVendors() {
    this.vendorService.getActiveVendors().subscribe((data) => {
      console.log(data);
      this.activeVendors = data;
    });
  }

  checkAllCheckBox(ev: any) {
    if (ev.target.checked) {
      for (var i = 0; i < this.shortlistArr.length; i++) {
        this.resCheckedShortlistArr.push(this.shortlistArr[i]);
      }
    } else {
      this.resCheckedShortlistArr = [];
    }

    this.shortlistArr.forEach((x: any) => (x.checked = ev.target.checked));
  }

  isAllCheckBoxChecked() {
    return this.shortlistArr.every((p: any) => p.checked);
  }

  checkedShortlistArr(checked: any, item: any) {
    console.log(item);

    if (checked) {
      this.resCheckedShortlistArr.push(item);
    } else {
      this.resCheckedShortlistArr.splice(
        this.resCheckedShortlistArr.indexOf(item),
        1
      );
    }
  }

  candidate: candidate = new candidate();
  moveToShortlist() {
    let uniqueArr = this.resCheckedShortlistArr.filter(
      (item, i, ar) => ar.indexOf(item) === i
    );
    console.log(uniqueArr);
    if (uniqueArr.length > 0) {
      for (var i = 0; i < uniqueArr.length; i++) {
        this.candidate.id = uniqueArr[i].candidateId;
        this.candidate.recStatus = '01';
        this.candidate.createdBy = this.loggedInUserId;
        this.candidate.updatedBy = this.loggedInUserId;
        this.candidate.jrNumber = uniqueArr[i].jrNumber;
        this.candidate.remarks = uniqueArr[i].remark;

        this.shortlistArr.find((item, i, arr) => {
          console.log('item: ');
          console.log(item);
          for (var j = 0; j < uniqueArr.length; j++) {
            if (item === uniqueArr[j]) {
              this.shortlistArr.splice(
                this.shortlistArr.findIndex(
                  (e) => e.candidateId === uniqueArr[j].candidateId
                ),
                1
              );
            }
          }
        });

        this.rserv.updateShortlistResult(this.candidate).subscribe((data) => {
          console.log(data);
        });
      }
      this.loader = 0;
      this.alertify.successMsg1(
        'Selected candidates shortlisted successfully!'
      );
    } else {
      this.alertify.errorMsg('Select row to shortlist');
      return;
    }
    //To shortlist needed params = candidateId, remarks, jrnumber,
    // console.log(this.resCheckedShortlistArr);
  }

  saveShortlistStatus(id: string) {
    //   console.log(this.candidate.remarks);
    //   if (this.candidate.remarks == '') {
    //     this.alertify.errorMsg('Shortlist Remarks is Required');
    //   } else {
    //     this.loader = 1;
    //     this.candidate.id = id;
    //     this.candidate.recStatus = '01';
    //     this.candidate.createdBy = this.loggedInUserId;
    //     this.candidate.updatedBy = this.loggedInUserId;
    //     this.candidate.jrNumber = this.jRNumber;
    //     console.log(this.candidate);
    // this.rserv.updateShortlistResult(this.candidate).subscribe((data) => {
    //       console.log(data);
    //       this.loader = 0;
    //       this.candidate.remarks = '';
    //       this.alertify.successMsg('Shortlisted Status');
    //       this.loadCandidates();
    //     });
    //   }
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  clearInput() {
    console.log('clear');
    this.fileName = '';
    this.myInputVariable.nativeElement.value = '';
    this.shortlistArr = [];
    this.showResultCard = false;
  }

  shortlistedFileName: string = 'shortlisted_';
  notShortlistedFileName: string = 'not_shortlisted_';
  // Export shortlisted and Not shortlisted excel
  exportexcel(type: string): void {
    var seconds = new Date().getTime() / 1000;
    var downloadFileName = '';
    let element;
    /* pass here the table id */
    if (type == 'shortlist') {
      element = document.getElementById('shortlist-table');
      downloadFileName = this.shortlistedFileName + seconds + '.xlsx';
    } else if (type == 'not-shortlist') {
      element = document.getElementById('not-shortlist-table');
      downloadFileName = this.notShortlistedFileName + seconds + '.xlsx';
    }
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, downloadFileName);
  }
}
