import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalMenuMappingServicesService {
  constructor() {}

  mainMenuName: string = sessionStorage.getItem('mainMenuNames');
  subMenuName: string = sessionStorage.getItem('subMenuNames');
  mainMenuArr: Array<string> = this.mainMenuName.split(',');
  subMenuArr: Array<string> = this.subMenuName.split(',');

  mainMenuAccess(mainMenu: string) {
    var isMainMenu = false;

    if (
      this.mainMenuArr.find((x) => x.trim() == mainMenu || x.trim() == 'All')
    ) {
      isMainMenu = true;
    }
    return isMainMenu;
  }
  mainMenuAccess2(mainMenusName: string, mainMenu: string) {
    var isMainMenu = false;
    this.mainMenuArr = mainMenusName.split(',');
    if (
      this.mainMenuArr.find((x) => x.trim() == mainMenu || x.trim() == 'All')
    ) {
      isMainMenu = true;
    }
    return isMainMenu;
  }
  subMenuAccess(subMenu: string) {
    var isSubMenu = false;

    if (this.subMenuArr.find((x) => x.trim() == subMenu || x.trim() == 'All')) {
      isSubMenu = true;
    }
    return isSubMenu;
  }
  subMenuAccess2(subMenusName: string, subMenu: string) {
    var isSubMenu = false;

    this.subMenuArr = subMenusName.split(',');

    if (this.subMenuArr.find((x) => x.trim() == subMenu || x.trim() == 'All')) {
      isSubMenu = true;
    }
    return isSubMenu;
  }
}
