import { RoleEnum } from "../../../auth/enums/role-enum";

export interface UserEntity {

    id: number;

    username: string;

    firstName: string;

    lastName: string;
    lastLogin:Date
    email: string;

    phone: string;

    enabled: boolean;

     locked: boolean;

    branch_id: number;

    branchName: string;

    role_id:number
    role: RoleEnum;

    deletedAt:Date


}