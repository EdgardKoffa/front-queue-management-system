import { Component ,inject, signal} from '@angular/core';
import { NavigationService } from '../../../../../core/services/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { AgencyService } from '../../services/agency.service';
import { ToastNotificationService } from '../../../../../core/services/notification.service';
import { Agency } from '../../models/agency';
import { AgencyForm } from '../../components/agency-form/agency-form';
import { validationMessages } from '../../../../../shared/constants/validation.message';
import { PageHeader } from '../../../../../shared/components/page-header/page-header';
import { headerLabels } from '../../../../../shared/constants';
import { Location } from '@angular/common';

@Component({
  selector: 'app-agency-edit',
  imports: [   PageHeader,AgencyForm],
  templateUrl: './agency-edit.html',
  styleUrl: './agency-edit.css',
})
export class AgencyEdit {
readonly header_labels=headerLabels.agency

  readonly validationMsg=validationMessages
  
   private readonly route = inject(ActivatedRoute);

    private readonly navigate = inject(NavigationService);

    private readonly agencyService = inject(AgencyService);

    private readonly message = inject(ToastNotificationService);

    agency = signal<Agency | null>(null);
    private readonly location= inject(Location);
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
                    this.message.error(
                      this.validationMsg.toast_agency404_detail,
                      this.validationMsg.toast_error_summary);

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
                }

            });

    }
update(dto: any) {

        const id = this.agency()?.id;

        if (!id) {

            return;

        }

        this.agencyService
            .update(id, dto)
            .subscribe({

                next: (resp) => {

                  if (resp?.success && resp?.data!=null) {
                    this.message.success(
                      this.validationMsg.agency_success_updated,
                      this.validationMsg.toast_succes_summary
                    );

                    this.navigate.goToAgency();
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
