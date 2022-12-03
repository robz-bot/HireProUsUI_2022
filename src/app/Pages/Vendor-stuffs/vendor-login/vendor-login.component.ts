import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { vendorReg } from 'src/app/Models/Vendor Models/vendorReg';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { LoggedInVendorServiceService } from 'src/app/Services/LoggedInVendorServices/logged-in-vendor-service.service';

@Component({
  selector: 'app-vendor-login',
  templateUrl: './vendor-login.component.html',
  styleUrls: ['./vendor-login.component.css'],
})
export class VendorLoginComponent implements OnInit {
  loader: number = 0;
  constructor(
    private vendorServ: LoggedInVendorServiceService,
    private _router: Router,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {}
  logindata: vendorReg = new vendorReg();
  loginDataRes: any;
  loginuser(f: NgForm) {
    console.log(this.logindata.vendorId);
    if (
      this.logindata.vendorId == '' ||
      this.logindata.vendorId == undefined ||
      this.logindata.vendorId == null
    ) {
      this.alertify.errorMsg('Vendor ID is Required');
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
      this.vendorServ.loginVendor(this.logindata).subscribe((data) => {
        this.loginDataRes = data;
        this.loader = 0;
        console.log(data);
        if (this.loginDataRes.status == 1) {
          this.alertify.errorMsg(this.loginDataRes.message);
          return;
        } else {
          this._router.navigateByUrl('hirepros/vendor-dashboard');

          sessionStorage.setItem('currentVendorId', this.loginDataRes.id);
          sessionStorage.setItem('isVendor', this.loginDataRes.isVendor);
          sessionStorage.setItem(
            'vendorPriority',
            this.loginDataRes.vendorPriority
          );
          sessionStorage.setItem(
            'currentVendor',
            this.loginDataRes.vendorName + ' - ' + this.loginDataRes.vendorId
          );
          sessionStorage.setItem('mainMenuNames', '');
          sessionStorage.setItem('subMenuNames', '');
        }
      });
    }
  }
}
