import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from '../utils/AppConfigService';
import { Injectable } from '@angular/core';
import { Entry } from 'src/models/entry';
import {formatDate} from '@angular/common';
import { Tag } from 'src/models/tag';
import { Scope } from 'src/models/scope';
import { NewEntry } from 'src/models/new-entry';

@Injectable()
export class EntryService {
  private baseUrl: string;
  constructor(private appConfig: AppConfigService,
              private httpClient: HttpClient) {
      this.baseUrl = this.appConfig.apiBaseUrl;
  }

  getAllEntries(params: any = null): Observable<Entry[]> {
    return this.httpClient.get<Entry[]>(this.baseUrl + '/entries',  {params: params});
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

  createAnEntry(entry: NewEntry) {
    return this.httpClient.post(this.baseUrl + '/entries', entry);
  }

  getAllTags(): Observable<Tag[]> {
    return this.httpClient.get<Tag[]>(this.baseUrl + '/tags');
  }

  getAllScopes(): Observable<Scope[]> {
    return this.httpClient.get<Scope[]>(this.baseUrl + '/scopes');
  }

  formatDate(entry: Entry): string {
    if (!entry) {
      return null;
    }
    return formatDate(entry.createdAt, 'dd/MM/yyyy hh:mm:ss a', 'en');
  }
}
