import { inject, Injectable, signal } from '@angular/core';

import { Observable, of, tap } from 'rxjs';

import { Agency } from '../../features/admin/agencies/models/agency';
import { Branch } from '../../features/admin/branches/models/branch';

import { AgencyService } from '../../features/admin/agencies/services/agency.service';
import { ApiResponse } from '../models/api-responses';
import { BranchService } from '../../features/admin/branches/service/branch.service';

@Injectable({
    providedIn: 'root'
})
export class LookupService {

    private readonly agencyService = inject(AgencyService);

    private readonly branchService = inject(BranchService);

    getAgencies(): Observable<ApiResponse<Agency[]>> {

        return this.agencyService.findAll();

    }

   // private agencies = signal<Agency[]>([]);
   /*  getCachedAgencies() {

    if (this.agencies().length > 0) {
        
        return of(this.agencies());

    }

    return this.agencyService.findAll().pipe(

        tap(response => this.agencies.set(response.data))

    );

}
 */
    getBranches(): Observable<ApiResponse<Branch[]>> {

        return this.branchService.findAll();

    }

}