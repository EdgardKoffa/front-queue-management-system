import { inject, Injectable } from "@angular/core";
import { BranchResponse } from "../models/branch.respons";
import { BranchRequest } from "../models/branch-request";
import { BaseCrudService } from "../../../../core/services/base-crud.service";
import { HttpClient } from "@angular/common/http";
import { Endpoints } from "../../../../configuration/endpoint";
import { StatusEnum } from "../../../../shared/enums/status.enum";
import { Observable } from "rxjs";
import { ApiResponse } from "../../../../core/models/api-responses";
import { AgencyResponse } from "../../agencies/models/agency-response";

@Injectable({
    providedIn:'root'
})
export class BranchService extends BaseCrudService<BranchResponse,BranchRequest>{

    protected readonly apiUrl=Endpoints.branches.base;

      changeStatus(id:number,status:StatusEnum):Observable<ApiResponse<AgencyResponse>>{
    
            return this.http.patch <ApiResponse<AgencyResponse>>(`${this.apiUrl}/${id}/status/${status}`, {});
    
        }

}