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
import { BusinessUnit } from 'src/app/Models/BusinessUnit';
import { Roles } from 'src/app/Models/Roles';
import { UserReg } from 'src/app/Models/UserReg';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import { UserRegServicesService } from 'src/app/Services/UserRegServices/user-reg-services.service';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { profile } from 'src/app/Services/GlobalConstants';
import { GlobalMenuMappingServicesService } from 'src/app/Services/GlobalMenuMappingServices/global-menu-mapping-services.service';
declare function highlightService(): any;

@Component({
  selector: 'app-update-user-reg',
  templateUrl: './update-user-reg.component.html',
  styleUrls: ['./update-user-reg.component.css'],
})
export class UpdateUserRegComponent implements OnInit {
  subMenuName: string;
  constructor(
    private aroute: ActivatedRoute,
    private _router: Router,
    private userServ: UserRegServicesService,
    private mserv: MasterserviceService,
    private alertify: AlertifyService,
    private _gmenu: GlobalMenuMappingServicesService
  ) {}
  id: string;
  currentUserId: any;
  userReg: UserReg = new UserReg();
  ngOnInit(): void {
    highlightService();

    this.loadbu();
    this.loadrole();
    this.subMenuName = sessionStorage.getItem('subMenuNames');
    this.currentUserId = sessionStorage.getItem('currentUserId');
    this.id = this.aroute.snapshot.params['id'];
    this.userServ.getUserById(this.id).subscribe(
      (data) => {
        this.userReg = data;
        console.log(this.userReg);
        this.userReg.managerId = data.managerId;
        this.changedManagerName = data.managerName;
        //added on 10/14/2021
        if (this.userReg.active == null) {
          this.userReg.active = undefined;
        }
      },
      (error) => console.log(error)
    );
  }

  ///////////////////
  enableDeleteIcon(mainMenu: string): boolean {
    //return this._gmenu.subMenuAccess(icon);
    return this._gmenu.mainMenuAccess2(this.subMenuName, mainMenu);
  }
  ///////////////////////

  //Load Dropdown Values
  bulist: BusinessUnit[];
  loadbu() {
    this.mserv.getBUList().subscribe((data) => {
      this.bulist = data;
      this.bulist = this.bulist.sort((a, b) =>
        a.businessUnitName.localeCompare(b.businessUnitName)
      );
    });
  }
  rolelist: Roles[];
  loadrole() {
    this.mserv.getRolesList().subscribe((data) => {
      this.rolelist = data;
      this.rolelist = this.rolelist.sort((a, b) =>
        a.roleName.localeCompare(b.roleName)
      );
    });
  }
  loader: number = 0;
  dataRes: any;
  isPanelMember(roleid): string {
    var condition = '0';
    this.rolelist.forEach((element) => {
      //console.log(element.roleName);
      if (element.id == roleid && element.roleName == 'Interviewer') {
        console.log(element.roleName);
        condition = '1';
      }
    });
    return condition;
  }
  updateUserReg(f: NgForm) {
    //consolelog(f.form.value);
    if (this.userReg.contactNumber.length < 10) {
      this.alertify.errorMsg('Contact Number should be atleast 10 digits...');
      return;
    }
    if (f.form.valid) {
      this.loader = 1;
      this.userReg.createdBy = this.currentUserId;
      this.userReg.updatedBy = this.currentUserId;
      this.userReg.firstName = this.userReg.firstName.trim();
      this.userReg.lastName = this.userReg.lastName.trim();
      this.userReg.managerId = this.userReg.managerId;
      this.userReg.panelMember = this.isPanelMember(
        this.userReg.roleId
      ).toString();
      console.log('panel Member ' + this.userReg.panelMember);
      this.userServ.updateUser(this.userReg).subscribe((data) => {
        console.log('Data:' + data);
        this.dataRes = data;
        this.loader = 0;
        if (this.dataRes.status == 0) {
          this._router.navigateByUrl('hirepros/user-reg');
          this.loader = 0;
          this.alertify.updatedMsg('User');
        } else {
          this.loader = 0;
          this.alertify.errorMsg(this.dataRes.message);
        }
      });
    }
  }
  gotoback() {
    history.back();
  }
  onlyNumber(event) {
    var inputValue = event.charCode;
    if (!(inputValue >= 33 && inputValue <= 57)) {
      event.preventDefault();
    }
  }
  changedManagerName: any;
  chanagedManagerId:any;
  onchangeBu(buId){
    this.loader = 1;
    this.mserv.getBUById(buId).subscribe((data) => {
      this.loader = 0;
      this.userReg.managerId = data.managerId;
      this.changedManagerName = data.managerName;
      console.log(this.changedManagerName)   
    });
  }
}
