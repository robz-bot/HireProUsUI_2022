import { OnboardDet } from './../../Models/OnBoardDet';
import { interviewSchedule } from './../../Models/InterviewSchedule';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { candidate } from 'src/app/Models/Candidate';
import { jobReq } from 'src/app/Models/JobRequest';
import { apiUrl } from '../GlobalConstants';
import { UserReg } from 'src/app/Models/UserReg';
import { jobReqSearch } from 'src/app/Models/jobReqSearch';
import { JobRequestReport } from 'src/app/Models/JobRequestReport';
import { timeZone } from 'src/app/Models/timeZone';
import { searchInterviewSchedule } from 'src/app/Models/searchInterviewSchedule';
import { onBoardSearch } from 'src/app/Models/onBoardSearch';
import { candidateCount } from 'src/app/Models/candidatesCount';
import { forAllSchedule } from 'src/app/Models/ForAllScheduleDto';
import { WidgetData } from 'src/app/Models/dashboard';

@Injectable({
  providedIn: 'root',
})
export class RecruitmentServiceService {
  searchratingdashboard(searchJobReq: jobReqSearch) : Observable<Object> {
    throw new Error('Method not implemented.');
  }
  getratingdashboardList() : Observable<Object> {
    throw new Error('Method not implemented.');
  }
  deleteratingdashboard(id: any) : Observable<Object> {
    throw new Error('Method not implemented.');
  }
  constructor(private httpClient: HttpClient) {}
  //Base URL
  private baseUrl: string = apiUrl.url;

