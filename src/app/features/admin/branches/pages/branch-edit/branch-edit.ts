import { Component, inject, signal } from '@angular/core';
import { headerLabels } from '../../../../../shared/constants';
import { validationMessages } from '../../../../../shared/constants/validation.message';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../../../../core/services/navigation.service';
import { BranchService } from '../../service/branch.service';
import { ToastNotificationService } from '../../../../../core/services/notification.service';
import { Agency } from '../../../agencies/models/agency';
import { Branch } from '../../models/branch';
import { Location } from '@angular/common';
import { BranchRequest } from '../../models/branch-request';
import { PageHeader } from '../../../../../shared/components/page-header/page-header';
import { BranchForm } from '../../components/branch-form/branch-form';
import { LookupService } from '../../../../../core/services/lookup.service';

@Component({
  selector: 'app-branch-edit',
  imports: [ PageHeader,BranchForm],
  templateUrl: './branch-edit.html',
  styleUrl: './branch-edit.css',
})
export class BranchEdit {
  readonly header_labels=headerLabels.branch

  readonly validationMsg=validationMessages
  readonly agencylabels=headerLabels.agency.title

   private readonly route = inject(ActivatedRoute);

    private readonly navigate = inject(NavigationService);

    private readonly branchService = inject(BranchService);

    private readonly message = inject(ToastNotificationService);
    branch = signal<Branch| null>(null);
    agencies = signal<Agency[] | []>([]);
    private readonly location= inject(Location);
    backward(){
      this.location.back();
    }
    private readonly lookup =inject(LookupService);
     constructor() {

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


        const id = Number(
            this.route.snapshot.paramMap.get('id')
        );

        this.branchService
            .findById(id)
            .subscribe({

                next: response => {
                  if (!response?.data) {
                    this.message.error(
                      this.validationMsg.toast_agency404_detail,
                      this.validationMsg.toast_error_summary);

                   // this.navigate.goToAdmin();
                    return;
                  }
                    this.branch.set(response?.data);

                },
                error: err => {
                    this.message.error(
                      err?.message??this.validationMsg.UNKNOWN_ERROR,
                      this.validationMsg.toast_error_summary
                    );
                }

            });

    }
update(dto: BranchRequest) {

        const id = this.branch()?.id;

        if (!id) {

            return;

        }

        this.branchService
            .update(id, dto)
            .subscribe({

                next: (resp) => {

                  if (resp?.success && resp?.data!=null) {
                    this.message.success(
                      this.validationMsg.agency_success_updated,
                      this.validationMsg.toast_succes_summary
                    );

                    this.navigate.goToBranch();
                  }else{
                    this.message.error(`${resp?.message??this.validationMsg.UNKNOWN_ERROR}`,this.validationMsg.toast_error_summary,5000)
                  }
                },
                error: (err) => {

                    this.message.error(
                      err?.message??this.validationMsg.UNKNOWN_ERROR,
                      this.validationMsg.toast_error_summary
                    );
                  }
            });

    }
}
