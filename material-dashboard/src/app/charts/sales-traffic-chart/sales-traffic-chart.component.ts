import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

import { SalesService } from '../../services/sales.service';

@Component({
  selector: 'app-sales-traffic-chart',
  templateUrl: './sales-traffic-chart.component.html',
  styleUrls: ['./sales-traffic-chart.component.css']
})
export class SalesTrafficChartComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private salesService: SalesService) { }

  ngOnInit() {
    this.salesService.getSalesTraffic().subscribe({
      next: salesItems => {
        salesItems.forEach(li => {
          this.pieChartData.push(li.value);
          this.pieChartLabels.push(li.category);
        });
      }
    });
  }
}
