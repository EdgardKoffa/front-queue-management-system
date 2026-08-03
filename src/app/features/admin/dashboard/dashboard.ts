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
import { isLangFr } from '../../../shared/utils';
import { hourlyOptionsType, pieChartType, setPieChart } from './service/types';
import { RecentTickets } from './components/recent-tickets/recent-tickets';
import { RecentTicket } from './models/recent-ticket';
import { RecentActivities } from './components/recent-activities/recent-activities';
import { Activity } from './models/activities';

@Component({
  selector: 'app-dashboard',
   standalone:true,
  imports: [
    ...PRIMENG_IMPORTS,
    StatCard,
    HourlyChart,
    ServiceChart,
    RecentTickets,
    RecentActivities
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit,OnDestroy {
  private readonly testData=[

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

  readonly labels=LABELS
  private readonly websocket =
    inject(WebSocketService);

    private readonly session =
    inject(SessionService);
  private readonly dashboardService =
    inject(DashboardService);

summary = signal<DashboardSummary | null>(null);

dashboard=signal<DashboardResponse | null>(null)

 hourlyOptions:hourlyOptionsType = {

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
serviceOptions:pieChartType=setPieChart(this.testData,"75%","item")
recentTicketsData:RecentTicket[]=[]

activities:Activity[]=[]
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
      console.log("loadDashboard success",response)
      this.initializeCharts(response.data)
    },
    error:(err)=>{
      console.warn("loadDashboard err",err)
      return
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

    

    const hourlyChart=data.hourlyStatistics

    const summary=data.summary

    const recentTickets=data.recentTickets

    const activities=data.recentActivities
   
    if(hourlyChart){
    this.hourlyOptions ={

       tooltip:{

        trigger:'axis'

    },
        xAxis:{
          type:'category',
            data:hourlyChart.map(h=>h.hour)

        },

        yAxis:{
          type:'value'
        },

        series:[

            {

                data:hourlyChart.map(h=>h.count),

                type:'line',

                smooth:true

            }

        ]

    }

    if(summary){
      this.summary.set(summary)
    }

    if(data?.serviceStatistics?.length>0){
      const serviceChart=data?.serviceStatistics?.map((d)=>{
        return {value:d.totalTickets,name:d?.service}
      })
     this.serviceOptions= setPieChart(serviceChart,"70%","item")
    }
    if(recentTickets&&recentTickets?.length>0){
      this.recentTicketsData=recentTickets
    }
    if(activities&&activities?.length>0){
      this.activities=activities
    }
}


}

}
