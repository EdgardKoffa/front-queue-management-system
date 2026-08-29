import { Component, input } from '@angular/core';
import { formsLabels, headerLabels } from '../../../../../shared/constants';
import { Counter } from '../../models/counter';
import { CounterStatus } from '../../enums/counter-status';
import { PRIMENG_IMPORTS } from '../../../../../shared/primeNG/primeng.imports';

@Component({
  selector: 'app-counter-detail-form',
  imports: [...PRIMENG_IMPORTS],
  templateUrl: './counter-detail-form.html',
  styleUrl: './counter-detail-form.css',
})
export class CounterDetailForm {
  readonly forms_labels = formsLabels
  private readonly optionLabesl = headerLabels.counter.counterStatus

  readonly branchLable = headerLabels.branch
  counter = input<Counter | null>(null);
  formTitle = input('Create Branch');
  errorMessage = input<string | null>(null);

  getStatusLabel = (status: CounterStatus) => {
    return this.optionLabesl[status]
  }

}
