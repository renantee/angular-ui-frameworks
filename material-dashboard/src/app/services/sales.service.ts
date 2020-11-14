import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MonthlySales } from '../models/monthly-sales';
import { ProductSales } from '../models/product-sales';
import { SalesTraffic } from '../models/sales-traffic';

import ProductSalesJson from '../json/product-sales.json';
import SalesJson from '../json/sales.json';
import SalesTrafficJson from '../json/sales-traffic.json';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  getProductSales(): Observable<ProductSales[]> {
    return of(ProductSalesJson);
  }

  getSalesByMonth(): Observable<MonthlySales[]> {
    return of(SalesJson);
  }

  getSalesTraffic(): Observable<SalesTraffic[]> {
    return of(SalesTrafficJson);
  }

  constructor() { }
}