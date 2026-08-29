import { Component, input } from "@angular/core";
import { PRIMENG_IMPORTS } from "../../../../../shared/primeNG/primeng.imports";
import { formsLabels, headerLabels } from "../../../../../shared/constants";
import { BankService } from "../../models/bank-service";


@Component({
imports:[...PRIMENG_IMPORTS],
selector:"app-service-details-form",
templateUrl:"./service-details-form.html"
})
export class ServiceDetailsForm{
    readonly forms_labels = formsLabels
  private readonly optionLabesl = headerLabels.counter.counterStatus

  readonly branchLable = headerLabels.branch
  bankService = input<BankService | null>(null);
  formTitle = input('Create Branch');
  errorMessage = input<string | null>(null);


}