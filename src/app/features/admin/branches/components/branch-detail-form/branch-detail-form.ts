import { Component, effect, inject, input } from '@angular/core';
import { Branch } from '../../models/branch';
import { PRIMENG_IMPORTS } from '../../../../../shared/primeNG/primeng.imports';
import { formsLabels, headerLabels } from '../../../../../shared/constants';

@Component({
  selector: 'app-branch-detail-form',
  imports: [
    ...PRIMENG_IMPORTS
  ],
  templateUrl: './branch-detail-form.html',
  styleUrl: './branch-detail-form.css',
})
export class BranchDetailForm {
  readonly forms_labels=formsLabels
  readonly agencyLable=headerLabels.agency
      branch = input<Branch | null>(null);
      formTitle = input('Create Branch');
       errorMessage = input<string | null>(null);
    /*  constructor() {

    effect(() => {

        const agency = this.agency();

        if (!agency) {

            return;

        }

    });

} */
}
