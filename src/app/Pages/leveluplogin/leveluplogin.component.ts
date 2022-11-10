/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { LevelupserviceService } from 'src/app/Services/levelupservices/levelupservice.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserReg } from 'src/app/Models/UserReg';
import { Router } from '@angular/router';
//import { AuthService } from '../services/auth.service';

//declare function reload(): any;

@Component({
  selector: 'app-leveluplogin',
  templateUrl: './leveluplogin.component.html',
  styleUrls: ['./leveluplogin.component.css'],
})
export class LeveluploginComponent implements OnInit {
  constructor(
    private lserv: LevelupserviceService,
    private _router: Router,
    private alertify: AlertifyService // private authService: AuthService
  ) {}

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
  loginuser(f: NgForm) {
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
          //  if(this.datares.roleId == 3 ||
          //     this.datares.roleId == 4 ||
          //    this.datares.roleId == 6 ||
          //    this.datares.roleId == 7 ){
         if (
            this.datares.roleId == 26 ||
           this.datares.roleId == 29 ||
           this.datares.roleId == 31 ||
           this.datares.roleId == 33
         ) {
            this._router.navigateByUrl('add-entry');
            console.log(this.datares.roleId);
            console.log(this.datares);
            
            
            sessionStorage.setItem('RoleId', this.datares.roleId);
            sessionStorage.setItem('RoleName', this.datares.roleName);
            sessionStorage.setItem('refId', this.datares.id);
            sessionStorage.setItem('isVendor', '0');
            sessionStorage.setItem('BUId', this.datares.businessUnitId);
            sessionStorage.setItem('BUName', this.datares.businessUnitName);
            sessionStorage.setItem('designation', this.datares.designation);
            sessionStorage.setItem('userName', this.datares.email);
            console.log(this.datares.email);
            sessionStorage.setItem('loginType', 'rating');
            
          } else {
            this.alertify.errorMsg('Access Denied');
          }
          this.lserv.maintainUserSession(this.datares);
        }
      });
    }
  }
}
