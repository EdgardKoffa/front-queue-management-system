import { inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { PageResponse } from '../models/page-response';
import { PageRequest } from '../models/page-request';
import { ApiResponse } from '../models/api-responses';

export abstract class BaseCrudService<TResponse, TRequest> {

  protected readonly http = inject(HttpClient);

  /**
   * Chaque service enfant devra fournir son endpoint.
   */
  protected abstract readonly apiUrl: string;

  findPage(request: PageRequest): Observable<PageResponse<TResponse>> {

    let params = new HttpParams()
      .set('page', request.page)
      .set('size', request.size);//limit

    if (request.sortField) {
      params = params.set(
        'sort',
        `${request.sortField},${request.sortOrder ?? 'asc'}`
      );
    }

    if (request.search?.trim()) {
      params = params.set('search', request.search);
    }


    return this.http.get<PageResponse<TResponse>>(this.apiUrl, { params });

  }

findAll(): Observable<ApiResponse<TResponse[]>> {
    return this.http.get<ApiResponse<TResponse[]>>(`${this.apiUrl}/all`);

  }

  findById(id: number | string): Observable<ApiResponse<TResponse>> {

    return this.http.get<ApiResponse<TResponse>>(`${this.apiUrl}/${id}`);

  }

  create(dto: TRequest): Observable<ApiResponse<TResponse>> {

    return this.http.post<ApiResponse<TResponse>>(this.apiUrl, dto);

  }

  update(id: number | string, dto: TRequest): Observable<ApiResponse<TResponse>> {

    return this.http.put<ApiResponse<TResponse>>(`${this.apiUrl}/${id}`, dto);

  }

  delete(id: number | string): Observable<ApiResponse<void>> {

    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);

  }


}