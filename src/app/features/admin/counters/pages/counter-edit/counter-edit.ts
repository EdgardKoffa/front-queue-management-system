import { Component, inject, signal } from '@angular/core';
import { formsLabels, headerLabels } from '../../../../../shared/constants';
import { validationMessages } from '../../../../../shared/constants/validation.message';
import { Location } from '@angular/common';
import { ToastNotificationService } from '../../../../../core/services/notification.service';
import { NavigationService } from '../../../../../core/services/navigation.service';
import { LookupService } from '../../../../../core/services/lookup.service';
import { CounterService } from '../../service/counter.service';
import { Branch } from '../../../branches/models/branch';
import { Counter } from '../../models/counter';
import { CounterRequest } from '../../models/counter-request';
import { ActivatedRoute } from '@angular/router';
import { PageHeader } from '../../../../../shared/components/page-header/page-header';
import { CounterForm } from '../../components/counter-form/counter-form';

@Component({
  selector: 'app-counter-edit',
  imports: [PageHeader,CounterForm],
  templateUrl: './counter-edit.html',
  styleUrl: './counter-edit.css',
})
export class CounterEdit {
  readonly count_labels = headerLabels.counter
  readonly form_labels = formsLabels
  readonly branch_labels = headerLabels.branch
  private readonly validationMsg = validationMessages
  //readonly confirmService=inject(AlertDialogueService)
  readonly message = inject(ToastNotificationService)
  private readonly location = inject(Location);
  private readonly navigate =inject(NavigationService);
  private readonly lookup = inject(LookupService);
  private readonly counterService = inject(CounterService);
  readonly branches = signal<Branch[]>([]);
  readonly counter = signal<Counter|null>(null);

  private readonly route = inject(ActivatedRoute);

 backward() {
    this.location.back();
  }
 constructor() {

       this.lookup

        .getBranches()

        .subscribe({

            next:response=>{
              if(response.success){
                this.branches.set(response?.data);
              }else{
                console.warn("response error list agency ",response)
              }

            }

        });


        const id = Number(
            this.route.snapshot.paramMap.get('id')
        );

        this.counterService
            .findById(id)
            .subscribe({

                next: response => {
                  if (!response?.data) {
                    this.message.error(
                      this.validationMsg.toast_error404,
                      this.validationMsg.toast_error_summary);
                      console.warn("findbyid response erro",response.message)
                    return;
                  }
                  console.warn("findbyid response data",response?.data)
                    this.counter.set(response?.data);

                },
                error: err => {
                    this.message.error(
                      err?.message??this.validationMsg.UNKNOWN_ERROR,
                      this.validationMsg.toast_error_summary
                    );
                }

            });

    }
update(dto: CounterRequest) {

        const id = this.counter()?.id;

        if (!id) {

            return;

        }

        this.counterService
            .update(id, dto)
            .subscribe({

                next: (resp) => {

                  if (resp?.success && resp?.data!=null) {
                    this.message.success(
                      this.validationMsg.agency_success_updated,
                      this.validationMsg.toast_succes_summary
                    );

                    this.navigate.goToCounter();
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
