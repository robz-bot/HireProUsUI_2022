import { panelList } from './../../../../Models/panelList';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BusinessUnit } from 'src/app/Models/BusinessUnit';
import { InterviewPanel } from 'src/app/Models/InterviewPanel';
import { UserReg } from 'src/app/Models/UserReg';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import { UserRegServicesService } from 'src/app/Services/UserRegServices/user-reg-services.service';
declare function highlightMasters(): any;

@Component({
  selector: 'app-update-interview-panel',
  templateUrl: './update-interview-panel.component.html',
  styleUrls: ['./update-interview-panel.component.css'],
})
export class UpdateInterviewPanelComponent implements OnInit {
  constructor(
    private mserv: MasterserviceService,
    private userv: UserRegServicesService,
    private alertify: AlertifyService,
    private aroute: ActivatedRoute,
    private _router: Router
  ) {}

  id: string;
  buUser: BusinessUnit = new BusinessUnit();
  ngOnInit(): void {
    highlightMasters();

    this.getallBUWithPanel();
    this.id = this.aroute.snapshot.params['id'];
    this.loadbuById(this.id);
    this.loaduser(this.id);
  }

  bulist: any;
  loadbu() {
    this.mserv.getBUList().subscribe((data) => {
      this.bulist = data;
    });
  }

  buname: any;
  loadbuById(id) {
    this.mserv.getBUById(id).subscribe((data) => {
      this.buUser = data;
    });
  }

  panelList: any[];
  notPanelList: any[];
  loaduser(id) {
    this.userv.getUsersByBUId(id).subscribe((data) => {
      this.userlist = data;
      //console.log(this.userlist);
      this.panelList = this.userlist.panelList;
      console.log(panelList);
      this.notPanelList = this.userlist.notPanelList;
      console.log(panelList);
    });
  }

  userlist: any;
  // onchangeBU(id) {
  //   this.userv.getUsersByBUId(id).subscribe((data) => {
  //     this.userlist = data;
  //     //console.log(data);
  //   });
  // }

  getpanel: UserReg[];

  datares: any;
  saveInterviewPanel(f: NgForm) {
    console.log(this.buUser);
    if (f.valid) {
      this.buUser.id = this.id;
      this.userv
        .updatePanelUsers(this.buUser.id, this.buUser.interviewPanelList)
        .subscribe((data) => {
          this.datares = data;
          console.log(this.datares);
          if (this.datares.status == 1) {
            this.alertify.errorMsg(this.datares.message);
          } else {
            this.alertify.updatedMsg('Interview Panel');
            this._router.navigateByUrl('hirepros/interviewer-panel');
          }
        });
      this.clearPanelFields();
      //this.panelList();
    } else {
      this.alertify.errorMsg('Recruiter(s) is Required!');
    }
  }

  clearPanelFields() {
    this.buUser.id = ' ';
    this.buUser.interviewPanelList = ' ';
  }

  BUPanel: any;
  getallBUWithPanel() {
    this.mserv.getAllBUsWithPanel().subscribe((data) => {
      //console.log(data);
      this.BUPanel = data;
    });
  }
}
