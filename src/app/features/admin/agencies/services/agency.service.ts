import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Agency } from '../models/agency';
import { AgencyRequest } from '../models/agency-request';
import { Endpoints } from '../../../../configuration/endpoint';
import { BaseCrudService } from '../../../../core/services/base-crud.service';
import { AgencyResponse } from '../models/agency-response';
import { StatusEnum } from '../../../../shared/enums/status.enum';
import { ApiResponse } from '../../../../core/models/api-responses';

@Injectable({
    providedIn:'root'
})
export class AgencyService extends BaseCrudService<AgencyResponse,AgencyRequest>{
    protected override readonly apiUrl: string=Endpoints.agencies.base;
     changeStatus(id:number,status:StatusEnum):Observable<ApiResponse<AgencyResponse>>{

        return this.http.patch <ApiResponse<AgencyResponse>>(`${this.apiUrl}/${id}/status/${status}`, {});

    }
   /*  private readonly http = inject(HttpClient);


    findAll():Observable<Agency[]>{

        return this.http.get<Agency[]>(this.apiUrl);

    }

    findById(id:number):Observable<Agency>{

        return this.http.get<Agency>(`${this.apiUrl}/${id}`);

    }

    create(dto:AgencyRequest){

        return this.http.post(this.apiUrl,dto);

    }

   

    delete(id:number){

        return this.http.delete(`${this.apiUrl}/${id}`);

    } */

}