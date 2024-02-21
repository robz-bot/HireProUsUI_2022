import { Component, OnInit } from '@angular/core';
import { GlobalMenuMappingServicesService } from 'src/app/Services/GlobalMenuMappingServices/global-menu-mapping-services.service';
declare function highlightService(): any;
@Component({
  selector: 'app-service-menus',
  templateUrl: './service-menus.component.html',
  styleUrls: ['./service-menus.component.css'],
})
export class ServiceMenusComponent implements OnInit {
  constructor(private _gmenu: GlobalMenuMappingServicesService) {}
  mainMenuName: string;
  subMenuName: string;
  isVendor: string;

  ngOnInit(): void {
    highlightService();
    this.isVendor = sessionStorage.getItem('isVendor');
    if (this.isVendor == '0') {
      this.mainMenuName = sessionStorage.getItem('mainMenuNames');
      this.subMenuName = sessionStorage.getItem('subMenuNames');
    }
  }

  /**
   * Subs menu access
   * @param subMenu
   * @returns true if menu access
   */
  subMenuAccess(subMenu: string): boolean {
    // return this._gmenu.subMenuAccess(subMenu);
    if (subMenu.length > 0) {
      return this._gmenu.subMenuAccess2(this.subMenuName, subMenu);
    } else {
      return false;
    }
  }
}
