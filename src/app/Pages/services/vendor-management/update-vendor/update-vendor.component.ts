import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { vendor } from 'src/app/Models/vendor';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { VendorServiceService } from 'src/app/Services/VendorServices/vendor-service.service';

@Component({
  selector: 'app-update-vendor',
  templateUrl: './update-vendor.component.html',
  styleUrls: ['./update-vendor.component.css'],
})
export class UpdateVendorComponent implements OnInit {
  loader: number = 0;
  id: any;

  constructor(
    private vserv: VendorServiceService,
    private alertify: AlertifyService,
    private aroute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.aroute.snapshot.params['id'];
    this.vserv.getVendor(this.id).subscribe(
      (data) => {
        this.updateVendor = data;
        console.log(this.updateVendor);
        //added on 10/14/2021
        // if (this.userReg.active == null) {
        //   this.userReg.active = undefined;
        // }
      },
      (error) => console.log(error)
    );
  }

  Emails: any[];
  /**
   * Validates emails
   * @param emails
   * @returns true if emails
   */
  validateEmails(emails: string): boolean {
    var valid_email = true;

    if (emails == undefined) {
      return valid_email;
    }
    this.Emails = emails.split(',');
    if (this.Emails.length > 0) {
      for (let e of this.Emails) {
        if (!this.validateEmail(e)) {
          this.alertify.errorMsg(e + ' Incorrect email format');
          valid_email = false;
        }
        //this.valid_email = true;
      }
    }
    return valid_email;
  }

  /**
   * Validates email
   * @param email
   * @returns true if email
   */
  validateEmail(email): boolean {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g;
    return emailRegex.test(String(email.toLowerCase()));
  }

  updateVendor: vendor = new vendor();
  updateVendorResData: any;
  /**
   * added on 10/20/2021
   * Adds new vendor
   * @param updateVendorForm
   * @returns new vendor
   */
  updateExsitingVendor(updateVendorForm: NgForm): void {
    console.log(updateVendorForm);


    if (this.updateVendor.contactNumber.length < 10) {
      this.alertify.errorMsg(
        'Contact Number should be atleast 10 digits...'
      );
      return;
    }

    if (!this.validateEmail(this.updateVendor.email)) {
      this.alertify.errorMsg('Email is Invalid!');
      return;
    }

    //If cc mail ids is != empty then it checks for email validation or else go for update vendor
    if (this.updateVendor.ccEmailIds != '') {
      if (this.validateEmails(this.updateVendor.ccEmailIds)) {
        this.loader = 1;
        this.vserv.updateVendor(this.updateVendor).subscribe((data) => {
          this.updateVendorResData = data;
          if (this.updateVendorResData.status == 0) {
            this.loader = 0;
            this.alertify.updatedMsg(' Vendor');
            updateVendorForm.resetForm();
            this._router.navigateByUrl('hirepros/vendor-management');
          } else {
            this.loader = 0;
            this.alertify.errorMsg(this.updateVendorResData.message);
          }
        });
      }
    } else {
      this.loader = 1;
      this.vserv.updateVendor(this.updateVendor).subscribe((data) => {
        this.updateVendorResData = data;
        if (this.updateVendorResData.status == 0) {
          this.loader = 0;
          this.alertify.updatedMsg(' Vendor');
          updateVendorForm.resetForm();
          this._router.navigateByUrl('hirepros/vendor-management');
        } else {
          this.loader = 0;
          this.alertify.errorMsg(this.updateVendorResData.message);
        }
      });
    }
  }

  goBack() {
    history.back();
  }
  /**
   * Onlys number
   * @param event
   */
  onlyNumber(event) {
    var inputValue = event.charCode;
    if (!(inputValue >= 33 && inputValue <= 57)) {
      event.preventDefault();
    }
  }
}
