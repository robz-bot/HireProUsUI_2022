import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forgetPassword } from 'src/app/Models/forgetPassword';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { LoggedInVendorServiceService } from 'src/app/Services/LoggedInVendorServices/logged-in-vendor-service.service';

@Component({
  selector: 'app-vendor-forget-password',
  templateUrl: './vendor-forget-password.component.html',
  styleUrls: ['./vendor-forget-password.component.css'],
})
export class VendorForgetPasswordComponent implements OnInit {
  constructor(
    private alertify: AlertifyService,
    private vendorServ: LoggedInVendorServiceService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  loader: number = 0;
  forgetPasswordModel: forgetPassword = new forgetPassword();
  checkvendorIdResData: any;
  enableGetOTPBtn: boolean = true;
  enableVerifyOTPBtn: boolean = false;
  enableresetNewPass: boolean = false;

  tick1Icon: boolean = false;
  tick2Icon: boolean = false;
  tick3Icon: boolean = false;
  checkvendorIdAndSendOtp() {
    if (
      this.forgetPasswordModel.vendorId == null ||
      this.forgetPasswordModel.vendorId == undefined ||
      this.forgetPasswordModel.vendorId == ''
    ) {
      this.alertify.errorMsg('Vendor ID is Required');
      return;
    }
    this.loader = 1;
    this.vendorServ
      .checkVendorIdAndSendOtpVendor(this.forgetPasswordModel.vendorId)
      .subscribe((data) => {
        this.loader = 0;
        console.log(data);
        this.checkvendorIdResData = data;
        if (this.checkvendorIdResData.status == 1) {
          this.alertify.errorMsg(this.checkvendorIdResData.message);
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
      this.forgetPasswordModel.vendorId == null ||
      this.forgetPasswordModel.vendorId == undefined ||
      this.forgetPasswordModel.vendorId == ''
    ) {
      this.alertify.errorMsg('Vendor ID is Required');
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
    this.vendorServ
      .checkOtpVendor(
        this.forgetPasswordModel.vendorId + ',' + this.forgetPasswordModel.otp
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
    this.vendorServ
      .resetPasswordVendor(this.forgetPasswordModel)
      .subscribe((data) => {
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
      this._router.navigateByUrl('/vendorLogin');
    }, this.timeout);
  }
}
