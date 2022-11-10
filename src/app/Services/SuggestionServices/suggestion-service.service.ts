import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { searchSuggestion } from 'src/app/Models/searchSugestion';
import { suggestion } from 'src/app/Models/suggestion';
import { apiUrl } from '../GlobalConstants';

@Injectable({
  providedIn: 'root',
})
export class SuggestionServiceService {
  constructor(private httpClient: HttpClient) {}
  //Base URL
  private baseUrl: string = apiUrl.url;

  //Suggestion URL
  private addSuggestionUrl = this.baseUrl + 'addSuggestion';
  private getAllSuggestionsUrl = this.baseUrl + 'getAllSuggestions';
  private getSuggestionUrl = this.baseUrl + 'getSuggestion';
  private updateSuggestionUrl = this.baseUrl + 'updateSuggestion';
  private searchSuggestionUrl = this.baseUrl + 'searchSuggestion';
  private getAllSuggestionIdsUrl = this.baseUrl + 'getAllSuggestionIds';

  getAllSuggestions(): Observable<suggestion[]> {
    return this.httpClient.get<suggestion[]>(`${this.getAllSuggestionsUrl}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
        'Content-Type': 'application/json',
      },
    });
  }

  getAllSuggestionIds(): Observable<any> {
    return this.httpClient.get<any>(`${this.getAllSuggestionIdsUrl}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
        'Content-Type': 'application/json',
      },
    });
  }

  addSuggestion(addSuggestion: suggestion): Observable<Object> {
    return this.httpClient.post(`${this.addSuggestionUrl}`, addSuggestion, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  getSuggestion(id: string): Observable<suggestion> {
    return this.httpClient.get<suggestion>(`${this.getSuggestionUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  updateSuggestion(sug: suggestion): Observable<Object> {
    return this.httpClient.put<suggestion>(`${this.updateSuggestionUrl}`, sug, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  searchSuggestion(seachDto: searchSuggestion): Observable<suggestion> {
    return this.httpClient.put<suggestion>(
      `${this.searchSuggestionUrl}`,
      seachDto,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }
}
