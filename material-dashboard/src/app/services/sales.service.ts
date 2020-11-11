import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MonthlySales } from '../models/monthly-sales';
import SalesJson from '../json/sales.json';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  getSalesByMonth(): Observable<MonthlySales[]> {
    return of(SalesJson);
  }

  constructor() { }
}