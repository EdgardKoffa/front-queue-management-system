export interface PageResponse<T> {

    data: T[];

    totalElements: number;

    totalPages: number;
    page:number
    number: number;

    size: number;

    first: boolean;

    last: boolean;
    date:Date
    message:string
     success:boolean

}