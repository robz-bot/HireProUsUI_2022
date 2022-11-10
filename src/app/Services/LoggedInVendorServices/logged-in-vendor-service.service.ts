import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { forgetPassword } from 'src/app/Models/forgetPassword';
import { vendorReg } from 'src/app/Models/Vendor Models/vendorReg';
import { apiUrl } from '../GlobalConstants';

@Injectable({
  providedIn: 'root',
})
export class LoggedInVendorServiceService {
  constructor(private httpClient: HttpClient) {}
  private baseUrl: string = apiUrl.url;

  private loginVendorUrl = this.baseUrl + 'loginVendor';
  private resetPasswordVendorUrl = this.baseUrl + 'resetPasswordVendor';
  private checkVendorIdAndSendOtpVendorUrl =
    this.baseUrl + 'checkVendorIdAndSendOtpVendor';
  private checkOtpVendorUrl = this.baseUrl + 'checkOtpVendor';
  private changePasswordVendorUrl = this.baseUrl + 'changePasswordVendor';

  loginVendor(vendor: vendorReg): Observable<Object> {
    return this.httpClient.post(`${this.loginVendorUrl}`, vendor, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  changePasswordVendor(User: vendorReg): Observable<Object> {
    return this.httpClient.put<vendorReg>(
      `${this.changePasswordVendorUrl}`,
      User,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  resetPasswordVendor(fPass: forgetPassword): Observable<Object> {
    return this.httpClient.put<forgetPassword>(
      `${this.resetPasswordVendorUrl}`,
      fPass,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  checkVendorIdAndSendOtpVendor(vendorId: string) {
    return this.httpClient.put<forgetPassword>(
      `${this.checkVendorIdAndSendOtpVendorUrl}`,
      vendorId,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  checkOtpVendor(vendorIdAndOtp: string) {
    return this.httpClient.put<forgetPassword>(
      `${this.checkOtpVendorUrl}`,
      vendorIdAndOtp,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }
}
