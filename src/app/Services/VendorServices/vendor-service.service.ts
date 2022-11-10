import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { vendor } from 'src/app/Models/vendor';
import { apiUrl } from '../GlobalConstants';

@Injectable({
  providedIn: 'root',
})
export class VendorServiceService {
  constructor(private httpClient: HttpClient) {}
  private baseUrl: string = apiUrl.url;

  //Vendor URL in Services Menus
  private addVendorUrl = this.baseUrl + 'addVendor';
  private searchVendorUrl = this.baseUrl + 'searchVendor';
  private updateVendorUrl = this.baseUrl + 'updateVendor';
  private getAllVendorsUrl = this.baseUrl + 'getAllVendors';
  private getAllVendorIdsUrl = this.baseUrl + 'getAllVendorIds';
  private getVendorUrl = this.baseUrl + 'getVendor';
  private deleteVendorByIdUrl = this.baseUrl + 'deleteVendorById';
  private getActiveVendorsUrl = this.baseUrl + 'getActiveVendors';

  addVendor(vendorModel: vendor): Observable<Object> {
    return this.httpClient.post(`${this.addVendorUrl}`, vendorModel, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  searchVendor(vendorModel: vendor): Observable<object> {
    return this.httpClient.post(`${this.searchVendorUrl}`, vendorModel, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  updateVendor(vendorModel: vendor): Observable<Object> {
    return this.httpClient.put(`${this.updateVendorUrl}`, vendorModel, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  getAllVendors(): Observable<vendor[]> {
    return this.httpClient.get<vendor[]>(`${this.getAllVendorsUrl}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
        'Content-Type': 'application/json',
      },
    });
  }

  getActiveVendors(): Observable<vendor[]> {
    return this.httpClient.get<vendor[]>(`${this.getActiveVendorsUrl}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
        'Content-Type': 'application/json',
      },
    });
  }

  getAllVendorIds(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.getAllVendorIdsUrl}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
        'Content-Type': 'application/json',
      },
    });
  }

  getVendor(vendorId: string): Observable<vendor> {
    return this.httpClient.get<vendor>(`${this.getVendorUrl}/${vendorId}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  //DELETE /api/v1/deleteVendorById/{vendorId}
  deleteVendorById(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.deleteVendorByIdUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }
}
