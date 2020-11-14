import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

import { StoreSummaryService } from '../../services/store-summary.service';

@Component({
  selector: 'app-store-sessions-chart',
  templateUrl: './store-sessions-chart.component.html',
  styleUrls: ['./store-sessions-chart.component.css']
})
export class StoreSessionsChartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Series A' },
    { data: [], label: 'Series B' }
  ];

  constructor(private storeSummaryService: StoreSummaryService) { }

  ngOnInit() {
    this.storeSummaryService.getStoreSessions().subscribe({
      next: sessionItems => {
        sessionItems.forEach(li => {
          this.barChartData[0].data.push(li.a);
          this.barChartData[1].data.push(li.b);
          this.barChartLabels.push(li.year);
        });
      }
    });
  }
}
