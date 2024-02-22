import { Component, OnInit } from '@angular/core';
declare function highlightProjectManagement(): any;

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css']
})
export class ProjectManagementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    highlightProjectManagement();
  }

}
