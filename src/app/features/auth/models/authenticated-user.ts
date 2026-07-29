import { RoleEnum } from "../enums/role-enum";

export interface AuthenticatedUser {
id: number;
username: string;
firstname: string;
lastname: string;
  role: RoleEnum;
  email:string;
branchId:number;
}
