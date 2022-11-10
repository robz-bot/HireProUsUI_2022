import { Component } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'HireProUI';
  constructor(private bnIdle: BnNgIdleService) {
    // initiate it in your component constructor
    //300 sec (5 mins)
    // this.bnIdle.startWatching(60).subscribe((res) => {
    //   if (res) {
    //     console.log('session expired');
    //   }
    // });
  }
}
