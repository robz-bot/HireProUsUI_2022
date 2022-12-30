import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PythonServiceService {
  constructor(private httpClient: HttpClient) {}
  private baseUrl: string = 'http://127.0.0.1:5000/';
  // private baseUrl: string = 'http://52.91.195.253:5000/';

  private resumeAnalyseUrl = this.baseUrl + 'parse_table';

  parseTable(file: File, jd: string, jdnum: string,source:string,userId:string) {
    const formData: FormData = new FormData();
    console.log(file);
    console.log(file.name);
    formData.append('file', file, file.name);
    console.log(formData);
    formData.append('jd', jd);
    formData.append('jrNumber', jdnum);
    formData.append('source', source);
    formData.append('userId', userId);
    return this.httpClient.post(this.resumeAnalyseUrl, formData);
  }
}
