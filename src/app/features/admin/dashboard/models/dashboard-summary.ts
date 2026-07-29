import { InputNumberTemplates } from "primeng/types/inputnumber";

export interface DashboardSummary {

    waitingTickets:number;

    completedTickets:number;

    activeCounters:number;
busyCounters:number
    averageWaitingTime:number;

  calledTickets:number

  closedCounters:number

  averageServiceTime:InputNumberTemplates

}
