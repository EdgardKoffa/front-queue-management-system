export interface PageRequest {

    page: number;

    size: number;

    sortField?: string;

    sortOrder?: 'asc' | 'desc';

    search?: string;
   

}