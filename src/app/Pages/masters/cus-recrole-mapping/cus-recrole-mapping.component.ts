/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { cus_recrole_map } from 'src/app/Models/cus-recrole-map';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import { customer } from 'src/app/Models/Customers';
declare function closeModal(): any;
@Component({
  selector: 'app-cus-recrole-mapping',
  templateUrl: './cus-recrole-mapping.component.html',
  styleUrls: ['./cus-recrole-mapping.component.css'],
})
export class CusRecroleMappingComponent implements OnInit {
  constructor(
    private mserv: MasterserviceService,
    private alertify: AlertifyService
  ) {}
  loader: number = 0;
  loggedInUserId: string;
  ngOnInit(): void {
    this.loggedInUserId = sessionStorage.getItem('currentUserId');

    this.CustomersWithRecRoles();
    this.loadcustomers();
  }

  page = 1;
  count = 0;
  pageSize = 4;
  pageSizes = [4, 8, 16, 24];
  /**
   * Handles page change
   * @param event
   */
  handlePageChange(event): void {
    //this.CustomersWithRecRoles();
    this.page = event;
  }
  /**
   * Handles page size change list
   * @param event
   */
  handlePageSizeChangeList(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }
  customerslist: customer[];
  keyword: string;
  /**
   * Loadcustomers cus recrole mapping component
   */
  loadcustomers() {
    this.keyword = 'customerName';
    this.mserv.getCustomersList().subscribe((data) => {
      this.customerslist = data;
      this.customerslist = this.customerslist.sort((a, b) =>
        a.customerName.localeCompare(b.customerName)
      );
      console.log(this.customerslist);
    });
  }
  customers: cus_recrole_map[];
  /**
   * Customers with rec roles
   */
  CustomersWithRecRoles() {
    this.mserv.getAllCustomersWithRecRoles().subscribe((data) => {
      this.customers = data;
      console.log(this.customers);
    });
  }
  /**
   * Resets cus recrole mapping component
   */
  reset() {
    this.cus.id = undefined;
    this.CustomersWithRecRoles();
  }
  /**
   * Selects event
   * @param item
   */
  selectEvent(item: any) {
    console.log(item);
    this.cus.id = item.id;
  }

  cus: customer = new customer();
  /**
   * Determines whether change customer on
   * @param e
   */
  onChangeCustomer(e) {
    console.log(this.cus.id);
    if (this.cus.id == undefined || this.cus.id == null) {
      this.alertify.errorMsg(' Customer is Required!');
    } else {
      this.mserv
        .getRecRolesByCustomerIdForFilter(this.cus.id)
        .subscribe((data) => {
          this.customers = data;
          this.handlePageChange(1);
          console.log(data);
        });
    }
  }

  editCustomerId: string;
  editCustomerName: string;
  recroleList: any;
  resData: any;
  /**
   * Loads roles by id
   * @param id
   * @param name
   */
  loadRolesById(id, name) {
    console.log(id);
    this.editCustomerId = id;
    this.editCustomerName = name;
    this.mserv.getRecRolesForUpdate(id).subscribe((data) => {
      console.log(data);
      this.resData = data;
      this.recroleList = data.recRoleDtoList;
      console.log(this.resData);
      this.selectedRecRole = [];
      this.getList(this.recroleList);
    });
  }

  /**
   * Gets list
   * @param list
   */
  getList(list) {
    for (var i = 0; i < list.length; i++) {
      console.log(list[i]);
      if (list[i].selected == '1') {
        this.selectedRecRole.push(list[i].id);
      }
    }
  }

  dataRes: any;
  /**
   * Updates cus rec role mapping
   * @param f
   * @returns
   */
  updateCusRecRoleMapping(f: NgForm) {
    console.log(f);
    if (this.selectedRecRole == null) {
      this.alertify.errorMsg('Role is Required!');
      return;
    }
    console.log(this.editCustomerId, this.loggedInUserId);
    this.mserv
      .updateCustomerRecRoleMapping(
        this.editCustomerId,
        this.loggedInUserId,
        this.selectedRecRole
      )
      .subscribe((data) => {
        this.dataRes = data;
        console.log(this.dataRes);
        if (this.dataRes.status == 1) {
          this.alertify.errorMsg(this.dataRes.message);
        } else {
          closeModal();
          this.alertify.updatedMsg('Record');
          this.CustomersWithRecRoles();
        }
      });
  }
  selectedRecRole: Array<string> = [];
  /**
   * Determines whether rec role change on
   * @param e
   * @param id
   */
  onRecRoleChange(e, id) {
    if (e.target.checked) {
      if (!this.selectedRecRole.find((x) => x == id)) {
        this.selectedRecRole.push(id);
      }
    } else {
      if (this.selectedRecRole.find((x) => x == id)) {
        this.selectedRecRole.forEach((value, index) => {
          if (value == id) this.selectedRecRole.splice(index, 1);
          console.log(this.selectedRecRole);
        });
      }
    }
    console.log(this.selectedRecRole);
  }
}
