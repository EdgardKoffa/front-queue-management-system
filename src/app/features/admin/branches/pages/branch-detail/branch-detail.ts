import { Component, effect, inject, input, signal } from '@angular/core';
import { formsLabels, headerLabels } from '../../../../../shared/constants';
import { Branch } from '../../models/branch';
import { PRIMENG_IMPORTS } from '../../../../../shared/primeNG/primeng.imports';
import { ToastNotificationService } from '../../../../../core/services/notification.service';
import { validationMessages } from '../../../../../shared/constants/validation.message';
import { ActivatedRoute } from '@angular/router';
import { BranchService } from '../../service/branch.service';
import { Location } from '@angular/common';
import { PageHeader } from '../../../../../shared/components/page-header/page-header';
import { BranchDetailForm } from '../../components/branch-detail-form/branch-detail-form';

@Component({
  selector: 'app-branch-detail',
  imports: [
    PageHeader,BranchDetailForm],
  templateUrl: './branch-detail.html',
  styleUrl: './branch-detail.css',
})
export class BranchDetail {
  readonly forms_labels=formsLabels
      branch = signal<Branch | null>(null);
      formTitle = input('Create Branch');
       errorMessage = signal<string | null>(null);
       readonly header_labels=headerLabels.branch
         private readonly location= inject(Location);
       
          private readonly branchService = inject(BranchService);
         
          private readonly route = inject(ActivatedRoute);
       readonly validationMsg=validationMessages
         private readonly message = inject(ToastNotificationService);
       
          
           backward(){
             this.location.back();
           }
            constructor() {
       
               const id = Number(
                   this.route.snapshot.paramMap.get('id')
               );
       
               this.branchService
                   .findById(id)
                   .subscribe({
       
                       next: response => {
                         if (!response?.data) {
                          this.errorMessage.set(response?.message??this.validationMsg.toast_agency404_detail)
                          // this.navigate.goToAdmin();
                           return;
                         }
                           this.branch.set(response?.data);
       
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
