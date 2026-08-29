import { Component, inject, signal } from '@angular/core';
import { formsLabels, headerLabels } from '../../../../../shared/constants';
import { validationMessages } from '../../../../../shared/constants/validation.message';
import { ToastNotificationService } from '../../../../../core/services/notification.service';
import { NavigationService } from '../../../../../core/services/navigation.service';
import { LookupService } from '../../../../../core/services/lookup.service';
import { Bank_serviceService } from '../../service/bank.service';
import { BankService } from '../../models/bank-service';
import { Branch } from '../../../branches/models/branch';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BankServiceRequest } from '../../models/bank-service.request';
import { PageHeader } from '../../../../../shared/components/page-header/page-header';
import { ServiceForm } from '../../components/service-form/service-form';

@Component({
  selector: 'app-service-edit',
  imports: [PageHeader,ServiceForm],
  templateUrl: './service-edit.html',
  styleUrl: './service-edit.css',
})
export class ServiceEdit {
  readonly bankservice_labels = headerLabels.bank_service
    readonly form_labels = formsLabels
    readonly branch_labels = headerLabels.branch
    private readonly validationMsg = validationMessages
    //readonly confirmService=inject(AlertDialogueService)
    readonly message = inject(ToastNotificationService)
    private readonly location = inject(Location);
    private readonly navigate =inject(NavigationService);
    private readonly lookup = inject(LookupService);
    private readonly bankSrService = inject(Bank_serviceService);
    readonly branches = signal<Branch[]>([]);
    readonly bank_service = signal<BankService|null>(null);
  
    private readonly route = inject(ActivatedRoute);
  
   backward() {
      this.location.back();
    }
   constructor() {
  
         this.lookup
  
          .getBranches()
  
          .subscribe({
  
              next:response=>{
                if(response.success){
                  this.branches.set(response?.data);
                }else{
                  console.warn("response error list agency ",response)
                }
  
              }
  
          });
  
  
          const id = Number(
              this.route.snapshot.paramMap.get('id')
          );
  
          this.bankSrService
              .findById(id)
              .subscribe({
  
                  next: response => {
                    if (!response?.data) {
                      this.message.error(
                        this.validationMsg.toast_error404,
                        this.validationMsg.toast_error_summary);
                        console.warn("findbyid response erro",response.message)
                      return;
                    }
                    console.warn("findbyid response data",response?.data)
                      this.bank_service.set(response?.data);
  
                  },
                  error: err => {
                      this.message.error(
                        err?.message??this.validationMsg.UNKNOWN_ERROR,
                        this.validationMsg.toast_error_summary
                      );
                  }
  
              });
  
      }
  update(dto: BankServiceRequest) {
  
          const id = this.bank_service()?.id;
  
          if (!id) {
  
              return;
  
          }
  
          this.bankSrService
              .update(id, dto)
              .subscribe({
  
                  next: (resp) => {
  
                    if (resp?.success && resp?.data!=null) {
                      this.message.success(
                        this.validationMsg.agency_success_updated,
                        this.validationMsg.toast_succes_summary
                      );
  
                      this.navigate.goToBankService();
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
