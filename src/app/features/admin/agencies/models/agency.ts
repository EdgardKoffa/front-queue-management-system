import { StatusEnum } from "../../../../shared/enums/status.enum";

export interface Agency{

    id:number;

    code:string;

    name:string;

    phone:string;

    email:string;

    city:string;

    address:string;

    status:StatusEnum;

}