/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { Router } from '@angular/router';
import { LoginServicesService } from './../../../Services/LoginServices/login-services.service';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserReg } from 'src/app/Models/UserReg';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css'],
})
export class ChangePassComponent implements OnInit {
  constructor(
    private alertify: AlertifyService,
    private lserv: LoginServicesService,
    private _router: Router
  ) {}
  UserId: string;
  loader: number = 0;
  ngOnInit(): void {
    this.UserId = sessionStorage.getItem('currentUserId');
  }

  user: UserReg = new UserReg();
  Msg: string;
  resetPass(f: NgForm) {
    console.log(f);

    if (f.valid) {
      if (this.user.newPassword == this.user.cpass) {
        this.loader = 1;
        this.user.id = this.UserId;
        this.lserv.ChangePass(this.user).subscribe((data) => {
          console.log(data);
          this.loader = 0;
          this.resData = data;

          if (this.resData.status == 1) {
            this.alertify.errorMsg(this.resData.message);
          } else {
            this.alertify.updatedMsg('Password');
            this.gotoLogin();
          }
        });
      } else {
        this.alertify.errorMsg(
          'New Password and Confirm Password does not match!'
        );
      }
    }
  }

  resData: any;
  // savePass(user): string {
  //   this.user.id = this.UserId;
  //   this.lserv.ChangePass(user).subscribe((data) => {
  //     console.log(data);
  //     this.resData = data;

  //     this.loader = 0;
  //   });
  //   if (this.resData.status == 1) {
  //     return this.resData.message;
  //   } else {
  //     return this.resData.message;
  //   }
  // }

  gotoLogin() {
    this.lserv.clearUserSession();
    this._router.navigateByUrl('');
  }
  goback() {
    history.back();
  }
}
