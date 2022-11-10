import { Component, OnInit } from '@angular/core';
declare function highlightService(): any;
@Component({
  selector: 'app-service-menus',
  templateUrl: './service-menus.component.html',
  styleUrls: ['./service-menus.component.css'],
})
export class ServiceMenusComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    highlightService();
  }
}
