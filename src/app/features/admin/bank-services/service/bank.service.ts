import { inject, Injectable } from "@angular/core";
import { BaseCrudService } from "../../../../core/services/base-crud.service";
import { HttpClient } from "@angular/common/http";
import { Endpoints } from "../../../../configuration/endpoint";
import { StatusEnum } from "../../../../shared/enums/status.enum";
import { Observable } from "rxjs";
import { BankServiceResponse } from "../models/bank-service.response";
import { BankServiceRequest } from "../models/bank-service.request";
import { ApiResponse } from "../../../../core/models/api-responses";

@Injectable({
    providedIn:'root'
})
export class Bank_serviceService extends BaseCrudService<BankServiceResponse,BankServiceRequest>{

    protected readonly apiUrl=Endpoints.service.base;
     changeActiveState(id:number,isactive:boolean):Observable<ApiResponse<BankServiceResponse>>{
    
            return this.http.patch <ApiResponse<BankServiceResponse>>(`${this.apiUrl}/${id}/isactive/${isactive}`, {});
    
        } 

}