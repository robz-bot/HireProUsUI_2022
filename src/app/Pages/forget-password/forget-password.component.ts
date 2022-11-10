import { Router } from '@angular/router';
import { LoginServicesService } from 'src/app/Services/LoginServices/login-services.service';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { forgetPassword } from './../../Models/forgetPassword';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  constructor(
    private alertify: AlertifyService,
    private lserv: LoginServicesService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  loader: number = 0;
  forgetPasswordModel: forgetPassword = new forgetPassword();
  checkEmailResData: any;
  enableGetOTPBtn: boolean = true;
  enableVerifyOTPBtn: boolean = false;
  enableresetNewPass: boolean = false;

  tick1Icon: boolean = false;
  tick2Icon: boolean = false;
  tick3Icon: boolean = false;
  checkEmailAndSendOtp() {
    if (
      this.forgetPasswordModel.email == null ||
      this.forgetPasswordModel.email == undefined ||
      this.forgetPasswordModel.email == ''
    ) {
      this.alertify.errorMsg('Email is Required');
      return;
    }
    this.loader = 1;
    this.lserv
      .checkEmailAndSendOtp(this.forgetPasswordModel.email)
      .subscribe((data) => {
        this.loader = 0;
        console.log(data);
        this.checkEmailResData = data;
        if (this.checkEmailResData.status == 1) {
          this.alertify.errorMsg(this.checkEmailResData.message);
        } else {
          this.alertify.defaultSuccessMsg('OTP Sent Successfully');
          this.enableGetOTPBtn = false;
          this.enableVerifyOTPBtn = true;
          this.enableresetNewPass = false;
          this.tick1Icon = true;
          this.tick2Icon = false;
          this.tick3Icon = false;
        }
      });
  }

  checkOtpResData: any;
  checkOtp() {
    if (
      this.forgetPasswordModel.email == null ||
      this.forgetPasswordModel.email == undefined ||
      this.forgetPasswordModel.email == ''
    ) {
      this.alertify.errorMsg('Email is Required');
      return;
    }
    if (
      this.forgetPasswordModel.otp == null ||
      this.forgetPasswordModel.otp == undefined ||
      this.forgetPasswordModel.otp == ''
    ) {
      this.alertify.errorMsg('OTP is Required');
      return;
    }
    this.loader = 1;
    this.lserv
      .checkOtp(
        this.forgetPasswordModel.email + ',' + this.forgetPasswordModel.otp
      )
      .subscribe((data) => {
        this.loader = 0;
        console.log(data);
        this.checkOtpResData = data;
        if (this.checkOtpResData.status == 1) {
          this.alertify.errorMsg(this.checkOtpResData.message);
        } else {
          this.alertify.defaultSuccessMsg('OTP Verified Successfully');
          this.enableGetOTPBtn = false;
          this.enableVerifyOTPBtn = false;
          this.enableresetNewPass = true;
          this.tick1Icon = true;
          this.tick2Icon = true;
          this.tick3Icon = false;
        }
      });
  }

  resetPasswordResData: any;
  resetPassword() {
    if (
      this.forgetPasswordModel.newPassword == null ||
      this.forgetPasswordModel.newPassword == undefined ||
      this.forgetPasswordModel.newPassword == ''
    ) {
      this.alertify.errorMsg('New Password is Required');
      return;
    }
    if (
      this.forgetPasswordModel.confirmPassword == null ||
      this.forgetPasswordModel.confirmPassword == undefined ||
      this.forgetPasswordModel.confirmPassword == ''
    ) {
      this.alertify.errorMsg('Confirm Password is Required');
      return;
    }
    if (
      this.forgetPasswordModel.newPassword !=
      this.forgetPasswordModel.confirmPassword
    ) {
      this.alertify.errorMsg('New Password & Confirm Password does not match');
      return;
    }
    this.loader = 1;
    this.lserv.resetPassword(this.forgetPasswordModel).subscribe((data) => {
      this.loader = 0;
      console.log(data);
      this.resetPasswordResData = data;
      if (this.resetPasswordResData.status == 1) {
        this.alertify.errorMsg(this.resetPasswordResData.message);
      } else {
        this.alertify.defaultSuccessMsg(
          'Your Password is Reseted Successfully'
        );
        this.loader = 1;
        this.enableGetOTPBtn = false;
        this.enableVerifyOTPBtn = false;
        this.enableresetNewPass = false;
        this.tick1Icon = true;
        this.tick2Icon = true;
        this.tick3Icon = true;
        this.redirectTologin();
      }
    });
  }
  timeout = 3000;
  redirectTologin() {
    setTimeout(() => {
      this._router.navigateByUrl('');
    }, this.timeout);
  }
}
