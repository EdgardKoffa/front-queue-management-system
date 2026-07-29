import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PRIMENG_IMPORTS } from '../../../shared/primeNG/primeng.imports';
import { StatCard } from './components/stat-card/stat-card';
import { LABELS } from '../../auth/pages/login/login-labels';
import { DashboardService } from './service/dashboard.service';
import { WebSocketService } from '../../../core/services/websocket.service';
import { SessionService } from '../../auth/services/session.service';
import { HourlyChart } from './components/hourly-chart/hourly-chart';
import { ServiceChart } from './components/service-chart/service-chart';
import { DashboardSummary } from './models/dashboard-summary';
import { DashboardResponse } from './models/dashboard-response';

@Component({
  selector: 'app-dashboard',
   standalone:true,
  imports: [
    ...PRIMENG_IMPORTS,
    StatCard,
    HourlyChart,
    ServiceChart
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit,OnDestroy {
  
  readonly labels=LABELS
  private readonly websocket =
    inject(WebSocketService);

    private readonly session =
    inject(SessionService);
  private readonly dashboardService =
    inject(DashboardService);

summary = signal<DashboardSummary | null>(null);

dashboard=signal<DashboardResponse | null>(null)

 hourlyOptions = {

    tooltip:{

        trigger:'axis'

    },

    xAxis:{

        type:'category',

        data:[
            '08h',
            '09h',
            '10h',
            '11h',
            '12h',
            '13h',
            '14h',
            '15h',
            '16h'
        ]

    },

    yAxis:{

        type:'value'

    },

    series:[

        {

            data:[
                8,
                12,
                25,
                30,
                18,
                15,
                22,
                28,
                10
            ],

            type:'line',

            smooth:true

        }

    ]

};
readonly  serviceOptions={

    tooltip:{

        trigger:'item'

    },

    series:[

        {

            type:'pie',

            radius:'70%',

            data:[

                {

                    value:120,

                    name:'Retrait'

                },

                {

                    value:90,

                    name:'Versement'

                },

                {

                    value:40,

                    name:'Transfert'

                },

                {

                    value:35,

                    name:'Chèque'

                }

            ]

        }

    ]

};
private loadSummary():void{
   this.dashboardService
        .getTestSummary()
        .subscribe({

            next:(response)=>{
              //console.info("get summary",response)
                this.summary.set(response?.data);

            },
            error(err) {
              console.warn("dashboard summary error ",err)
            },

        });

}

private loadDashboard():void{
   this.dashboardService
   .getDashboard()
   .subscribe({
    next:(response)=>{

    },
    error:(err)=>{

    }
   })
}
ngOnInit():void{
  const branchId =
    this.session.getUser()?.branchId;
    if(branchId){

    this.websocket.connect(

        branchId,

        (message)=>{
          console.log("web socket message ===>",message)
           // this.loadSummary();
            this.dashboard.set(message);

        }

    );

}
this.loadDashboard()
this.loadSummary();
}
ngOnDestroy(): void {
    this.websocket.disconnect()
  }

  private initializeCharts(data:DashboardResponse){

    this.hourlyOptions = data?{

        xAxis:{

            data:data.hourlyStatistics.map(h=>h.hour)

        },

        series:[

            {

                data:data.hourlyStatistics.map(h=>h.count),

                type:'line',

                smooth:true

            }

        ]

    }:;

}
}
