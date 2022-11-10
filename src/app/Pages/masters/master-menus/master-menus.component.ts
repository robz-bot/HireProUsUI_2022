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
declare function highlightMasters(): any;
@Component({
  selector: 'app-master-menus',
  templateUrl: './master-menus.component.html',
  styleUrls: ['./master-menus.component.css'],
})
export class MasterMenusComponent implements OnInit {
  subMenuName: string;
  mainMenuName: string;
  constructor(private _gmenu: GlobalMenuMappingServicesService) {}

  ngOnInit(): void {
    this.subMenuName = sessionStorage.getItem('subMenuNames');
    this.mainMenuName = sessionStorage.getItem('mainMenuNames');

    highlightMasters();
  }
  ////////////////////
  mainMenuArr: Array<string> = [];
  subMenuArr: Array<string> = [];
  /**
   * Mains menu access
   * @param mainMenu
   * @returns true if menu access
   */
  mainMenuAccess(mainMenu: string): boolean {
    return this._gmenu.mainMenuAccess2(this.mainMenuName, mainMenu);
  }
  /**
   * Subs menu access
   * @param subMenu
   * @returns true if menu access
   */
  subMenuAccess(subMenu: string): boolean {
    return this._gmenu.subMenuAccess2(this.subMenuName, subMenu);
  }
  ///////////////////////
}
