import { Component, inject, signal } from '@angular/core';
import { PageHeader } from '../../../../../shared/components/page-header/page-header';
import { ServiceForm } from '../../components/service-form/service-form';
import { formsLabels, headerLabels } from '../../../../../shared/constants';
import { validationMessages } from '../../../../../shared/constants/validation.message';
import { ToastNotificationService } from '../../../../../core/services/notification.service';
import { Location } from '@angular/common';
import { NavigationService } from '../../../../../core/services/navigation.service';
import { LookupService } from '../../../../../core/services/lookup.service';
import { Bank_serviceService } from '../../service/bank.service';
import { Branch } from '../../../branches/models/branch';
import { BankServiceRequest } from '../../models/bank-service.request';

@Component({
  selector: 'app-service-create',
  imports: [PageHeader,ServiceForm],
  templateUrl: './service-create.html',
  styleUrl: './service-create.css',
})
export class ServiceCreate {
  readonly bankService_labels = headerLabels.bank_service
  readonly form_labels = formsLabels
  readonly branch_labels = headerLabels.branch
  private readonly validationMsg = validationMessages
  //readonly confirmService=inject(AlertDialogueService)
  readonly message = inject(ToastNotificationService)
  private readonly location = inject(Location);
  private readonly navigate =inject(NavigationService);
  private readonly lookup = inject(LookupService);
  private readonly bank_serviceService = inject(Bank_serviceService);
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
  
    create(dto: BankServiceRequest) {
  
      this.bank_serviceService.create(dto)
        .subscribe({
          next: (response) => {
            console.info("created counter", response)
            if (response.success && response.data != null) {
              this.message.success(this.validationMsg.toast_success_detail, this.validationMsg.toast_succes_summary)
              this.navigate.goToBankService()
            } else {
              this.message.error(`${response?.message ?? this.validationMsg.UNKNOWN_ERROR}`, this.validationMsg.toast_error_summary, 5000)
            }
          },
          error: (err) => {
            console.warn("create bank service error", err)
            this.message.error(`${err?.message ?? this.validationMsg.UNKNOWN_ERROR}`, this.validationMsg.toast_error_summary, 5000)
            return
          }
        })
    }
}
