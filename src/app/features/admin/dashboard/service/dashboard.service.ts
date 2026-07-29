import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiResponse } from '../../../../core/models/api-responses';
import { Endpoints } from '../../../../configuration/endpoint';
import { DashboardSummary } from '../models/dashboard-summary';
import { DashboardResponse } from '../models/dashboard-response';

@Injectable({
    providedIn:'root'
})
export class DashboardService{

    private readonly http=inject(HttpClient);

    getTestSummary():Observable<ApiResponse<DashboardSummary>>{

        return this.http.get<ApiResponse<DashboardSummary>>(
            Endpoints.dashboard.base+'/test/summary'
        );

    }
    getDashboard():Observable<ApiResponse<DashboardResponse>>{

        return this.http.get<ApiResponse<DashboardResponse>>(
            Endpoints.dashboard.base
        );

    }

}