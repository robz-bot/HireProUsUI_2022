/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { suggestion } from './../../Models/suggestion';
import { SuggestionServiceService } from './../../Services/SuggestionServices/suggestion-service.service';
import { Component, OnInit } from '@angular/core';
import { GlobalMenuMappingServicesService } from 'src/app/Services/GlobalMenuMappingServices/global-menu-mapping-services.service';
import { searchSuggestion } from 'src/app/Models/searchSugestion';

@Component({
  selector: 'app-hirepros-feedback',
  templateUrl: './hirepros-feedback.component.html',
  styleUrls: ['./hirepros-feedback.component.css'],
})
export class HireprosFeedbackComponent implements OnInit {
  subMenuName: string;
  constructor(
    private suggestionServ: SuggestionServiceService,
    private alertify: AlertifyService,
    private _gmenu: GlobalMenuMappingServicesService
  ) {}

  loggedInUserId: string;
  ngOnInit(): void {
    this.getAllSuggestions();
    this.getAllSuggestionIds();
    this.subMenuName = sessionStorage.getItem('subMenuNames');

    this.loggedInUserId = sessionStorage.getItem('currentUserId');
  }
  /**
   * Gobacks hirepros feedback component
   */
  goback() {
    this.clearFields();
    this.enableNewIssue = false;
    this.enableTable = true;
    this.enableEditIssue = false;
  }

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

  ////////////////////
  /**
   * Enables sub menu
   * @param mainMenu
   * @returns true if sub menu
   */
  enableSubMenu(mainMenu: string): boolean {
    return this._gmenu.subMenuAccess2(this.subMenuName, mainMenu);
  }
  ///////////////////////
  suggestionFilter: boolean = false;
  /**
   * Shows filter
   */
  showFilter() {
    this.suggestionFilter = true;
  }
  /**
   * Hides filter
   */
  hideFilter() {
    this.clearFields();
    this.suggestionFilter = false;
  }

  seachModel: searchSuggestion = new searchSuggestion();
  /**
   * Searchs suggestion
   * @returns
   */
  SearchSuggestion() {
    console.log(this.seachModel.createdBy);
    if (
      this.seachModel.code == '' &&
      this.seachModel.type == undefined &&
      this.seachModel.sugStatus == undefined
    ) {
      this.alertify.errorMsg('Search by any one filter');
      return;
    }
    this.suggestionServ.searchSuggestion(this.seachModel).subscribe((data) => {
      console.log(data);
      this.suggestionList = data;
      this.suggestionCount = this.suggestionList.length;
    });
  }

  enableNewIssue: boolean = false;
  enableEditIssue: boolean = false;
  enableTable: boolean = true;
  /**
   * Shows suggestion
   */
  showSuggestion() {
    this.enableNewIssue = true;
    this.enableTable = false;
    this.enableEditIssue = false;
  }
  /**
   * Finds details
   * @param data
   * @returns
   */
  findDetails(data) {
    return this.suggestionList.filter((x) => x.id === data.id);
  }

  suggestionList: any;
  suggestionCount: number;
  /**
   * Gets all suggestions
   */
  getAllSuggestions() {
    this.loader = 1;
    this.suggestionServ.getAllSuggestions().subscribe((data) => {
      console.log(data);
      this.suggestionList = data;
      this.loader = 0;
      this.suggestionCount = this.suggestionList.length;
    });
  }

  suggestionIdsList: any;
  /**
   * Gets all suggestion ids
   */
  getAllSuggestionIds() {
    this.loader = 1;
    this.suggestionServ.getAllSuggestionIds().subscribe((data) => {
      console.log(data);
      this.suggestionIdsList = data;
      this.loader = 0;
    });
  }

  newSuggestionModel: suggestion = new suggestion();
  addResultData: any;
  /**
   * Adds suggestion
   * @returns
   */
  addSuggestion() {
    if (this.newSuggestionModel.type == undefined) {
      this.alertify.errorMsg('Type is Required');
      return;
    }
    if (
      this.newSuggestionModel.suggestion == '' ||
      this.newSuggestionModel.suggestion == null ||
      this.newSuggestionModel.suggestion == undefined
    ) {
      this.alertify.errorMsg('Comments is Required');
      return;
    }
    this.newSuggestionModel.createdBy = this.loggedInUserId;
    this.loader = 1;
    this.suggestionServ
      .addSuggestion(this.newSuggestionModel)
      .subscribe((data) => {
        console.log(data);
        this.addResultData = data;
        if (this.addResultData.status == 1) {
          this.alertify.errorMsg(this.addResultData.message);
          this.loader = 0;
        } else {
          this.loader = 0;
          this.alertify.successMsg('Record');
          this.enableNewIssue = false;
          this.enableTable = true;
          this.enableEditIssue = false;
          this.clearFields();
          this.getAllSuggestions();
        }
      });
  }
  /**
   * Clears fields
   */
  clearFields() {
    this.newSuggestionModel.type = undefined;
    this.newSuggestionModel.reply = '';
    this.newSuggestionModel.suggestion = '';
    this.newSuggestionModel.sugStatus = undefined;

    this.seachModel.createdBy = '';
    this.seachModel.type = undefined;
    this.seachModel.sugStatus = undefined;
    this.seachModel.code = '';

    this.getAllSuggestions();
  }
  /**
   * Shows edit suggestion
   * @param id
   */
  showEditSuggestion(id: string) {
    this.enableNewIssue = false;
    this.enableEditIssue = true;
    this.enableTable = false;

    this.getSuggestionById(id);
  }

  updatedId: string;
  toUpdateSuggestion: suggestion = new suggestion();
  /**
   * Gets suggestion by id
   * @param id
   */
  getSuggestionById(id: string) {
    this.updatedId = id;

    this.suggestionServ.getSuggestion(id).subscribe((data) => {
      console.log(data);
      this.toUpdateSuggestion = data;
    });
  }

  updateResultData: any;
  /**
   * Updates suggestion
   * @returns
   */
  updateSuggestion() {
    if (
      this.toUpdateSuggestion.sugStatus == '' ||
      this.toUpdateSuggestion.sugStatus == null ||
      this.toUpdateSuggestion.sugStatus == undefined
    ) {
      this.alertify.errorMsg('Status is Required');
      return;
    }
    if (
      this.toUpdateSuggestion.reply == '' ||
      this.toUpdateSuggestion.reply == null ||
      this.toUpdateSuggestion.reply == undefined
    ) {
      this.alertify.errorMsg('Admin Comments is Required');
      return;
    }
    this.toUpdateSuggestion.updatedBy = this.loggedInUserId;
    this.toUpdateSuggestion.createdBy = this.toUpdateSuggestion.createdBy;
    this.loader = 1;
    this.suggestionServ
      .updateSuggestion(this.toUpdateSuggestion)
      .subscribe((data) => {
        console.log(data);
        this.updateResultData = data;
        if (this.updateResultData.status == 1) {
          this.alertify.errorMsg(this.updateResultData.message);
          this.loader = 0;
        } else {
          this.loader = 0;
          this.alertify.successMsg('Record');
          this.enableNewIssue = false;
          this.enableTable = true;
          this.enableEditIssue = false;
          this.clearFields();
          this.getAllSuggestions();
        }
      });
  }
}
