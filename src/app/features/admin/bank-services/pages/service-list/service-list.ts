import { Component, inject, signal } from '@angular/core';
import { PageHeader } from '../../../../../shared/components/page-header/page-header';
import { formsLabels, headerLabels } from '../../../../../shared/constants';
import { validationMessages } from '../../../../../shared/constants/validation.message';
import { AlertDialogueService } from '../../../../../core/services/alert.dialogue.services';
import { ToastNotificationService } from '../../../../../core/services/notification.service';
import { Bank_serviceService } from '../../service/bank.service';
import { NavigationService } from '../../../../../core/services/navigation.service';
import { BankService } from '../../models/bank-service';
import { ConfirmDialogService } from '../../../../../core/services/confir.form.dialog.service';
import { TableLazyLoadEvent } from 'primeng/table';
import { PageRequest } from '../../../../../core/models/page-request';
import { formedSelectOptions } from '../../../../../shared/utils/utils.functions';
import { ColumnConfig, IconType, SeverityType } from '../../../../../shared/models/table-column';
import { DataTable } from '../../../../../shared/components/data-table/data-table';

@Component({
  selector: 'app-service-list',
  imports: [PageHeader,DataTable],
  templateUrl: './service-list.html',
  styleUrl: './service-list.css',
})
export class ServiceList {

  readonly bankService_labels=headerLabels.bank_service
  readonly form_labels=formsLabels
  readonly branch_labels=headerLabels.branch
  private readonly toastmessges=validationMessages
      readonly confirmService=inject(AlertDialogueService)
      readonly tostMessageService=inject(ToastNotificationService)
      private readonly banserviceService = inject(Bank_serviceService);
   private readonly navigate =inject(NavigationService);
    butonIcon = signal('pi pi-plus');
    bankServices = signal<BankService[]>([]);
  
    loading = signal(false);
  
    totalRecords = signal(0);
    
   private confirmIsactivateFormervice = inject(ConfirmDialogService<boolean>);
    
 

     load(event: TableLazyLoadEvent) {

  this.loading.set(true);

  const request: PageRequest = {

    page: Math.floor((event.first ?? 0) / (event.rows ?? 10)),
    size: event.rows ?? 10,
    sortField: event.sortField as string,
    sortOrder: event.sortOrder === 1 ? 'asc' : 'desc'

  };

    this.banserviceService.findPage(request).subscribe({

      next: response => {

        const contents=response.data
        this.bankServices.set(contents.filter(b=>b?.deletedAt===null));

        this.totalRecords.set(response.totalElements);
      
        this.loading.set(false);

      },

      error: (err) => {
        this.tostMessageService.error(
          err?.message??this.toastmessges.toast_error404,
          this.toastmessges.toast_error_summary
        )
        this.loading.set(false);
        return 
      }

    });

  }

  create() {

    this.navigate.goToBankService(['new']);

  }

  details(bkService: BankService) {
    if(bkService.active!==true){
      this.tostMessageService.warning(this.toastmessges.toast_warn_summary,this.toastmessges.agency_edit_warning)
      return
    }
    this.navigate.goToBankService([bkService.id]);

  }

  edit(counter: BankService) {
    if(counter.active!==true){
      this.tostMessageService.warning(this.toastmessges.toast_warn_summary,this.toastmessges.agency_detail_warning)
      return
    }
    this.navigate.goToBankService([counter.id,'edit']);

  }

  delete=(counter: BankService) => {
    this.confirmService.confirmDialog(
      "p-button-danger",
      `p-button-text`,
      ()=>{
         this.loading.set(true);

            this.banserviceService.delete(
                counter.id
            ).subscribe({

                next: () => {

                    this.tostMessageService
                    .success(this.toastmessges.toast_succes_summary,
                      this.toastmessges.agency_success_deleted);
                      //location.reload()
                      const oldData=this.bankServices()
                     
                      const newData=oldData.filter((item)=>item.id!==counter.id)
                      this.bankServices.set(newData)
                   // this.load();
                       this.loading.set(false);
                },

                error: (err) => {

                    this.loading.set(false);

                    this.tostMessageService.
                    error(this.toastmessges.toast_error_summary, err?.message ??this.toastmessges.toast_error404);

                }

            });
      },
      ()=>{

      },
      "pi pi-trash",
      "pi pi-ban",
      true

    )
    
  }

    private changeBooleanAction=(counter: BankService, status: boolean) => {
     
           this.loading.set(true);
  
              this.banserviceService.changeActiveState(
                  counter.id,
                  status
              ).subscribe({
  
                  next: (resp) => {
  
                    if (resp?.success && resp?.data!=null) {
                      this.tostMessageService
                      .success(resp.message??this.toastmessges.toast_success_detail,
                        this.toastmessges.toast_succes_summary);
                        const oldData=this.bankServices()
                       
                        const newData=oldData.map((item)=>{
                          if(item.id===counter.id){
                            return resp.data
                          }
                          return item
                        })
  
                        this.bankServices.set(newData)
                        
                         this.loading.set(false);
                      }else{
                        this.loading.set(false);
                        this.tostMessageService.
                        error(this.toastmessges.toast_error_summary, resp?.message ??this.toastmessges.toast_error404);
                      }
                  },
  
                  error: (err) => {
  
                      this.loading.set(false);
  
                      this.tostMessageService.
                      error(this.toastmessges.toast_error_summary, err?.message ??this.toastmessges.toast_error404);
  
                  }
  
              });
       
      
    }
  
  

  isActiveAction=(bkService: BankService)=>{
      this.confirmIsactivateFormervice.open({
       
        options:formedSelectOptions([this.form_labels.active,this.form_labels.disable],
         [true,false]),
  
        onConfirm: (selectedReason) => {
          console.log('Motif sélectionné :', selectedReason);
          // Appeler API backend avec `selectedReason`
         this.changeBooleanAction(bkService,selectedReason);
        },
        message: this.form_labels.status,
      });
    }
    
    isActiveIcon=(cellvalue: any)=>{
      const icon:IconType= cellvalue===true
      ?"pi pi-check"
      :"pi pi-times";
      return icon
    } 
     isActiveSeverity=(cellvalue: any)=> {
      const severity:SeverityType= cellvalue===true
      ?"success"
      :"danger"
      return severity
    } 
   
    readonly columns:ColumnConfig<BankService> [] = [

    {
        field:'code',
        header:'Code'
    },

    {
        field:'name',
        header:this.form_labels.name
    },

    {
        field:'branchName',
        header:this.branch_labels.title[0]
    },

    {
        field:'active',
        header:this.form_labels.isActif[0],
        isButton:true,
        actionFn:(value)=>this.isActiveAction(value),
        iconFn:(value)=>this.isActiveIcon(value),
        severityFn:(value)=>this.isActiveSeverity(value),
        tooltipFn:(val)=>val===true?this.form_labels.isActif[0]:this.form_labels.isDesactif[0]
    }

];
}
