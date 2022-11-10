import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BusinessUnit } from 'src/app/Models/BusinessUnit';
import { candidate } from 'src/app/Models/Candidate';
import { customer } from 'src/app/Models/Customers';
import { emailConfig } from 'src/app/Models/emailConfig';
import { interviewSchedule } from 'src/app/Models/InterviewSchedule';
import { jobReqSearch } from 'src/app/Models/jobReqSearch';
import { recrole } from 'src/app/Models/RecRoles';
import { vendor } from 'src/app/Models/vendor';
import { apiUrl } from '../GlobalConstants';

@Injectable({
  providedIn: 'root',
})
export class ReportServiceService {
  constructor(private httpClient: HttpClient) {}
  //Base URL
  private baseUrl: string = apiUrl.url;

  private downloadCustomerDetailsUrl = this.baseUrl + 'downloadCustomerDetails';
  private searchCustomerForDownloadUrl =
    this.baseUrl + 'searchCustomerForDownload';

  downloadCustomerDetails(customerDto: customer[]): Observable<Object> {
    return this.httpClient.put(
      `${this.downloadCustomerDetailsUrl}`,
      customerDto,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
        responseType: 'blob',
      }
    );
  }

  searchCustomerForDownload(customerDto: customer): Observable<customer[]> {
    return this.httpClient.post<customer[]>(
      `${this.searchCustomerForDownloadUrl}`,
      customerDto,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  private downloadBusinessUnitDetailsUrl =
    this.baseUrl + 'downloadBusinessUnitDetails';
  private searchBusinessUnitForDownloadUrl =
    this.baseUrl + 'searchBusinessUnitForDownload';

  downloadBusinessUnitDetails(buDto: BusinessUnit[]): Observable<Object> {
    return this.httpClient.put(
      `${this.downloadBusinessUnitDetailsUrl}`,
      buDto,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
        responseType: 'blob',
      }
    );
  }

  searchBusinessUnitForDownload(
    buDto: BusinessUnit
  ): Observable<BusinessUnit[]> {
    return this.httpClient.post<BusinessUnit[]>(
      `${this.searchBusinessUnitForDownloadUrl}`,
      buDto,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  private downloadRecruitmentRoleUrl =
    this.baseUrl + 'downloadRecruitmentRoleDetails';
  private searchRecruitmentRoleForDownloadUrl =
    this.baseUrl + 'searchRecruitmentRoleForDownload';

  downloadRecruitmentRoleDetails(recRoleDto: recrole[]): Observable<Object> {
    return this.httpClient.put(
      `${this.downloadRecruitmentRoleUrl}`,
      recRoleDto,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
        responseType: 'blob',
      }
    );
  }

  searchRecruitmentRoleForDownload(recRoleDto: recrole): Observable<recrole[]> {
    return this.httpClient.post<recrole[]>(
      `${this.searchRecruitmentRoleForDownloadUrl}`,
      recRoleDto,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  private searchAllCandidateForDownloadUrl =
    this.baseUrl + 'searchAllCandidateForDownload';
  private downloadCandidateDetailsUrl =
    this.baseUrl + 'downloadCandidateDetails';

  downloadCandidateDetails(candidateDto: candidate[]): Observable<Object> {
    return this.httpClient.put(
      `${this.downloadCandidateDetailsUrl}`,
      candidateDto,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
        responseType: 'blob',
      }
    );
  }

  searchAllCandidateForDownload(
    candidateDto: candidate
  ): Observable<candidate[]> {
    return this.httpClient.post<candidate[]>(
      `${this.searchAllCandidateForDownloadUrl}`,
      candidateDto,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  private downloadEmailConfUrl = this.baseUrl + 'downloadEmailConfDetails';
  private searchEmailConfForDownloadUrl =
    this.baseUrl + 'searchEmailConfForDownload';

  downloadEmailConfDetails(emailConfigDto: emailConfig[]): Observable<Object> {
    return this.httpClient.put(`${this.downloadEmailConfUrl}`, emailConfigDto, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
      responseType: 'blob',
    });
  }

  searchEmailConfForDownload(
    emailConfigDto: emailConfig
  ): Observable<emailConfig[]> {
    return this.httpClient.post<emailConfig[]>(
      `${this.searchEmailConfForDownloadUrl}`,
      emailConfigDto,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  private downloadVendorUrl = this.baseUrl + 'downloadVendorDetails';
  private searchVendorForReportUrl = this.baseUrl + 'searchVendor';

  downloadVendor(vendorDto: vendor[]): Observable<Object> {
    return this.httpClient.put(`${this.downloadVendorUrl}`, vendorDto, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
      responseType: 'blob',
    });
  }

  searchVendorForReport(vendorDto: vendor): Observable<vendor[]> {
    return this.httpClient.post<vendor[]>(
      `${this.searchVendorForReportUrl}`,
      vendorDto,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  private downloadJobRequestDetailsUrl =
    this.baseUrl + 'downloadJobRequestDetails';
  private searchJobRequestForDownloadUrl =
    this.baseUrl + 'searchJobRequestForDownload';

  downloadJobRequestDetails(jRDto: jobReqSearch[]): Observable<Object> {
    return this.httpClient.put(`${this.downloadJobRequestDetailsUrl}`, jRDto, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
      responseType: 'blob',
    });
  }

  searchJobRequestForDownload(jRDto: jobReqSearch): Observable<jobReqSearch[]> {
    return this.httpClient.post<jobReqSearch[]>(
      `${this.searchJobRequestForDownloadUrl}`,
      jRDto,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  private downloadSelectedCandidateDetailsUrl =
    this.baseUrl + 'downloadSelectedCandidateDetails';
  private searchCandidateForDownloadUrl =
    this.baseUrl + 'searchCandidateForDownload';

  downloadSelectedCandidateDetails(
    candidateDto: candidate[]
  ): Observable<Object> {
    return this.httpClient.put(
      `${this.downloadSelectedCandidateDetailsUrl}`,
      candidateDto,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
        responseType: 'blob',
      }
    );
  }

  searchCandidateForDownload(candidateDto: candidate): Observable<candidate[]> {
    return this.httpClient.post<candidate[]>(
      `${this.searchCandidateForDownloadUrl}`,
      candidateDto,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  private downloadRejectedCandidateDetailsUrl =
    this.baseUrl + 'downloadRejectedCandidateDetails';
  private searchRejectedCandidateForDownloadUrl =
    this.baseUrl + 'searchRejectedCandidateForDownload';

  downloadRejectedCandidateDetails(
    candidateDto: candidate[]
  ): Observable<Object> {
    return this.httpClient.put(
      `${this.downloadRejectedCandidateDetailsUrl}`,
      candidateDto,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
        responseType: 'blob',
      }
    );
  }

  searchRejectedCandidateForDownload(
    candidateDto: candidate
  ): Observable<candidate[]> {
    return this.httpClient.post<candidate[]>(
      `${this.searchRejectedCandidateForDownloadUrl}`,
      candidateDto,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  private downloadInterviewScheduleDetailsUrl =
    this.baseUrl + 'downloadInterviewScheduleSummary';
  private searchInterviewScheduleForDownloadUrl =
    this.baseUrl + 'searchInterviewScheduleForDownload';

  downloadInterviewScheduleDetails(
    interviewScheduleDto: interviewSchedule[]
  ): Observable<Object> {
    return this.httpClient.put(
      `${this.downloadInterviewScheduleDetailsUrl}`,
      interviewScheduleDto,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
        responseType: 'blob',
      }
    );
  }

  searchInterviewScheduleForDownload(
    interviewScheduleDto: interviewSchedule
  ): Observable<interviewSchedule[]> {
    return this.httpClient.post<interviewSchedule[]>(
      `${this.searchInterviewScheduleForDownloadUrl}`,
      interviewScheduleDto,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }
}
