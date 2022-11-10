import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PythonServiceService {
  constructor(private httpClient: HttpClient) {}
  private baseUrl: string = 'http://127.0.0.1:5000/';

  private resumeAnalyseUrl = this.baseUrl + 'parse_table';

  parseTable(file: File, jd: string, jdnum: string) {
    const formData: FormData = new FormData();
    console.log(file);
    console.log(file.name);
    formData.append('file', file, file.name);
    console.log(formData);
    formData.append('jd', jd);
    formData.append('jdNum', jdnum);
    return this.httpClient.post(this.resumeAnalyseUrl, formData);
  }
}
