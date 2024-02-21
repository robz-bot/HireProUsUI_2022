import { Component, OnInit } from '@angular/core';
declare function highlightProjectManagement(): any;

@Component({
  selector: 'app-project-team',
  templateUrl: './project-team.component.html',
  styleUrls: ['./project-team.component.css']
})
export class ProjectTeamComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    highlightProjectManagement();
  }

  gotoToBack() {
    history.back();
  }

}
