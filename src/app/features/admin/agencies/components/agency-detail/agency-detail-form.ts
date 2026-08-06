import { Component, effect, inject, input } from '@angular/core';
import { Agency } from '../../models/agency';
import { PRIMENG_IMPORTS } from '../../../../../shared/primeNG/primeng.imports';
import { formsLabels } from '../../../../../shared/constants';

@Component({
  selector: 'app-agency-detail-form',
  imports: [
    ...PRIMENG_IMPORTS
  ],
  templateUrl: './agency-detail-form.html',
  styleUrl: './agency-detail-form.css',
})
export class AgencyDetailForm {
  
    readonly forms_labels=formsLabels
    agency = input<Agency | null>(null);
    formTitle = input('Create Agency');
     errorMessage = input<string | null>(null);
     constructor() {

    effect(() => {

        const agency = this.agency();

        if (!agency) {

            return;

        }

    });

}
}
