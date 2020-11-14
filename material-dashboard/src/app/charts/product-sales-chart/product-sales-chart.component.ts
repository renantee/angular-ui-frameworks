import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

import { SalesService } from '../../services/sales.service';

@Component({
  selector: 'app-product-sales-chart',
  templateUrl: './product-sales-chart.component.html',
  styleUrls: ['./product-sales-chart.component.css']
})
export class ProductSalesChartComponent implements OnInit {
  public radarChartOptions: ChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = [];
  public radarChartData: ChartDataSets[] = [
    { data: [], label: 'Series A' },
    { data: [], label: 'Series B' }
  ];
  public radarChartType: ChartType = 'radar';

  constructor(private salesService: SalesService) { }

  ngOnInit() {
    this.salesService.getProductSales().subscribe({
      next: salesItems => {
        salesItems.forEach(li => {
          this.radarChartData[0].data.push(li.a);
          this.radarChartData[1].data.push(li.b);
          this.radarChartLabels.push(li.category);
        });
      }
    });
  }
}
