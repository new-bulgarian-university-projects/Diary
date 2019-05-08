import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from '../utils/AppConfigService';
import { Injectable } from '@angular/core';
import { Entry } from 'src/models/entry';
import {formatDate} from '@angular/common';

@Injectable()
export class EntryService {
  private baseUrl: String;
  constructor(private appConfig: AppConfigService,
              private httpClient: HttpClient) {
      this.baseUrl = this.appConfig.apiBaseUrl;
  }

  getAllEntries(): Observable<Entry[]> {
    return this.httpClient.get<Entry[]>(this.baseUrl + '/entries');
  }

  getEntryById(id: string): Observable<Entry> {
    if (!id) {
      return null;
    }
    return this.httpClient.get<Entry>(this.baseUrl + '/entries/' + id);
  }

  getEntriesForUser(userId: string): Observable<Entry[]> {
    if (!userId) {
      return null;
    }
    return this.httpClient.get<Entry[]>(this.baseUrl + `/users/${userId}/entries`);
  }

  formatDate(entry: Entry): string {
    if (!entry) {
      return null;
    }
    return formatDate(entry.createdAt, 'dd/MM/yyyy hh:mm:ss a', 'en');
  }
}
