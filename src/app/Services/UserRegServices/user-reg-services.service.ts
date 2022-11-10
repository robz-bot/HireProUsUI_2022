import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserReg } from 'src/app/Models/UserReg';
import { UserRegSearch } from 'src/app/Models/UserRegSearch';
import { apiUrl } from '../GlobalConstants';

@Injectable({
  providedIn: 'root',
})
export class UserRegServicesService {
  constructor(private httpClient: HttpClient) {}
  private baseUrl: string = apiUrl.url;

  //User Reg URL
  private getUsersUrl = this.baseUrl + 'getAllUsers';
  private getRecruitersUrl = this.baseUrl + 'getRecruiters';
  private postUsersUrl = this.baseUrl + 'addUser';
  private putUsersUrl = this.baseUrl + 'updateUser';
  private getUsersByIdUrl = this.baseUrl + 'getUser';
  private getAllUsersByBUIdUrl = this.baseUrl + 'getAllUsersByBUId';
  private getAllUsersByRoleIdUrl = this.baseUrl + 'getAllUsersByRoleId';
  private deleteUserUrl = this.baseUrl + 'deleteUserById';
  private searchUserUrl = this.baseUrl + 'searchUser';
  private UsernamecheckUrl = this.baseUrl + 'checkUserName';
  private getUsersByBUIdUrl = this.baseUrl + 'getUsersByBUId';
  private updatePanelUsersUrl = this.baseUrl + 'updatePanelUsers';

  userReg: UserReg[];
  getUsersList(): Observable<UserReg[]> {
    return this.httpClient.get<UserReg[]>(`${this.getUsersUrl}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
        'Content-Type': 'application/json',
      },
    });
  }

  getRecruitersList(): Observable<UserReg[]> {
    return this.httpClient.get<UserReg[]>(`${this.getRecruitersUrl}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
        'Content-Type': 'application/json',
      },
    });
  }

  newUser(User: UserReg): Observable<Object> {
    return this.httpClient.post(`${this.postUsersUrl}`, User, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  // searchUserByKey(keyword: string): Observable<UserReg[]> {
  //   return this.httpClient.get<UserReg[]>(`${this.searchUserUrl}/${keyword}`, {
  //     headers: {
  //       'pro-api-key': 'h1r5pr0',
  //     },
  //   });
  // }

  getUserById(id: string): Observable<UserReg> {
    return this.httpClient.get<UserReg>(`${this.getUsersByIdUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  getAllUsersByBUId(id: string): Observable<UserReg> {
    return this.httpClient.get<UserReg>(`${this.getAllUsersByBUIdUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  getAllUsersByRoleId(id: string): Observable<UserReg> {
    return this.httpClient.get<UserReg>(
      `${this.getAllUsersByRoleIdUrl}/${id}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  getUsersByBUId(id: string): Observable<UserReg> {
    return this.httpClient.get<UserReg>(`${this.getUsersByBUIdUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  checkUserName(UserName: string): Observable<Object> {
    return this.httpClient.post(`${this.UsernamecheckUrl}`, UserName, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  updateUser(User: UserReg): Observable<Object> {
    return this.httpClient.put<UserReg>(`${this.putUsersUrl}`, User, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  searchUser(search: UserRegSearch): Observable<Object> {
    return this.httpClient.post<UserRegSearch>(
      `${this.searchUserUrl}`,
      search,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  updatePanelUsers(id: string, userIds: any): Observable<Object> {
    return this.httpClient.put<UserReg>(
      `${this.updatePanelUsersUrl}/${id}`,
      userIds,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  deleteUser(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.deleteUserUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }
}
