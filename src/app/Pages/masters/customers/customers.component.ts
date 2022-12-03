/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { AlertifyService } from './../../../Services/AlertifyService/alertify.service';
import { NgForm } from '@angular/forms';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import { Component, OnInit } from '@angular/core';
import { customer } from 'src/app/Models/Customers';
declare function closeModal(): any;
declare function highlightMasters(): any;
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  constructor(
    private mserv: MasterserviceService,
    private alertify: AlertifyService
  ) {}

  loggedInUserId: any;
  loader: number = 0;

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
   * @param event
   */
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }
  ngOnInit(): void {
    highlightMasters();

    this.loadCustomer();
    this.loggedInUserId = sessionStorage.getItem('currentUserId');
  }
  cusList: customer[];
  /**
   * Loads customer
   */
  loadCustomer() {
    this.loader = 1;
    this.customer.keyword = '';
    this.mserv.getCustomersList().subscribe((data) => {
      this.cusList = data;
      this.loader = 0;
      //console.log(this.cusList);
    });
  }
  /**
   * Searchs customer
   * @param f
   * @returns
   */
  searchCustomer(f: NgForm) {
    //console.log(this.customer.keyword);
    if (
      this.customer.keyword == null ||
      this.customer.keyword == '' ||
      this.customer.keyword == undefined
    ) {
      this.alertify.errorMsg('Customer Name is Required!');
      return;
    }
    if (f.form.valid) {
      this.loader = 1;
      this.mserv
        .searchCustomerByKey(this.customer.keyword)
        .subscribe((data) => {
          this.cusList = data;
          this.loader = 0;
          this.handlePageChange(1);
          //console.log(data);
        });
    }
  }

  customer: customer = new customer();
  datares: any;
  /**
   * Adds new customer
   * @param f
   */
  addNewCustomer(f: NgForm) {
    if (f.form.valid) {
      this.loader = 1;
      this.customer.customerName = this.customer.customerName.trim();
      this.customer.location = this.customer.location.trim();
      this.customer.region = this.customer.region.trim();
      this.customer.createdBy = this.loggedInUserId;
      this.customer.updatedBy = this.loggedInUserId;
      this.mserv.newCustomer(this.customer).subscribe((data) => {
        //console.log(data);
        this.datares = data;
        this.loader = 0;
        if (this.datares.status == 1) {
          this.alertify.errorMsg(this.datares.message);
        } else {
          this.alertify.successMsg('Record');
          this.loadCustomer();
          closeModal();

          this.clearCustomerField();
        }
      });
    }
  }
  /**
   * Clears customer field
   */
  clearCustomerField() {
    this.customer.customerName = ' ';
    this.customer.customerShortName = '';
    this.customer.location = ' ';
    this.customer.region = ' ';
  }

  updateid: string;
  /**
   * Gets id
   * @param id
   */
  getId(id) {
    this.loader = 1;
    //console.log(id);
    this.updateid = id;
    this.mserv.getCustomerById(id).subscribe((data) => {
      this.customer = data;
      this.loader = 0;
      //console.log(data);
    });
  }

  apiRes: any;
  /**
   * Updates customer
   * @param uf
   */
  updateCustomer(uf: NgForm) {
    if (uf.form.valid) {
      if (this.customer.id == this.updateid) {
        this.loader = 1;
        this.customer.updatedBy = this.loggedInUserId;
        this.customer.customerName = this.customer.customerName.trim();
        this.customer.location = this.customer.location.trim();
        this.customer.region = this.customer.region.trim();
        //console.log(this.customer);
        this.mserv.updateCustomer(this.customer).subscribe((data) => {
          this.apiRes = data;
          this.loader = 0;
          if (this.apiRes.status == 1) {
            this.alertify.errorMsg(this.apiRes.message);
          } else {
            closeModal();
            uf.resetForm(); //added on 10/9/2021
            this.alertify.updatedMsg('Record');
            this.loadCustomer();
          }
        });
      }
    }
    this.loadCustomer();
  }

  deleteData:any
  /**
   * Deletes customer
   * @param id
   * @param customerName
   */
  deleteCustomer(id, customerName) {
    this.loader = 1;
    //console.log(id);
    this.mserv.deleteCustomer(id).subscribe((data) => {
      this.loader = 0;
      this.deleteData = data;
      if (this.deleteData.status == 1) {
        this.alertify.errorMsg(this.deleteData.message);
      } else {
        console.log(this.deleteData);
        this.alertify.deleteMsg(customerName);
        this.loadCustomer();
      }
    });
  }

  // Textbox validating Functions
  /**
   * Onlys alpha space
   * @param event
   */
  onlyAlphaSpace(event) {
    var inputValue = event.charCode;
    if (
      !(inputValue >= 65 && inputValue <= 90) &&
      !(inputValue >= 97 && inputValue <= 122) &&
      inputValue != 32 &&
      inputValue != 0
    ) {
      event.preventDefault();
    }
  }
  resetForm(f: NgForm) {
    f.resetForm();
  }
}
