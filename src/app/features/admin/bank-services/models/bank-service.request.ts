export interface BankServiceRequest{
     code:string
    name:string
    prefix:string
    branchId:number
    description:string;
    estimatedDurationMinutes:number;
    priority:number;
    active:boolean;

}