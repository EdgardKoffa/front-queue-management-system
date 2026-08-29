import { Component, inject, input, signal } from '@angular/core';
import { PageHeader } from '../../../../../shared/components/page-header/page-header';
import { ServiceDetailsForm } from '../../components/bank-service-details.form.ts/service-details-form';
import { formsLabels, headerLabels } from '../../../../../shared/constants';
import { BankService } from '../../models/bank-service';
import { Location } from '@angular/common';
import { Bank_serviceService } from '../../service/bank.service';
import { ActivatedRoute } from '@angular/router';
import { validationMessages } from '../../../../../shared/constants/validation.message';
import { ToastNotificationService } from '../../../../../core/services/notification.service';

@Component({
  selector: 'app-service-details',
  imports: [PageHeader,ServiceDetailsForm],
  templateUrl: './service-details.html',
  styleUrl: './service-details.css',
})
export class ServiceDetails {
   readonly forms_labels = formsLabels
  bankService = signal<BankService | null>(null);
  formTitle = input('Create Branch');
  errorMessage = signal<string | null>(null);
  readonly header_labels = headerLabels.bank_service
  private readonly location = inject(Location);
  private readonly bank_srv_service = inject(Bank_serviceService);
  private readonly route = inject(ActivatedRoute);
  readonly validationMsg = validationMessages
  private readonly message = inject(ToastNotificationService);

  backward() {
    this.location.back();
  }
  constructor() {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.bank_srv_service
      .findById(id)
      .subscribe({

        next: response => {
          if (!response?.data) {
            this.errorMessage.set(response?.message ?? this.validationMsg.toast_agency404_detail)
            // this.navigate.goToAdmin();
            return;
          }
          this.bankService.set(response?.data);

        },
        error: err => {
          this.message.error(
            err?.message ?? this.validationMsg.UNKNOWN_ERROR,
            this.validationMsg.toast_error_summary
          );
          this.errorMessage.set(err?.message ?? this.validationMsg.toast_agency404_detail)

        }

      });

  }
}
