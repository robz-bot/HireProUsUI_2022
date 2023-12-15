import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecStatusServiceService {
  constructor() {}
  getRecStatus(recStatus: string): string {
    if (recStatus == '00') {
      return 'Details Uploaded';
    }
    if (recStatus == '01') {
      //console.log(recStatus);
      return 'Shortlisted';
    }
    if (recStatus == '02') {
      //console.log(recStatus);
      return 'Hold @ Resume shortlist';
    }
    if (recStatus == '03') {
      //console.log(recStatus);
      return 'Reject @ Resume shortlist';
    }
    if (recStatus == '04') {
      //console.log(recStatus);
      return 'Scheduled for Internal Round 1';
    }
    if (recStatus == '05') {
      //console.log(recStatus);
      return 'Passed @ Internal Round 1';
    }
    if (recStatus == '06') {
      //console.log(recStatus);
      return 'Holded @ Internal Round 1';
    }
    if (recStatus == '07') {
      //console.log(recStatus);
      return 'Rejected @ Internal Round 1';
    }
    if (recStatus == '08') {
      //console.log(recStatus);
      return 'Scheduled for Internal Round 2';
    }
    if (recStatus == '09') {
      //console.log(recStatus);
      return 'Passed @ Internal Round 2';
    }
    if (recStatus == '10') {
      //console.log(recStatus);
      return 'Holded @ Internal Round 2';
    }
    if (recStatus == '11') {
      //console.log(recStatus);
      return 'Rejected @ Internal Round 2';
    }
    if (recStatus == '12') {
      //console.log(recStatus);
      return 'Scheduled for Customer Round ';
    }
    if (recStatus == '13') {
      //console.log(recStatus);
      return 'Passed @ Customer Round ';
    }
    if (recStatus == '14') {
      //console.log(recStatus);
      return 'Holded @ Customer Round ';
    }
    if (recStatus == '15') {
      //console.log(recStatus);
      return 'Rejected @ Customer Round ';
    }
    if (recStatus == '16') {
      //console.log(recStatus);
      return 'Scheduled for HR Round';
    }
    if (recStatus == '17') {
      //console.log(recStatus);
      return 'Passed @ HR Round';
    }
    if (recStatus == '18') {
      //console.log(recStatus);
      return 'Holded @ HR Round';
    }
    if (recStatus == '19') {
      //console.log(recStatus);
      return 'Rejected @ HR Round';
    }
    if (recStatus == '20') {
      //console.log(recStatus);
      return 'Scheduled for BU Round';
    }
    if (recStatus == '21') {
      //console.log(recStatus);
      return 'Passed @ BU Round';
    }
    if (recStatus == '22') {
      //console.log(recStatus);
      return 'Holded @ BU Round';
    }
    if (recStatus == '23') {
      //console.log(recStatus);
      return 'Rejected @ BU Round';
    }
    if (recStatus == '24') {
      //console.log(recStatus);
      return 'Selected';
    }
    if (recStatus == '25') {
      //console.log(recStatus);
      return 'Onboarded';
    }
    if (recStatus == '26') {
      //console.log(recStatus);
      return 'Dropped';
    }
  }
}
