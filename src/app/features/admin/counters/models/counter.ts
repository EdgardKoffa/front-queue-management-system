import { CounterStatus } from "../enums/counter-status";

export interface Counter {

    id:number;

    number:number;

    code:string;

    name:string;

    branchId:number;

    branchName:string;

    status:CounterStatus;

    active:boolean;

    operatorId:number

    operatorUserName:string
    createdAt:Date
     deletedAt:Date
}