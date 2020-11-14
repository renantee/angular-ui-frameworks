import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { StoreSessions } from '../models/store-sessions';
import { StoreSummary } from '../models/store-summary';

import StoreSessionsJson from '../json/store-sessions.json';
import StoreSummaryJson from '../json/store-summary.json';

@Injectable({
  providedIn: 'root'
})
export class StoreSummaryService {
  getStoreSessions(): Observable<StoreSessions[]> {
    return of(StoreSessionsJson);
  }

  getStoreSummary(): Observable<StoreSummary[]> {
    return of(StoreSummaryJson);
  }

  constructor() { }
}