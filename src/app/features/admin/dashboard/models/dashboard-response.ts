import { Activity } from "./activities";
import { BankServiceStatistic } from "./bankService-statistics";
import { DashboardSummary } from "./dashboard-summary";
import { HourlyStatistic } from "./hourly-statistic";
import { RecentTicket } from "./recent-ticket";

export interface DashboardResponse{

    summary:DashboardSummary;

    hourlyStatistics:HourlyStatistic[];

    serviceStatistics:BankServiceStatistic[];

    recentTickets:RecentTicket[];

    recentActivities:Activity[];

}