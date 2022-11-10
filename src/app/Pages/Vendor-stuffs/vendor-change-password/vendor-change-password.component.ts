import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { vendor } from 'src/app/Models/vendor';
import { vendorReg } from 'src/app/Models/Vendor Models/vendorReg';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { LoggedInVendorServiceService } from 'src/app/Services/LoggedInVendorServices/logged-in-vendor-service.service';

@Component({
  selector: 'app-vendor-change-password',
  templateUrl: './vendor-change-password.component.html',
  styleUrls: ['./vendor-change-password.component.css'],
})
export class VendorChangePasswordComponent implements OnInit {
  constructor(
    private alertify: AlertifyService,
    private loggedVendorService: LoggedInVendorServiceService,
    private _router: Router
  ) {}
  cVendorId: string;
  loader: number = 0;
  resData: any;
  ngOnInit(): void {
    this.cVendorId = sessionStorage.getItem('currentVendorId');
  }

  vendor: vendorReg = new vendorReg();
  Msg: string;
  resetPass(f: NgForm) {
    console.log(f);

    if (f.valid) {
      if (this.vendor.newPassword == this.vendor.cpass) {
        this.loader = 1;
        this.vendor.id = this.cVendorId;
        this.loggedVendorService
          .changePasswordVendor(this.vendor)
          .subscribe((data) => {
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

  gotoLogin() {
    sessionStorage.clear();
    this._router.navigateByUrl('/vendorLogin');
  }
  goback() {
    history.back();
  }
}
