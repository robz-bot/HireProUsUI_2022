import { Router, ActivatedRoute } from '@angular/router';
import { apiUrl } from '../GlobalConstants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserReg } from 'src/app/Models/UserReg';
import { forgetPassword } from 'src/app/Models/forgetPassword';

@Injectable({
  providedIn: 'root',
})
export class EntryLoginServicesService {
  constructor(
    private httpClient: HttpClient,
    private _router: Router,
    private router: ActivatedRoute
  ) {}

  private baseUrl: string = apiUrl.url;

  //Login URL
  private loginUrl = this.baseUrl + 'login';
  private changePassUrl = this.baseUrl + 'changePassword';
  private updateProfileUrl = this.baseUrl + 'updateProfile';
  private checkEmailAndSendOtpUrl = this.baseUrl + 'checkEmailAndSendOtp ';
  private checkOtpUrl = this.baseUrl + 'checkOtp ';
  private resetPasswordUrl = this.baseUrl + 'resetPassword';

  loginData: any;
  LoginUser(User: UserReg): Observable<Object> {
    return this.httpClient.post(`${this.loginUrl}`, User, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  maintainUserSession(data: {
    mainMenus: string;
    subMenus: string;
    id: string;
    email: string;
    fullName: string;
    roleName: string;
    businessUnitId: string;
  }) {
    console.log(data);
    sessionStorage.setItem('mainMenuNames', data.mainMenus);
    sessionStorage.setItem('subMenuNames', data.subMenus);
    sessionStorage.setItem('currentUserId', data.id);
    sessionStorage.setItem('currentUserBUId', data.businessUnitId);
    sessionStorage.setItem('currentUserEmail', data.email);
    sessionStorage.setItem('currentUserName', data.fullName);
    sessionStorage.setItem('Role', data.roleName);
    sessionStorage.setItem('isLoggedIn', 'true');
  }

  clearUserSession() {
    sessionStorage.clear();
  }

  ChangePass(User: UserReg): Observable<Object> {
    return this.httpClient.put<UserReg>(`${this.changePassUrl}`, User, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  resetPassword(fPass: forgetPassword): Observable<Object> {
    return this.httpClient.put<forgetPassword>(
      `${this.resetPasswordUrl}`,
      fPass,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  checkEmailAndSendOtp(email: string) {
    return this.httpClient.put<forgetPassword>(
      `${this.checkEmailAndSendOtpUrl}`,
      email,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  checkOtp(emailAndOtp: string) {
    return this.httpClient.put<forgetPassword>(
      `${this.checkOtpUrl}`,
      emailAndOtp,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  UpdateProfile(User: UserReg): Observable<Object> {
    return this.httpClient.put<UserReg>(`${this.updateProfileUrl}`, User, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }
}

