export interface BankService{
    id:number
    code:string
    name:string

    prefix:string
    branchId:number
    branchName:string
    description:string;
    estimatedDurationMinutes:number;
    priority:number;
    active:boolean;
    deletedAt:Date

}