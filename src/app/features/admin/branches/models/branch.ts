import { StatusEnum } from "../../../../shared/enums/status.enum";

export interface Branch {

    id:number;

    code:string;

    name:string;

    phone:string;

    email:string;

    city:string;

    address:string;

    status:StatusEnum;

    agencyId:number;

    agencyName:string;
    createdAt:Date
    deletedAt:Date
}