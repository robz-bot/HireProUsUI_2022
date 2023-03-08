import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { identity, Observable } from 'rxjs';
import { resourceaccomplishment } from 'src/app/Models/resourceaccomplishment';
import { apiUrl } from '../GlobalConstants';

@Injectable({
  providedIn: 'root',
})
export class AchievementServicesService {
  getloadDate: any;
  getloadAchievements: any;
  getloadReviewed: any;
  constructor(private httpClient: HttpClient) {}
  //Base URL
  private baseUrl: string = apiUrl.url;
  private addResourceAccomplishmentUrl =
    this.baseUrl + 'addResourceAccomplishment';
  private getResourceAccomplishmentByNameUrl =
    this.baseUrl + 'getResourceAccomplishmentByName';
  private getResourceAccomplishmentByIdUrl =
    this.baseUrl + 'getResourceAccomplishment';
  private updateResourceAccomplishmentUrl =
    this.baseUrl + 'updateResourceAccomplishment';
  private updateAccomplishmentRatingUrl =
    this.baseUrl + 'updateAccomplishmentRating';
  private getAllResourceAccomplishmentUrl =
    this.baseUrl + 'getAllResourceAccomplishment';
    private getResourceAccomplishmentByBuIdUrl =
    this.baseUrl +'getResourceAccomplishmentByBuId';
    private getResourceAccomplishmentByBuIdYearUrl =
    this.baseUrl +'getResourceAccomplishmentByBuIdYear';
  private checkEntryValidityUrl = this.baseUrl + 'checkEntryValidity';
  private downloadAccomplishmentRatingUrl =
    this.baseUrl + 'downloadAccomplishmentReport';
  private searchAccomplishmentsUrl = this.baseUrl + 'searchAccomplishments';
  private getResourceAccomplishmentByRoleIdsUrl = this.baseUrl + 'getResourceAccomplishmentsByRoleIds'

  addAchievements(
    resourceaccomplishment: resourceaccomplishment
  ): Observable<Object> {
    return this.httpClient.post(
      `${this.addResourceAccomplishmentUrl}`,
      resourceaccomplishment,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }
  //  searchAccomplishments(
  //   resourceAccomplishment: resourceaccomplishment,
  //   roleIds
  // ): Observable<resourceaccomplishment[]> {
  //   return this.httpClient.post<resourceaccomplishment[]>(
  //     `${this.searchAccomplishmentsUrl}`,
  //     resourceAccomplishment, roleIds,
  //     {
  //       headers: {
  //         'pro-api-key': 'h1r5pr0',
  //       },
  //     }
  //   );
  // }

  updateAchievement(
    resourceaccomplishment: resourceaccomplishment
  ): Observable<Object> {
    return this.httpClient.put<Object>(
      `${this.updateResourceAccomplishmentUrl}`,
      resourceaccomplishment,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }
  updateAccomplishmentRating(
    resourceaccomplishment: resourceaccomplishment
  ): Observable<Object> {
    return this.httpClient.put<Object>(
      `${this.updateAccomplishmentRatingUrl}`,
      resourceaccomplishment,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  getResourceAccomplishmentByRoleIds(
    roleIds: string[]
  ): Observable<resourceaccomplishment[]> {
    return this.httpClient.put<resourceaccomplishment[]>(
      `${this.getResourceAccomplishmentByRoleIdsUrl}`,
      roleIds,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  getAllResourceAccomplishment(): Observable<resourceaccomplishment[]> {
    return this.httpClient.get<resourceaccomplishment[]>(
      `${this.getAllResourceAccomplishmentUrl}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getResourceAccomplishmentByBuId(buId:String): Observable<resourceaccomplishment[]> {
    return this.httpClient.get<resourceaccomplishment[]>(
      `${this.getResourceAccomplishmentByBuIdUrl}/${buId}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }
  getResourceAccomplishmentByBuIdYear(buId:String,year:String): Observable<resourceaccomplishment[]> {
    return this.httpClient.get<resourceaccomplishment[]>(
      `${this.getResourceAccomplishmentByBuIdYearUrl}/${buId}/${year}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }
  getResourceAccomplishmentByName(
    name: string
  ): Observable<resourceaccomplishment[]> {
    return this.httpClient.get<resourceaccomplishment[]>(
      `${this.getResourceAccomplishmentByNameUrl}/${name}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }
  checkEntryValidity(
    name: string,
    year: number
  ): Observable<resourceaccomplishment[]> {
    return this.httpClient.get<resourceaccomplishment[]>(
      `${this.checkEntryValidityUrl}/${name}/${year}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }
  downloadAccomplishmentReport(
    accomplishmentRatingDto: resourceaccomplishment[]
  ): Observable<Object> {
    return this.httpClient.put(
      `${this.downloadAccomplishmentRatingUrl}`,
      accomplishmentRatingDto,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
        responseType: 'blob',
      }
    );
  }

  getResourceAccomplishmentById(
    id: string
  ): Observable<resourceaccomplishment> {
    return this.httpClient.get<resourceaccomplishment>(
      `${this.getResourceAccomplishmentByIdUrl}/${id}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }
}
