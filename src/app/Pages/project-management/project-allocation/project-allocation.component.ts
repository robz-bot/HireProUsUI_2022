import { Component, OnInit } from '@angular/core';
declare function highlightProjectManagement(): any;

@Component({
  selector: 'app-project-allocation',
  templateUrl: './project-allocation.component.html',
  styleUrls: ['./project-allocation.component.css']
})
export class ProjectAllocationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    highlightProjectManagement();
  }

}
