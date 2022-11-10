import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BUsAndJobRequestCount,
  jobRequestCount,
  LatestJobRequests,
  WidgetData,
} from 'src/app/Models/dashboard';
import { jobRequestAging } from 'src/app/Models/jobRequestAging';
import { apiUrl } from '../GlobalConstants';

@Injectable({
  providedIn: 'root',
})
export class DashboardServiceService {
  constructor(private httpClient: HttpClient) {}
  //Base URL
  private baseUrl: string = apiUrl.url;

  //Dashboard URL
  private getWidgetDataUrl = this.baseUrl + 'getWidgetData';
  private getMyInterviewsUrl = this.baseUrl + 'getMyInterviews'; //
  private getJobRequestAgingCountUrl = this.baseUrl + 'getJobRequestAgingCount';
  private getJobRequestAgingCountByBuIdUrl =
    this.baseUrl + 'getJobRequestAgingCount';
  private getAllJobRequestStagesCountUrl =
    this.baseUrl + 'getAllJobRequestStagesCount';
  private getLatestJobRequestsUrl = this.baseUrl + 'getLatestJobRequests';
  private getBUsAndJobRequestCountUrl =
    this.baseUrl + 'getBUsAndJobRequestCount';

  getWidgetData(userId: string): Observable<WidgetData> {
    return this.httpClient.get<WidgetData>(
      `${this.getWidgetDataUrl}/${userId}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getMyInterviews(userId: string): Observable<WidgetData> {
    return this.httpClient.get<WidgetData>(
      `${this.getMyInterviewsUrl}/${userId}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getJobRequestAgingCount(): Observable<jobRequestAging> {
    return this.httpClient.get<jobRequestAging>(
      `${this.getJobRequestAgingCountUrl}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getJobRequestAgingCountByBuId(buId: string): Observable<jobRequestAging> {
    return this.httpClient.get<jobRequestAging>(
      `${this.getJobRequestAgingCountByBuIdUrl}/${buId}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getBUsAndJobRequestCount(): Observable<BUsAndJobRequestCount> {
    return this.httpClient.get<BUsAndJobRequestCount>(
      `${this.getBUsAndJobRequestCountUrl}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getLatestJobRequests(): Observable<LatestJobRequests[]> {
    return this.httpClient.get<LatestJobRequests[]>(
      `${this.getLatestJobRequestsUrl}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getAllJobRequestStagesCount(): Observable<jobRequestCount> {
    return this.httpClient.get<jobRequestCount>(
      `${this.getAllJobRequestStagesCountUrl}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  //Vendor Dashboard URL
  private getWidgetDataForVendorUrl = this.baseUrl + 'getWidgetData';
  private getJobRequestAgingCountForVendorUrl =
    this.baseUrl + 'getJobRequestAgingCount';
  private getAllJobRequestStagesCountForVendorUrl =
    this.baseUrl + 'getAllJobRequestStagesCount';
  private getLatestJobRequestsForVendorUrl =
    this.baseUrl + 'getLatestJobRequests';
  private getBUsAndJobRequestCountForVendorUrl =
    this.baseUrl + 'getBUsAndJobRequestCount';

  getWidgetDataForVendor(
    userId: string,
    vendorId: string
  ): Observable<WidgetData> {
    return this.httpClient.get<WidgetData>(
      `${this.getWidgetDataForVendorUrl}/${vendorId}?vendorId=${vendorId}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getJobRequestAgingCountForVendor(
    vendorId: string
  ): Observable<jobRequestAging> {
    return this.httpClient.get<jobRequestAging>(
      `${this.getJobRequestAgingCountForVendorUrl}?vendorId=${vendorId}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getAllJobRequestStagesCountForVendor(
    vendorId: string
  ): Observable<jobRequestCount> {
    return this.httpClient.get<jobRequestCount>(
      `${this.getAllJobRequestStagesCountForVendorUrl}?vendorId=${vendorId}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getLatestJobRequestsForVendor(
    vendorId: string
  ): Observable<LatestJobRequests[]> {
    return this.httpClient.get<LatestJobRequests[]>(
      `${this.getLatestJobRequestsForVendorUrl}?vendorId=${vendorId}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getBUsAndJobRequestCountForVendor(
    vendorId: string
  ): Observable<BUsAndJobRequestCount> {
    return this.httpClient.get<BUsAndJobRequestCount>(
      `${this.getBUsAndJobRequestCountForVendorUrl}?vendorId=${vendorId}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
