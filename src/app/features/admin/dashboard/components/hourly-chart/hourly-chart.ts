import { Component, input } from '@angular/core';

import { NgxEchartsDirective } from 'ngx-echarts';
import { PRIMENG_IMPORTS } from '../../../../../shared/primeNG/primeng.imports';

@Component({
  selector: 'app-hourly-chart',
  standalone: true,
  imports: [NgxEchartsDirective,
...PRIMENG_IMPORTS
  ],
  templateUrl: './hourly-chart.html',
  styleUrl: './hourly-chart.css'
})
export class HourlyChart {

  options = input<any>();

}