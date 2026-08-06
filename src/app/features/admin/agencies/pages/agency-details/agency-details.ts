import { Component, inject, signal } from '@angular/core';
import { PRIMENG_IMPORTS } from '../../../../../shared/primeNG/primeng.imports';
import { PageHeader } from '../../../../../shared/components/page-header/page-header';
import { headerLabels } from '../../../../../shared/constants';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AgencyService } from '../../services/agency.service';
import { Agency } from '../../models/agency';
import { validationMessages } from '../../../../../shared/constants/validation.message';
import { ToastNotificationService } from '../../../../../core/services/notification.service';
import { AgencyDetailForm } from '../../components/agency-detail/agency-detail-form';


@Component({
  selector: 'app-agency-details',
  imports: [   PageHeader,AgencyDetailForm],
  templateUrl: './agency-details.html',
  styleUrl: './agency-details.css',
})
export class AgencyDetails {
  readonly header_labels=headerLabels.agency
  private readonly location= inject(Location);

   private readonly agencyService = inject(AgencyService);
  
   private readonly route = inject(ActivatedRoute);
readonly validationMsg=validationMessages
  private readonly message = inject(ToastNotificationService);

    agency = signal<Agency | null>(null);
    errorMessage = signal<string | null>(null);
    backward(){
      this.location.back();
    }
     constructor() {

        const id = Number(
            this.route.snapshot.paramMap.get('id')
        );

        this.agencyService
            .findById(id)
            .subscribe({

                next: response => {
                  if (!response?.data) {
                   this.errorMessage.set(response?.message??this.validationMsg.toast_agency404_detail)
                   // this.navigate.goToAdmin();
                    return;
                  }
                    this.agency.set(response?.data);

                },
                error: err => {
                    this.message.error(
                      err?.message??this.validationMsg.UNKNOWN_ERROR,
                      this.validationMsg.toast_error_summary
                    );
                    this.errorMessage.set(err?.message??this.validationMsg.toast_agency404_detail)
                  
                }

            });

    }
}
