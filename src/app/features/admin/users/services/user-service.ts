import { Injectable } from "@angular/core";
import { BaseCrudService } from "../../../../core/services/base-crud.service";
import { UserResponse } from "../models/user-response";
import { UserRequest } from "../models/user-request";
import { Endpoints } from "../../../../configuration/endpoint";
import { ApiResponse } from "../../../../core/models/api-responses";



@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseCrudService<UserResponse,UserRequest> {
    protected override apiUrl: string=Endpoints.users.base;

    changeUserBankBranch(id:number,branchId:number){
        
        return this.http.patch<ApiResponse<UserResponse>>(`${this.apiUrl}/${id}/branch/${branchId}`,{})
    }

    changeUserRole(id:number,roleId:number){
        
        return this.http.patch<ApiResponse<UserResponse>>(`${this.apiUrl}/${id}/role/${roleId}`,{})
    }

    enable_desableUserRole(id:number,isEnabled:boolean){
        
        return this.http.patch<ApiResponse<UserResponse>>(`${this.apiUrl}/${id}/status?isEnable=${isEnabled}`,{})
    }

     lock_unlockUserRole(id:number,islocked:boolean){
        
        return this.http.patch<ApiResponse<UserResponse>>(`${this.apiUrl}/${id}/state?islocked=${islocked}`,{})
    }

}