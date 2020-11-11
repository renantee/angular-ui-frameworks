import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { StoreSummary } from '../models/store-summary';
import StoreSummaryJson from '../json/store-summary.json';

@Injectable({
  providedIn: 'root'
})
export class StoreSummaryService {
  getStoreSummary(): Observable<StoreSummary[]> {
    return of(StoreSummaryJson);
  }

  constructor() { }
}