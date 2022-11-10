/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessUnit } from 'src/app/Models/BusinessUnit';
import { employeeDetails } from 'src/app/Models/EmployeeDetails';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import { ResourceMgntServiceService } from 'src/app/Services/ResourceMgntServices/resource-mgnt-service.service';

@Component({
  selector: 'app-add-bench-candidate-list',
  templateUrl: './add-bench-candidate-list.component.html',
  styleUrls: ['./add-bench-candidate-list.component.css'],
})
export class AddBenchCandidateListComponent implements OnInit {
  constructor(
    private rmserv: ResourceMgntServiceService,
    private mserv: MasterserviceService,

    private alertify: AlertifyService,
    private _router: Router,
    private aroute: ActivatedRoute
  ) {}

  CurrentJRNumber: string;
  ngOnInit(): void {
    this.getAllResourceMgmts();
    this.loadBu();
    this.CurrentJRNumber = this.aroute.snapshot.params['id'];
  }

  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15, 20];
  index = 0;

  /**
   * Handles page change
   * @param event
   */
  handlePageChange(event): void {
    console.log(event);
    this.page = event;
    //this.index = (event - 1) * this.pageSize + 1;
  }

  /**
   * Handles page size change
   * @param event
   */
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }

  bulist: BusinessUnit[];
  /**
   * Loads bu
   */
  loadBu() {
    this.mserv.getBUList().subscribe((data) => {
      this.bulist = data;
      this.bulist = this.bulist.sort((a, b) =>
        a.businessUnitName.localeCompare(b.businessUnitName)
      );
    });
  }

  searchModel: employeeDetails = new employeeDetails();
  /**
   * Searchs by bu
   * @returns
   */
  searchByBU() {
    if (this.searchModel.buId == undefined) {
      this.alertify.errorMsg('Business Unit Required');
      return;
    }
    this.rmserv
      .getBenchResourcesByBuId(this.searchModel.buId)
      .subscribe((data) => {
        console.log(data);
        this.allResources = data;
        this.allResourcesCount = this.allResources.length;
      });
  }

  /**
   * Resets search Model
   */
  resetSearch() {
    this.searchModel.buId = undefined;
    this.getAllResourceMgmts();
  }

  allResources: any;
  allResourcesCount: number;
  /**
   * Gets all resource mgmts
   */
  getAllResourceMgmts() {
    this.rmserv.getBenchResources().subscribe((data) => {
      console.log(data);
      this.allResources = data;
      this.allResourcesCount = this.allResources.length;
    });
  }

  /**
   * Finds details
   * @param data  from table
   * @returns
   */
  findDetails(data) {
    return this.allResources.filter((x) => x.id === data.id);
  }

  /**
   * Goto add bench candidate
   * @param id
   */
  gotoAddBenchCandidate(id) {
    this._router.navigate([
      'hirepros/add-bench-candidate',
      this.CurrentJRNumber,
      id,
    ]);
  }
}
