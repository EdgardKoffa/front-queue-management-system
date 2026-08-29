import { Component, inject, signal } from '@angular/core';
import { PageHeader } from '../../../../../shared/components/page-header/page-header';
import { formsLabels, headerLabels } from '../../../../../shared/constants';
import { validationMessages } from '../../../../../shared/constants/validation.message';
import { ToastNotificationService } from '../../../../../core/services/notification.service';
import { CounterService } from '../../service/counter.service';
import { Branch } from '../../../branches/models/branch';
import { Location } from '@angular/common';
import { NavigationService } from '../../../../../core/services/navigation.service';
import { LookupService } from '../../../../../core/services/lookup.service';
import { CounterRequest } from '../../models/counter-request';
import { CounterForm } from '../../components/counter-form/counter-form';

@Component({
  selector: 'app-counter-create',
  imports: [PageHeader,CounterForm],
  templateUrl: './counter-create.html',
  styleUrl: './counter-create.css',
})
export class CounterCreate {
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
 backward() {
    this.location.back();
  }

   constructor() {
  
      this.lookup
  
        .getBranches()
  
        .subscribe({
  
          next: response => {
            if (response.success) {
              this.branches.set(response?.data);
            } else {
              console.warn("response error list branches ", response)
            }
  
          }
  
        });
  
    }
  
    create(dto: CounterRequest) {
  
      this.counterService.create(dto)
        .subscribe({
          next: (response) => {
            console.info("created counter", response)
            if (response.success && response.data != null) {
              this.message.success(this.validationMsg.toast_success_detail, this.validationMsg.toast_succes_summary)
              this.navigate.goToCounter()
            } else {
              this.message.error(`${response?.message ?? this.validationMsg.UNKNOWN_ERROR}`, this.validationMsg.toast_error_summary, 5000)
            }
          },
          error: (err) => {
            console.warn("create agency error", err)
            this.message.error(`${err?.message ?? this.validationMsg.UNKNOWN_ERROR}`, this.validationMsg.toast_error_summary, 5000)
            return
          }
        })
    }
}
