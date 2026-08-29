import { Component, inject, input, signal } from '@angular/core';
import { PageHeader } from '../../../../../shared/components/page-header/page-header';
import { formsLabels, headerLabels } from '../../../../../shared/constants';
import { Counter } from '../../models/counter';
import { CounterService } from '../../service/counter.service';
import { ActivatedRoute } from '@angular/router';
import { validationMessages } from '../../../../../shared/constants/validation.message';
import { ToastNotificationService } from '../../../../../core/services/notification.service';
import { Location } from '@angular/common';
import { CounterDetailForm } from '../../components/counter-detail-form/counter-detail-form';

@Component({
  selector: 'app-counter-details',
  imports: [PageHeader, CounterDetailForm],
  templateUrl: './counter-details.html',
  styleUrl: './counter-details.css',
})
export class CounterDetails {
  readonly forms_labels = formsLabels
  counter = signal<Counter | null>(null);
  formTitle = input('Create Branch');
  errorMessage = signal<string | null>(null);
  readonly header_labels = headerLabels.counter
  private readonly location = inject(Location);

  private readonly counterService = inject(CounterService);

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

    this.counterService
      .findById(id)
      .subscribe({

        next: response => {
          if (!response?.data) {
            this.errorMessage.set(response?.message ?? this.validationMsg.toast_agency404_detail)
            // this.navigate.goToAdmin();
            return;
          }
          this.counter.set(response?.data);

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
