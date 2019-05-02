import { Entry } from './entry.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from '../utils/AppConfigService';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class EntryService {
  constructor(private appConfig: AppConfigService,
              private httpClient: HttpClient) {
  }

  getAllEntries(): Observable<Entry[]> {
    const url = this.appConfig.apiBaseUrl;
    console.log('URL from config: ' + url);
    return this.httpClient.get<Entry[]>(url + '/entries');
  }
};
