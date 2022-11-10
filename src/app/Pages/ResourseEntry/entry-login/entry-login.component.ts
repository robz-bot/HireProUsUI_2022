/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { EntryLoginServicesService } from 'src/app/Services/EntryLoginService/entry-login-services.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserReg } from 'src/app/Models/UserReg';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
declare function reload(): any;

@Component({
  selector: 'app-login',
  templateUrl: './entry-login.component.html',
  styleUrls: ['./entry-login.component.css'],
})
export class EntryLoginComponent implements OnInit {
  constructor(
    private lserv: EntryLoginServicesService,
    private _router: Router,
    private alertify: AlertifyService
  ) { }

  ngOnInit(): void {
    //this.reload();
    //reload();
  }

  logindata: UserReg = new UserReg();
  datares: any;
  loader = 0;
  /**
   * Loginusers login component
   * @param f
   * @returns
   */
  entryloginuser(f: NgForm) {
    console.log(f);
    if (
      this.logindata.email == '' ||
      this.logindata.email == undefined ||
      this.logindata.email == null
    ) {
      this.alertify.errorMsg('Email is Required');
      return;
    }
    if (
      this.logindata.password == '' ||
      this.logindata.password == undefined ||
      this.logindata.password == null
    ) {
      this.alertify.errorMsg('Password is Required');
      return;
    }
    if (f.form.valid) {
      this.loader = 1;

      this.lserv.LoginUser(this.logindata).subscribe((data) => {
        this.datares = data;
        this.loader = 0;
        if (this.datares.status == 1) {
          this.alertify.errorMsg(this.datares.message);
          return;
        } else {

            console.log(this.datares);
            sessionStorage.setItem('isVendor', '0');
            sessionStorage.setItem('BUName', this.datares.businessUnitName);
            sessionStorage.setItem('BUId', this.datares.businessUnitId);
            sessionStorage.setItem('RoleId', this.datares.roleId);
            sessionStorage.setItem('RoleName', this.datares.roleName);
            sessionStorage.setItem('loginType', "entry");
            sessionStorage.setItem('refId', this.datares.id);

           // console.log(sessionStorage.getItem("BUId"));
            sessionStorage.setItem('designation', this.datares.designation);
          this.lserv.maintainUserSession(this.datares);
          this._router.navigateByUrl('add-entry');
        }
      });
    }
  }
}
