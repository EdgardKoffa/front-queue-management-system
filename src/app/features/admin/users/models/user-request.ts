export interface UserRequest {

    username: string;

    firstName: string;

    lastName: string;

    email: string;

    phone: string;

    password?: string;

    branch_id: number;

    role_id: number;

    enabled: boolean;
    locked: boolean;

}