/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { Component, OnInit } from '@angular/core';
import { GlobalMenuMappingServicesService } from 'src/app/Services/GlobalMenuMappingServices/global-menu-mapping-services.service';
declare function highlightRecruitment();

@Component({
  selector: 'app-recruitment-menus',
  templateUrl: './recruitment-menus.component.html',
  styleUrls: ['./recruitment-menus.component.css'],
})
export class RecruitmentMenusComponent implements OnInit {
  subMenuName: string;
  mainMenuName: string;
  isVendor: string;
  currentUserId: string;
  constructor(private _gmenu: GlobalMenuMappingServicesService) {}

  ngOnInit(): void {
    highlightRecruitment();
    this.isVendor = sessionStorage.getItem('isVendor');
    if (this.isVendor == '0') {
      this.mainMenuName = sessionStorage.getItem('mainMenuNames');
      this.subMenuName = sessionStorage.getItem('subMenuNames');


    }
      this.currentUserId = sessionStorage.getItem('currentUserId');
    
  }
  ////////////////////
  mainMenuArr: Array<string> = [];
  subMenuArr: Array<string> = [];

  mainMenuAccess(mainMenu: string): boolean {
    return this._gmenu.mainMenuAccess2(this.mainMenuName, mainMenu);
  }

  subMenuAccess(subMenu: string): boolean {
    return this._gmenu.subMenuAccess2(this.subMenuName, subMenu);
  }
  ///////////////////////
}
