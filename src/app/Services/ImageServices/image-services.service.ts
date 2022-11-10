import { resume } from './../../Models/Resume';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageUpload } from 'src/app/Models/image';
import { apiUrl } from '../GlobalConstants';

@Injectable({
  providedIn: 'root',
})
export class ImageServicesService {
  constructor(private httpClient: HttpClient) {}
  private baseUrl: string = apiUrl.url;
  //User Reg URL
  private getUsersUrl = this.baseUrl + 'getImageByName';
  private postImageUrl = this.baseUrl + 'uploadImage';
  private deleteImageUrl = this.baseUrl + 'deleteImageByName';

  image: ImageUpload[];
  getUserImg(imgName: string): Observable<ImageUpload[]> {
    return this.httpClient.get<ImageUpload[]>(
      `${this.getUsersUrl}/${imgName}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  newImage(image: any, imgName: string, imageType: string): Observable<Object> {
    //console.log(image);

    return this.httpClient.post(
      `${this.postImageUrl}/${imgName}/${imageType}`,
      image,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  deleteImageByName(ImgName: string): Observable<Object> {
    return this.httpClient.delete(`${this.deleteImageUrl}/${ImgName}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  //Resume Upload URL
  private getResumeUrl = this.baseUrl + 'getResume';
  private uploadResumeUrl = this.baseUrl + 'uploadResume';
  private deleteResumeUrl = this.baseUrl + 'deleteResume';

  resume: resume[];
  getResume(resumeName: string): Observable<resume[]> {
    return this.httpClient.get<resume[]>(`${this.getResumeUrl}/${resumeName}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
        'Content-Type': 'application/json',
      },
    });
  }

  newResume(
    resume: any,
    resumeName: string,
    resumeType: string
  ): Observable<Object> {
    //console.log(image);

    return this.httpClient.post(
      `${this.uploadResumeUrl}/${resumeName}/${resumeType}`,
      resume,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  deleteResume(resumeName: string): Observable<Object> {
    return this.httpClient.delete(`${this.deleteResumeUrl}/${resumeName}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }
}
