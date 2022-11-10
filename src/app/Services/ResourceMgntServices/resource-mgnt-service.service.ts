import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { employeeDetails } from 'src/app/Models/EmployeeDetails';
import { apiUrl } from '../GlobalConstants';

@Injectable({
  providedIn: 'root',
})
export class ResourceMgntServiceService {
  constructor(private httpClient: HttpClient) {}
  //Base URL
  private baseUrl: string = apiUrl.url;

  //Resource Management URLs
  private searchResourceMgmtUrl = this.baseUrl + 'searchResourceMgmt';
  private addResourceMgmtUrl = this.baseUrl + 'addResourceMgmt';
  private updateResourceMgmtUrl = this.baseUrl + 'updateResourceMgmt';
  private updateResourceMgmtStatusUrl =
    this.baseUrl + 'updateResourceMgmtStatus';
  private getAllEmployeeIdsUrl = this.baseUrl + 'getAllEmployeeIds';
  private getBenchResourcesUrl = this.baseUrl + 'getBenchResources';
  private getAllWorkOrderNumbersUrl = this.baseUrl + 'getAllWorkOrderNumbers';
  private getAllResourceMgmtsUrl = this.baseUrl + 'getAllResourceMgmts';
  private getBenchResourcesByBuIdUrl = this.baseUrl + 'getBenchResourcesByBuId';
  private getResourceMgmtUrl = this.baseUrl + 'getResourceMgmt';
  private deleteResourceMgmtByIdUrl = this.baseUrl + 'deleteResourceMgmtById';
  private downloadResourceDetailsUrl = this.baseUrl + 'downloadResourceDetails';

  downloadResourceDetails(empDet: employeeDetails[]): Observable<Object> {
    return this.httpClient.put(`${this.downloadResourceDetailsUrl}`, empDet, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
      responseType: 'blob',
    });
  }

  addResourceMgmt(empDet: employeeDetails): Observable<Object> {
    return this.httpClient.post(`${this.addResourceMgmtUrl}`, empDet, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  updateResourceMgmt(empDet: employeeDetails): Observable<Object> {
    return this.httpClient.put(`${this.updateResourceMgmtUrl}`, empDet, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  updateResourceMgmtStatus(empDet: employeeDetails): Observable<Object> {
    return this.httpClient.put(`${this.updateResourceMgmtStatusUrl}`, empDet, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  searchResourceMgmt(empDet: employeeDetails): Observable<Object> {
    return this.httpClient.post(`${this.searchResourceMgmtUrl}`, empDet, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  getBenchResourcesByBuId(buId: string): Observable<employeeDetails> {
    return this.httpClient.get<employeeDetails>(
      `${this.getBenchResourcesByBuIdUrl}/${buId}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  getAllEmployeeIds(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.getAllEmployeeIdsUrl}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  getAllWorkOrderNumbers(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.getAllWorkOrderNumbersUrl}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  getAllResourceMgmts(): Observable<employeeDetails[]> {
    return this.httpClient.get<employeeDetails[]>(
      `${this.getAllResourceMgmtsUrl}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }
  //GET /api/v1/getBenchResources
  getBenchResources(): Observable<employeeDetails[]> {
    return this.httpClient.get<employeeDetails[]>(
      `${this.getBenchResourcesUrl}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  getResourceMgmt(id: string): Observable<employeeDetails> {
    return this.httpClient.get<employeeDetails>(
      `${this.getResourceMgmtUrl}/${id}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  deleteResourceMgmtById(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.deleteResourceMgmtByIdUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }
}
