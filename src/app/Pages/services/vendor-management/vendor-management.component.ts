import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { vendor } from 'src/app/Models/vendor';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { VendorServiceService } from 'src/app/Services/VendorServices/vendor-service.service';
declare function closeFilter(): any;
@Component({
  selector: 'app-vendor-management',
  templateUrl: './vendor-management.component.html',
  styleUrls: ['./vendor-management.component.css'],
})
export class VendorManagementComponent implements OnInit {
  loader: number = 0;
  constructor(
    private vserv: VendorServiceService,
    private alertify: AlertifyService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getAllVendors();
    this.getAllVendorsIds();
  }

  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15, 20];
  /**
   * Handles page change
   * @param event
   */
  handlePageChange(event): void {
    this.page = event;
  }
  /**
   * Handles page size change
   * @param value
   */
  handlePageSizeChange(value): void {
    //this.pageSize = event.target.value;
    this.pageSize = value;
    this.page = 1;
  }

  showAddVendor: boolean = false;
  showListVendor: boolean = true;
  /**
   * News vendor tab
   */
  newVendorTab() {
    this.showAddVendor = true;
    this.showListVendor = false;
  }
  /**
   * Cancels vendor management component
   * @param addForm
   */
  cancel(addForm: NgForm) {
    this.resetForm(addForm);
    this.showAddVendor = false;
    this.showListVendor = true;
  }
  /**
   * Resets form
   * @param anyForm
   */
  resetForm(anyForm: NgForm) {
    anyForm.resetForm();
  }

  vendorList: any;
  vendorListCount: number;
  /**
   * Gets all vendors
   */
  getAllVendors(): void {
    this.vserv.getAllVendors().subscribe((data) => {
      console.log(data);
      this.vendorList = data;
      this.vendorListCount = this.vendorList.length;
    });
  }

  vendorIdsList: string[];
  /**
   * Gets all vendors ids
   */
  getAllVendorsIds(): void {
    this.vserv.getAllVendorIds().subscribe((data) => {
      console.log(data);
      this.vendorIdsList = data;
    });
  }

  /**
   * Finds details
   * @param data
   * @returns
   */
  findDetails(data) {
    return this.vendorList.filter((x) => x.id === data.id);
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
          this.alertify.errorMsg(e + ' Incorrect CC email format');
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

  addVendor: vendor = new vendor();
  addVendorResData: any;
  /**
   * added on 10/20/2021
   * Adds new vendor
   * @param addVendorForm
   * @returns new vendor
   */
  addNewVendor(addVendorForm: NgForm): void {
    console.log(addVendorForm);

    if (this.addVendor.contactNumber.length < 10) {
      this.alertify.errorMsg('Contact Number should be atleast 10 digits...');
      return;
    }

    if (!this.validateEmail(this.addVendor.email)) {
      this.alertify.errorMsg('Email is Invalid!');
      return;
    }

    if (this.validateEmails(this.addVendor.ccEmailIds)) {
      this.loader = 1;
      this.vserv.addVendor(this.addVendor).subscribe((data) => {
        console.log(data);
        this.addVendorResData = data;
        if (this.addVendorResData.status == 0) {
          this.loader = 0;
          this.alertify.successMsg('New Vendor');
          this.cancel(addVendorForm);
          this.getAllVendors();
        } else {
          this.loader = 0;
          this.alertify.errorMsg(this.addVendorResData.message);
        }
      });
    }
  }

  searchModal: vendor = new vendor();
  restBtn: boolean = false;
  /**
   * Searchs vendor adv
   * @returns  advanced search list
   */
  searchVendorAdv(): void {
    if (
      (this.searchModal.vendorName == '' ||
        this.searchModal.vendorName == undefined) &&
      this.searchModal.vendorId == undefined &&
      (this.searchModal.location == '' ||
        this.searchModal.location == undefined) &&
      (this.searchModal.vendorPriority == '' ||
        this.searchModal.vendorPriority == undefined)
    ) {
      this.restBtn = true;
      this.alertify.errorMsg('Select any one Criteria');
      return;
    }

    this.vserv.searchVendor(this.searchModal).subscribe((data) => {
      console.log(data);
      this.restBtn = true;
      closeFilter();

      this.vendorList = data;
      this.vendorListCount = this.vendorList.length;
      this.handlePageChange(1);
    });
  }
  /**
   * Searchs vendor
   * @returns vendor
   */
  searchVendor(): void {
    if (
      this.searchModal.vendorNameSearch == '' ||
      this.searchModal.vendorNameSearch == undefined
    ) {
      this.restBtn = true;
      this.alertify.errorMsg('Vendor Name is Required');
      return;
    }
    this.searchModal.vendorName = this.searchModal.vendorNameSearch;
    this.vserv.searchVendor(this.searchModal).subscribe((data) => {
      console.log(data);
      this.restBtn = true;
      closeFilter();
      this.vendorList = data;
      this.vendorListCount = this.vendorList.length;
      this.handlePageChange(1);
    });
  }
  /**
   * Clears search modal
   */
  clearSearchModal(): void {
    this.searchModal.contactName = '';
    this.searchModal.vendorId = undefined;
    this.searchModal.location = '';
    this.searchModal.vendorNameSearch = '';
    this.searchModal.vendorName = '';
    this.searchModal.vendorPriority = undefined;

    this.restBtn = false;
    this.getAllVendors();
  }
  /**
   * Updates vendor
   * @param vendorId
   */
  updateVendor(vendorId: string): void {
    this._router.navigate(['hirepros/update-vendor', vendorId]);
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

  deleteData: any;
  /**
   * Deletes vendor
   * @param id
   * @param vendorName
   */
  deleteVendor(id: string, vendorName: string) {
    this.loader = 1;
    console.log(id);
    this.vserv.deleteVendorById(id).subscribe((data) => {
      this.loader = 0;
      this.deleteData = data;
      if (this.deleteData.status == 1) {
        this.alertify.errorMsg(this.deleteData.message);
      } else {
        console.log(data);
        this.alertify.deleteMsg(`Vendor -"${vendorName}" is `);
        this.getAllVendors();
      }
    });
  }
}
