import { RoleEnum } from "../enums/role-enum";
import { AuthenticatedUser } from "./authenticated-user";

export interface LoginResponse {
 token: string;
  refreshToken: string;
  expiresIn: number;
  tokenType:string;
 id: number;
 username: string;
 firstname: string;
 lastname: string;
   role: RoleEnum;
   email:string;
 branchId:number;

}
