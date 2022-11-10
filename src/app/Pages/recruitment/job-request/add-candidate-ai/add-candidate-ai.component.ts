import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { jobReq } from 'src/app/Models/JobRequest';
import { GlobalMenuMappingServicesService } from 'src/app/Services/GlobalMenuMappingServices/global-menu-mapping-services.service';
import { RecruitmentServiceService } from 'src/app/Services/RecruitmentServices/recruitment-service.service';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { PythonServiceService } from 'src/app/Services/python-service.service';

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
    private pythonService: PythonServiceService
  ) {}
  id: string;
  jobReq: jobReq = new jobReq();
  @ViewChild('myInput')
  myInputVariable!: ElementRef;
  fileName: string;
  loader = 0;

  ngOnInit(): void {
    this.loggedInUserId = sessionStorage.getItem('currentUserId');
    this.loggedInUserName = sessionStorage.getItem('currentUserName');
    this.loggedInUserRole = sessionStorage.getItem('Role');
    this.subMenuName = sessionStorage.getItem('subMenuNames');
    this.loggedInUserBUId = sessionStorage.getItem('currentUserBUId');

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

  shortlistArr = [
    {
      candidateId: 1,
      candidateName: 'Robin',
      percent: '30%',
      remarks: 'good to go',
    },
    {
      candidateId: 2,
      candidateName: 'Rajesh',
      percent: '30%',
      remarks: 'good to go',
    },
  ];
  notShortlistArr: any[] = [];
  resCheckedShortlistArr: any[] = [];
  showResultCard: boolean = false;
  file: any;

  uploadFile() {
    this.loader = 1;
    console.log(this.file);

    this.fileName = this.file.name;
    this.pythonService
      .parseTable(
        this.file,
        this.jobReq.jobDescription,
        this.jobReq.referenceNumber
      )
      .subscribe((data: any) => {
        console.log('Python Reesult:');
        this.loader = 0;
        console.log(data);
        this.shortlistArr = data['Shortlisted'][0];
        this.notShortlistArr = data['NotShortlisted'][0];

        this.showResultCard =
          this.shortlistArr.length > 0 || this.notShortlistArr.length > 0
            ? true
            : false;

        console.log(this.shortlistArr);
        console.log(this.notShortlistArr);
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

  moveToShortlist() {
    let uniqueArr = this.resCheckedShortlistArr.filter(
      (item, i, ar) => ar.indexOf(item) === i
    );
    console.log(uniqueArr);
    //To shortlist needed params = candidateId, remarks, jrnumber,
    // console.log(this.resCheckedShortlistArr);
  }

  // saveShortlistStatus(id: string) {
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
  //     this.rserv.updateShortlistResult(this.candidate).subscribe((data) => {
  //       console.log(data);
  //       this.loader = 0;
  //       this.candidate.remarks = '';
  //       this.alertify.successMsg('Shortlisted Status');

  //       this.loadCandidates();
  //     });
  //   }
  // }

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
}
