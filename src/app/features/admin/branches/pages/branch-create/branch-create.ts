import { Component, inject, input, signal } from '@angular/core';
import { Agency } from '../../../agencies/models/agency';
import { Branch } from '../../models/branch';
import { BranchService } from '../../service/branch.service';
import { AgencyService } from '../../../agencies/services/agency.service';
import { headerLabels } from '../../../../../shared/constants';
import { NavigationService } from '../../../../../core/services/navigation.service';
import { LookupService } from '../../../../../core/services/lookup.service';
import { PageHeader } from '../../../../../shared/components/page-header/page-header';
import { BranchForm } from '../../components/branch-form/branch-form';
import { BranchRequest } from '../../models/branch-request';
import { validationMessages } from '../../../../../shared/constants/validation.message';
import { Location } from '@angular/common';
import { ToastNotificationService } from '../../../../../core/services/notification.service';

@Component({
  selector: 'app-branch-create',
  imports: [
    PageHeader,
    BranchForm
  ],
  templateUrl: './branch-create.html',
  styleUrl: './branch-create.css',
})
export class BranchCreate {

  readonly branchLabel=headerLabels.branch

  private readonly navigate= inject(NavigationService);
  readonly agencies = signal<Agency[]>([]);
  private readonly branchService = inject(BranchService);
  private readonly lookup =inject(LookupService);
      readonly branch = input<Branch>();

readonly validationMsg=validationMessages
    private readonly router =
        inject(NavigationService);
readonly agencylabels=headerLabels.agency.title

readonly header_labels=headerLabels.branch
private readonly location= inject(Location);
    backward(){
      this.location.back();
    }
    private readonly message =
        inject(ToastNotificationService);

  constructor(){

    this.lookup

        .getAgencies()

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

        create(dto:BranchRequest){

        this.branchService.create(dto)
            .subscribe({
              next:(response)=>{
                console.info("created banch",response)
                if(response.success&&response.data!=null){
                this.message.success(this.validationMsg.toast_success_detail,this.validationMsg.toast_succes_summary)
                this.router.goToBranch()
                }else{
                  this.message.error(`${response?.message??this.validationMsg.UNKNOWN_ERROR}`,this.validationMsg.toast_error_summary,5000)
                }
              },
              error:(err)=>{
                console.warn("create agency error",err)
                this.message.error(`${err?.message??this.validationMsg.UNKNOWN_ERROR}`,this.validationMsg.toast_error_summary,5000)
                return
              }
            })
          }
}
