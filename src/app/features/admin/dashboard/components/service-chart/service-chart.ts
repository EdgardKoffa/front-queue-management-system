import { Component, input } from '@angular/core';
import { PRIMENG_IMPORTS } from '../../../../../shared/primeNG/primeng.imports';
import { NgxEchartsDirective } from 'ngx-echarts';

@Component({
  selector: 'app-service-chart',
  imports: [NgxEchartsDirective,
    ...PRIMENG_IMPORTS
  ],
  templateUrl: './service-chart.html',
  styleUrl: './service-chart.css',
})
export class ServiceChart {
 options = input<any>();
 

}