  //TimeZone URL
  private getTimeZoneListUrl = this.baseUrl + 'getTimeZoneList';
  getTimeZoneList(): Observable<timeZone[]> {
    return this.httpClient.get<timeZone[]>(`${this.getTimeZoneListUrl}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
        'Content-Type': 'application/json',
      },
    });
  }

  //

  //jobReq URL
  private getJobRequestUrl = this.baseUrl + 'getAllJobRequests';
  private getJRsByVendorIdUrl = this.baseUrl + 'getJRsByVendorId';
  private getMyJobRequestsUrl = this.baseUrl + 'getMyJobRequests';

  private postJobRequestUrl = this.baseUrl + 'addJobRequest';
  private putJobRequestUrl = this.baseUrl + 'updateJobRequest';
  private putRecruiterUrl = this.baseUrl + 'updateRecruiter';
  private updateShortlistResultUrl = this.baseUrl + 'updateShortlistResult';
  private getJobRequestByIdUrl = this.baseUrl + 'getJobRequest';
  private getJRByCustomerIdUrl = this.baseUrl + 'getJRsByCustomerId';
  private getJRByRecRoleIdUrl = this.baseUrl + 'getJRsByRoleId';
  private getJRsByRecruiterIdUrl = this.baseUrl + 'getJRsByRecruiterId';
  private getJRByBuIdUrl = this.baseUrl + 'getJRsByBuId';
  private getJobRequestsByJRNumberUrl =
    this.baseUrl + 'getJobRequestsByJRNumber';
  private deleteJobRequestUrl = this.baseUrl + 'deleteJobRequestById';
  private searchJobRequestUrl = this.baseUrl + 'searchJobRequest';
  private searchMyJobRequestUrl = this.baseUrl + 'searchMyJobRequests';
  private JobRequestnamecheckUrl = this.baseUrl + 'checkJobRequestName';
  private getJRsByStatusUrl = this.baseUrl + 'getJRsByStatus';
  private getCandidateByVendorId = this.baseUrl + 'getCandidatesByVendorId';

  getCandidatesByVendorId(id: string): Observable<candidate> {
    return this.httpClient.get<candidate>(
      `${this.getCandidateByVendorId}/${id}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  getJobRequestList(): Observable<jobReq[]> {
    return this.httpClient.get<jobReq[]>(`${this.getJobRequestUrl}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
        'Content-Type': 'application/json',
      },
    });
  }

  getMyJobRequests(userId: string): Observable<jobReq[]> {
    return this.httpClient.get<jobReq[]>(
      `${this.getMyJobRequestsUrl}/${userId}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getMyJobRequestsForVendor(cVendorId: string): Observable<jobReq[]> {
    return this.httpClient.get<jobReq[]>(
      `${this.getJRsByVendorIdUrl}/${cVendorId}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getJRsByVendorId(vendorId: string): Observable<jobReq[]> {
    return this.httpClient.get<jobReq[]>(
      `${this.getJRsByVendorIdUrl}/${vendorId}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  newJobRequest(JobRequest: jobReq): Observable<Object> {
    return this.httpClient.post(`${this.postJobRequestUrl}`, JobRequest, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  // searchJobRequestByKey(keyword: string): Observable<jobReq[]> {
  //   return this.httpClient.get<jobReq[]>(
  //     `${this.searchJobRequestUrl}/${keyword}`,
  //     {
  //       headers: {
  //         'pro-api-key': 'h1r5pr0',
  //       },
  //     }
  //   );
  // }

  searchJobRequest(search: jobReqSearch): Observable<Object> {
    return this.httpClient.post<jobReqSearch>(
      `${this.searchJobRequestUrl}`,
      search,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  searchMyJobRequest(userId: string, search: jobReqSearch): Observable<Object> {
    return this.httpClient.post<jobReqSearch>(
      `${this.searchMyJobRequestUrl}/${userId}`,
      search,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  getJobRequestById(id: string): Observable<jobReq> {
    return this.httpClient.get<jobReq>(`${this.getJobRequestByIdUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  getJobRequestsByJRNumber(id: string): Observable<jobReq> {
    return this.httpClient.get<jobReq>(
      `${this.getJobRequestsByJRNumberUrl}/${id}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  getJRByBuId(id: string): Observable<jobReq> {
    return this.httpClient.get<jobReq>(`${this.getJRByBuIdUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  getJRByRecRoleId(id: string): Observable<jobReq> {
    return this.httpClient.get<jobReq>(`${this.getJRByRecRoleIdUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  getJRsByStatus(status: string): Observable<jobReq> {
    return this.httpClient.put<jobReq>(`${this.getJRsByStatusUrl}`, status, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  getJRsByRecruiterId(id: string): Observable<jobReq> {
    return this.httpClient.get<jobReq>(`${this.getJRsByRecruiterIdUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  getJRByCustomerId(id: string): Observable<jobReq> {
    return this.httpClient.get<jobReq>(`${this.getJRByCustomerIdUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  checkJobRequestName(JobRequestName: string): Observable<Object> {
    return this.httpClient.post(
      `${this.JobRequestnamecheckUrl}`,
      JobRequestName,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  updateJobRequest(JobRequest: jobReq): Observable<Object> {
    return this.httpClient.put<jobReq>(`${this.putJobRequestUrl}`, JobRequest, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  updateRecruiter(
    jrNumber: string,
    recId: string,
    currentUserId: string
  ): Observable<Object> {
    return this.httpClient.put(
      `${this.putRecruiterUrl}/${jrNumber}/${recId}/${currentUserId}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  updateShortlistResult(Candidate: candidate): Observable<Object> {
    return this.httpClient.put(`${this.updateShortlistResultUrl}`, Candidate, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  deleteJobRequest(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.deleteJobRequestUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  //Candidate URL
  private getCandidateUrl = this.baseUrl + 'getAllCandidates';
  private getCandidatesCountUrl = this.baseUrl + 'getCandidatesCount';
  private getAllJobRequestNumbersUrl = this.baseUrl + 'getAllJobRequestNumbers';
  private getCandidateByJRNumUrl = this.baseUrl + 'getCandidatesByJRNum';
  private getCandidatesByRecStatusListUrl =
    this.baseUrl + 'getCandidatesByRecStatusList';
  private getCandidateByRecStatusUrl =
    this.baseUrl + 'getCandidatesByRecStatus';
  private postCandidateUrl = this.baseUrl + 'addCandidate';
  private putCandidateUrl = this.baseUrl + 'updateCandidate';
  private getCandidateByIdUrl = this.baseUrl + 'getCandidate';
  private deleteCandidateUrl = this.baseUrl + 'deleteCandidateById';
  private searchCandidateUrl = this.baseUrl + 'searchCandidate';
  private searchCandidateByRecStatusListUrl =
    this.baseUrl + 'searchCandidateByRecStatusList';
  private CandidatenamecheckUrl = this.baseUrl + 'checkCandidateName';
  private getCandidatesByJRNumAndRecStatusListUrl =
    this.baseUrl + 'getCandidatesByJRNumAndRecStatusList';

  getCandidateList(): Observable<candidate[]> {
    return this.httpClient.get<candidate[]>(`${this.getCandidateUrl}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
        'Content-Type': 'application/json',
      },
    });
  }

  getCandidatesCount(): Observable<candidateCount> {
    return this.httpClient.get<candidateCount>(
      `${this.getCandidatesCountUrl}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getCandidatesCountForVendor(vendorId: string): Observable<candidateCount> {
    return this.httpClient.get<candidateCount>(
      `${this.getCandidatesCountUrl}?vendorId=${vendorId}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getCandidatesByRecStatusListForVendor(
    RecStatusList: string[],
    vendorId: string
  ): Observable<candidate[]> {
    return this.httpClient.put<candidate[]>(
      `${this.getCandidatesByRecStatusListUrl}?vendorId=${vendorId}`,
      RecStatusList,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  getCandidatesByRecStatusList(
    RecStatusList: string[]
  ): Observable<candidate[]> {
    return this.httpClient.put<candidate[]>(
      `${this.getCandidatesByRecStatusListUrl}`,
      RecStatusList,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  getAllJobRequestNumbers(): Observable<candidate[]> {
    return this.httpClient.get<candidate[]>(
      `${this.getAllJobRequestNumbersUrl}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  newCandidate(Candidate: candidate): Observable<Object> {
    return this.httpClient.post(`${this.postCandidateUrl}`, Candidate, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  searchCandidateByKey(keyword: string): Observable<candidate[]> {
    return this.httpClient.get<candidate[]>(
      `${this.searchCandidateUrl}/${keyword}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  // searchCandidateByRecStatusList(
  //   refId: string,
  //   keyword: string,
  //   list: string[]
  // ): Observable<candidate[]> {
  //   return this.httpClient.put<candidate[]>(
  //     `${this.searchCandidateByRecStatusListUrl}?name=${keyword}&jrNumber=${refId}`,
  //     list,
  //     {
  //       headers: {
  //         'pro-api-key': 'h1r5pr0',
  //       },
  //     }
  //   );
  // }
  searchCandidateByRecStatusList(
    refId: string,
    keyword: string,
    list: string[],
    vendorId: string
  ): Observable<candidate[]> {
    return this.httpClient.put<candidate[]>(
      `${this.searchCandidateByRecStatusListUrl}?name=${keyword}&jrNumber=${refId}&vendorId=${vendorId}`,
      list,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  getCandidateById(id: string): Observable<candidate> {
    return this.httpClient.get<candidate>(`${this.getCandidateByIdUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  getCandidatesByJRNum(id: string): Observable<candidate> {
    return this.httpClient.get<candidate>(
      `${this.getCandidateByJRNumUrl}/${id}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  getCandidatesByJRNumAndRecStatusList(
    id: string,
    list: string[]
  ): Observable<candidate> {
    return this.httpClient.put<candidate>(
      `${this.getCandidatesByJRNumAndRecStatusListUrl}/${id}`,
      list,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  getCandidatesByRecStatus(id: string): Observable<candidate> {
    return this.httpClient.get<candidate>(
      `${this.getCandidateByRecStatusUrl}/${id}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  checkCandidateName(CandidateName: string): Observable<Object> {
    return this.httpClient.post(
      `${this.CandidatenamecheckUrl}`,
      CandidateName,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  updateCandidate(Candidate: candidate): Observable<Object> {
    return this.httpClient.put<candidate>(
      `${this.putCandidateUrl}`,
      Candidate,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  deleteCandidate(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.deleteCandidateUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  //Interview Schedules URL

  private getAllForScheduleUrl = this.baseUrl + 'getAllForSchedule';
  private getMyInterviewsUrl = this.baseUrl + 'getMyInterviews';
  private getAllSearchForScheduleUrl = this.baseUrl + 'getAllSearchForSchedule';
  private searchForScheduleUrl = this.baseUrl + 'searchForSchedule';
  private searchMyInterviewsUrl = this.baseUrl + 'searchMyInterviews';
  private searchInterviewScheduledListUrl =
    this.baseUrl + 'searchInterviewScheduledList';

  private addInterviewScheduleUrl = this.baseUrl + 'addInterviewSchedule';
  private getInterviewScheduleUrl = this.baseUrl + 'getInterviewSchedule';
  private getCandidatesByCandidateIdAndRoundUrl =
    this.baseUrl + 'getCandidatesByCandidateIdAndRound';
  private viewHistoryUrl = this.baseUrl + 'viewHistory';
  private getCandidateHistoryUrl = this.baseUrl + 'getCandidateHistory';
  private getInterviewersByBuIdUrl = this.baseUrl + 'getInterviewersByBuId';
  private getForScheduleUrl = this.baseUrl + 'getForSchedule';
  private updateResultUrl = this.baseUrl + 'updateResult';
  private updateInterviewScheduleUrl = this.baseUrl + 'updateInterviewSchedule';
  private deleteInterviewScheduleByIdUrl =
    this.baseUrl + 'deleteInterviewScheduleById';
  private getInterviewScheduledListUrl =
    this.baseUrl + 'getInterviewScheduledList';

  getMyInterviews(userId: string): Observable<interviewSchedule[]> {
    return this.httpClient.get<interviewSchedule[]>(
      `${this.getMyInterviewsUrl}/${userId}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  updateResult(
    interviewSchedule: interviewSchedule
  ): Observable<interviewSchedule> {
    return this.httpClient.put<interviewSchedule>(
      `${this.updateResultUrl}`,
      interviewSchedule,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  updateInterviewSchedule(
    interviewSchedule: interviewSchedule
  ): Observable<interviewSchedule> {
    return this.httpClient.put<interviewSchedule>(
      `${this.updateInterviewScheduleUrl}`,
      interviewSchedule,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  addInterviewSchedule(
    interviewSchedule: interviewSchedule
  ): Observable<Object> {
    return this.httpClient.post(
      `${this.addInterviewScheduleUrl}`,
      interviewSchedule,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  getInterviewSchedule(id: string): Observable<interviewSchedule> {
    return this.httpClient.get<interviewSchedule>(
      `${this.getInterviewScheduleUrl}/${id}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  searchForSchedule(
    round: string,
    interviewScheduleSearch: searchInterviewSchedule
  ): Observable<interviewSchedule> {
    return this.httpClient.put<interviewSchedule>(
      `${this.searchForScheduleUrl}/${round}`,
      interviewScheduleSearch,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  searchInterviewScheduledList(
    round: string,
    interviewScheduleSearch: searchInterviewSchedule
  ): Observable<interviewSchedule> {
    return this.httpClient.put<interviewSchedule>(
      `${this.searchInterviewScheduledListUrl}/${round}`,
      interviewScheduleSearch,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  searchMyInterviews(
    userId: string,
    searchDto: any
  ): Observable<interviewSchedule> {
    return this.httpClient.put<interviewSchedule>(
      `${this.searchMyInterviewsUrl}/${userId}`,
      searchDto,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  getInterviewersByBuId(id: string): Observable<UserReg[]> {
    return this.httpClient.get<UserReg[]>(
      `${this.getInterviewersByBuIdUrl}/${id}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getCandidateHistory(jrNumber: string, candidateId: string): Observable<any> {
    return this.httpClient.get<any>(
      `${this.getCandidateHistoryUrl}/${jrNumber}/${candidateId}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getCandidatesByCandidateIdAndRound(
    CandidateId: string,
    Round: string
  ): Observable<any> {
    return this.httpClient.get<any>(
      `${this.getCandidatesByCandidateIdAndRoundUrl}/${CandidateId}/${Round}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getAllForSchedule(): Observable<forAllSchedule[]> {
    return this.httpClient.get<forAllSchedule[]>(
      `${this.getAllForScheduleUrl}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getAllSearchForSchedule(
    scheduleDto: searchInterviewSchedule
  ): Observable<forAllSchedule[]> {
    return this.httpClient.put<forAllSchedule[]>(
      `${this.getAllSearchForScheduleUrl}`,
      scheduleDto,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getInterviewScheduledList(id: string): Observable<interviewSchedule[]> {
    return this.httpClient.get<interviewSchedule[]>(
      `${this.getInterviewScheduledListUrl}/${id}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getForSchedule(id: string): Observable<interviewSchedule[]> {
    return this.httpClient.get<interviewSchedule[]>(
      `${this.getForScheduleUrl}/${id}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }
  //api/v1/viewHistory/{jrNumber}/{candidateId}
  viewHistory(jrNumber: string, candidateId): Observable<interviewSchedule[]> {
    return this.httpClient.get<interviewSchedule[]>(
      `${this.viewHistoryUrl}/${jrNumber}/${candidateId}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  deleteInterviewScheduleById(id: string): Observable<Object> {
    return this.httpClient.delete(
      `${this.deleteInterviewScheduleByIdUrl}/${id}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  //On Board Det URL
  private addOnBoardUrl = this.baseUrl + 'addOnboard';
  private getAllOnBoardsUrl = this.baseUrl + 'getAllOnboards';
  private getOnBoardUrl = this.baseUrl + 'getOnboard';
  private updateOnBoardUrl = this.baseUrl + 'updateOnboard';
  private deleteOnBoardByIdUrl = this.baseUrl + 'deleteOnboardById';
  private searchOnboardUrl = this.baseUrl + 'searchOnboard';
  //PUT /api/v1/searchOnboard

  searchOnboard(onBoardSearchDto: onBoardSearch): Observable<OnboardDet> {
    return this.httpClient.put<OnboardDet>(
      `${this.searchOnboardUrl}`,
      onBoardSearchDto,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  addOnBoard(onboard: OnboardDet): Observable<Object> {
    return this.httpClient.post(`${this.addOnBoardUrl}`, onboard, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  getOnBoard(id: string): Observable<OnboardDet> {
    return this.httpClient.get<OnboardDet>(`${this.getOnBoardUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
        'Content-Type': 'application/json',
      },
    });
  }

  getAllOnBoards(): Observable<OnboardDet[]> {
    return this.httpClient.get<OnboardDet[]>(`${this.getAllOnBoardsUrl}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
        'Content-Type': 'application/json',
      },
    });
  }

  updateOnBoard(onboard: OnboardDet): Observable<OnboardDet> {
    return this.httpClient.put<OnboardDet>(
      `${this.updateOnBoardUrl}`,
      onboard,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  deleteOnBoardById(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.deleteOnBoardByIdUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  //Report URL
  private getJobRequestByDate = this.baseUrl + 'getAllJobRequestsByDate';
  private getJobRequestReport = this.baseUrl + 'downloadJobRequestExcel';
  private getJobRequestCount = this.baseUrl + 'getAllJobRequestsReportCount';
  private getAllJobRequestReport = this.baseUrl + 'getAllJobRequestsReport';
  private getJobRequestByStatus = this.baseUrl + 'getJobRequestsByStatus';
  private getJRsByVendorPriorityUrl = this.baseUrl + 'getJRsByVendorPriority';
  private getCandidatesCountVendorVsJrUrl =
    this.baseUrl + 'getCandidatesCountVendorVsJR';
  private getJobRequestCountByJre =
    this.baseUrl + 'getAllCandidateStatusByJrNumber';
  private getAllInterviewScheduleUrl =
    this.baseUrl + 'getAllInterviewSchedules';

  getAllInterviewSchedule(): Observable<interviewSchedule> {
    return this.httpClient.get<interviewSchedule>(
      `${this.getAllInterviewScheduleUrl}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  getJobRequestReportByDate(startDate, endDate): Observable<JobRequestReport> {
    return this.httpClient.get<JobRequestReport>(
      `${this.getJobRequestByDate}/${startDate}/${endDate}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }
  getAllJobRequestsReportCount(): Observable<JobRequestReport> {
    return this.httpClient.get<JobRequestReport>(`${this.getJobRequestCount}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }
  getJobRequestsReportCountByJre(jreNumber): Observable<JobRequestReport> {
    return this.httpClient.get<JobRequestReport>(
      `${this.getJobRequestCountByJre}/${jreNumber}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }
  getAllJobRequestsReport(): Observable<JobRequestReport> {
    return this.httpClient.get<JobRequestReport>(
      `${this.getAllJobRequestReport}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }
  getJobRequestsRepByStatus(status: string): Observable<JobRequestReport> {
    return this.httpClient.get<JobRequestReport>(
      `${this.getJobRequestByStatus}/${status}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }


  getJRsByVendorPriority(vendorPriority: string): Observable<jobReq[]> {
    return this.httpClient.get<jobReq[]>(
      `${this.getJRsByVendorPriorityUrl}/${vendorPriority}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  //count candidate for vendor VS JR
  getCandidatesCountVendorVsJr(
    vendorId: string,
    jrNumber: string
  ): Observable<candidateCount> {
    return this.httpClient.get<candidateCount>(
      `${this.getCandidatesCountVendorVsJrUrl}?vendorId=${vendorId}&jrNumber=${jrNumber}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  private rejectToUploadedStatusUrl = this.baseUrl + 'rejectToUploadedStatus';
  rejectToUploadedStatus(candidateDto:any,jrNumber: string): Observable<Object> {
    return this.httpClient.post<Object>(
      `${this.rejectToUploadedStatusUrl}/${jrNumber}`,candidateDto,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }
}
