import { Injectable } from "@angular/core";
import { BaseCrudService } from "../../../../core/services/base-crud.service";
import { CounterResponse } from "../models/counter-response";
import { CounterRequest } from "../models/counter-request";
import { Endpoints } from "../../../../configuration/endpoint";
import { CounterStatus } from "../enums/counter-status";
import { ApiResponse } from "../../../../core/models/api-responses";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class CounterService extends BaseCrudService<CounterResponse,CounterRequest>{
    protected override apiUrl: string=Endpoints.counters.base;

      changeStatus(id:number,status:CounterStatus):Observable<ApiResponse<CounterResponse>>{
        
                return this.http.patch <ApiResponse<CounterResponse>>(`${this.apiUrl}/${id}/status/${status}`, {});
        
            }
counterOpen(id:number,status:CounterStatus):Observable<ApiResponse<CounterResponse>>{
        
                return this.http.patch <ApiResponse<CounterResponse>>(`${this.apiUrl}/${id}/open`, {});
        
            }
counterClose(id:number,status:CounterStatus):Observable<ApiResponse<CounterResponse>>{
        
                return this.http.patch <ApiResponse<CounterResponse>>(`${this.apiUrl}/${id}/close`, {});
        
            }
changeActivate(id:number,isactive:boolean):Observable<ApiResponse<CounterResponse>>{
        
                return this.http.patch <ApiResponse<CounterResponse>>(`${this.apiUrl}/${id}/isactivate/${isactive}`, {});
        
            }

assignOperator(id:number,operatorId:number):Observable<ApiResponse<CounterResponse>>{
        
                return this.http.patch <ApiResponse<CounterResponse>>(`${this.apiUrl}/${id}/assign/${operatorId}`, {});
        
            }
releaseOperator(id:number):Observable<ApiResponse<CounterResponse>>{
        
                return this.http.patch <ApiResponse<CounterResponse>>(`${this.apiUrl}/${id}/release`, {});
        
            }
}