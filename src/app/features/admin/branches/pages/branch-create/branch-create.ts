import { Component, inject, input, signal } from '@angular/core';
import { Agency } from '../../../agencies/models/agency';
import { Branch } from '../../models/branch';
import { BranchService } from '../../service/branch.service';
import { AgencyService } from '../../../agencies/services/agency.service';
import { headerLabels } from '../../../../../shared/constants';
import { NavigationService } from '../../../../../core/services/navigation.service';

@Component({
  selector: 'app-branch-create',
  imports: [],
  templateUrl: './branch-create.html',
  styleUrl: './branch-create.css',
})
export class BranchCreate {

  readonly branchLabel=headerLabels.branch

  private readonly navigate= inject(NavigationService);
  readonly agencies = signal<Agency[]>([]);
  private readonly branchService = inject(BranchService);
  private readonly agencyService = inject(AgencyService);
  readonly branch = input<Branch>();

  constructor(){

    this.agencyService

        .findAll()

        .subscribe({

            next:response=>{
              if(response.success){
                this.agencies.set(response?.data);
              }else{
                console.warn("response error list agency ",response)
              }

            }

        });

}
}
