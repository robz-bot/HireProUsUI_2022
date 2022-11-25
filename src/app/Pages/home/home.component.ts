/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
// import { Subscription } from 'rxjs/internal/Subscription';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private bnIdle: BnNgIdleService, private router: Router) {
    // initiate it in your component constructor
    //300 sec (5 mins)
    //  this.bnIdle.startWatching(300).subscribe((res) => {
    //  if (res) {
    //alert('Session expired');
    //    console.log('session expired');
    // sessionStorage.clear();
    // if (sessionStorage.getItem('isVendor') == '0') {
    //   this.router.navigateByUrl('');
    // } else {
    //   this.router.navigateByUrl('/vendorLogin');
    // }
    // }
    // });
  }
  // private sessionSubscription: Subscription;
  ngOnInit(): void {
    // console.log(sessionStorage.getItem('isVendor'));
    // this.sessionSubscription = this.bnIdle
    //   .startWatching(100000)
    //   .subscribe((res) => {
    //     if (res) {
    //       // alert('Session expired');
    //       console.log('session expired');
    //       this.bnIdle.stopTimer();
    //       if (sessionStorage.getItem('isVendor') == '0') {
    //         this.router.navigateByUrl('');
    //       } else {
    //         this.router.navigateByUrl('/vendorLogin');
    //       }
    //       sessionStorage.clear();
    //       this.bnIdle.resetTimer();
    //     }
    //   });
  }

  // ngOnDestroy(): void {
  //   if (this.sessionSubscription) {
  //     this.sessionSubscription.unsubscribe();
  //   }
  // }
}
