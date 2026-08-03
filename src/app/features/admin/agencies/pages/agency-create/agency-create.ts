import { Component, inject } from '@angular/core';
import { AgencyForm } from '../../components/agency-form/agency-form';
import { AgencyService } from '../../services/agency.service';
import { NavigationService } from '../../../../../core/services/navigation.service';
import { ToastNotificationService } from '../../../../../core/services/notification.service';
import { validationMessages } from '../../../../../shared/constants/validation.message';
import { isLangFr } from '../../../../../shared/utils';
import { PageHeader } from '../../../../../shared/components/page-header/page-header';
import { headerLabels } from '../../../../../shared/constants';
import { Location } from '@angular/common';


@Component({
  selector: 'app-agency-create',
  imports: [   PageHeader,AgencyForm],
  templateUrl: './agency-create.html',
  styleUrl: './agency-create.css',
})
export class AgencyCreate {
private readonly agencyService =
        inject(AgencyService);
readonly validationMsg=validationMessages
    private readonly router =
        inject(NavigationService);
readonly header_labels=headerLabels.agency
private readonly location= inject(Location);
    backward(){
      this.location.back();
    }
    private readonly message =
        inject(ToastNotificationService);

        create(dto:any){

        this.agencyService.create(dto)
            .subscribe({
              next:(response)=>{
                console.info("created banch",response)
                if(response.success&&response.data!=null){
                this.message.success(this.validationMsg.agency_success_created,this.validationMsg.toast_succes_summary)
                this.router.goToAgency()
                }else{
                  this.message.error(`${response?.message??this.validationMsg.UNKNOWN_ERROR}`,this.validationMsg.toast_error_summary,5000)
                }
              },
              error:(err)=>{
                console.warn("create agency error",err)
                this.message.error(`${err?.message??this.validationMsg.UNKNOWN_ERROR}`,this.validationMsg.toast_error_summary,5000)
                return
              }
            })
          }
}
