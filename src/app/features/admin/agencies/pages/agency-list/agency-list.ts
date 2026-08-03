import { Component, inject, OnInit, signal } from '@angular/core';
import { PageHeader } from '../../../../../shared/components/page-header/page-header';
import { DataTable } from '../../../../../shared/components/data-table/data-table';
import { Agency } from '../../models/agency';
import { IconType, SeverityType, TableColumn } from '../../../../../shared/models/table-column';
import { isLangFr } from '../../../../../shared/utils';
import { AgencyService } from '../../services/agency.service';
import { NavigationService } from '../../../../../core/services/navigation.service';
import { PageRequest } from '../../../../../core/models/page-request';
import { TableLazyLoadEvent } from 'primeng/table';
import { formsLabels, headerLabels } from '../../../../../shared/constants';
import { AlertDialogueService } from '../../../../../core/services/alert.dialogue.services';
import { ToastNotificationService } from '../../../../../core/services/notification.service';
import { StatusEnum } from '../../../../../shared/enums/status.enum';
import { validationMessages } from '../../../../../shared/constants/validation.message';
import { ConfirmDialogService } from '../../../../../core/services/confir.form.dialog.service';



@Component({
  selector: 'app-agency-list',
  imports: [
     PageHeader,
    DataTable
  ],
  templateUrl: './agency-list.html',
  styleUrl: './agency-list.css',
})
export class AgencyList implements OnInit{

  private readonly toastmessges=validationMessages
  readonly confirmService=inject(AlertDialogueService)
  readonly tostMessageService=inject(ToastNotificationService)
  private readonly agencyService = inject(AgencyService);
readonly forms_labels=formsLabels
  private readonly router =inject(NavigationService);
  readonly header_labels=headerLabels.agency
butonIcon = signal('pi pi-plus');
  agencies = signal<Agency[]>([]);

  loading = signal(false);

  totalRecords = signal(0);

  columns: TableColumn[] = [

    {
      field: 'code',
      header: 'Code',
      
    },

    {
      field: 'name',
      header:this.forms_labels.name
    },

    {
      field: 'city',
      header: this.forms_labels.city
    },

    {
      field: 'status',
      header: this.forms_labels.status,
      isButton:true,

    }

  ];

  private confirmFormervice = inject(ConfirmDialogService<StatusEnum>);

  ngOnInit() {
   // this.load();
  }

  load(event: TableLazyLoadEvent) {

  this.loading.set(true);

  const request: PageRequest = {

    page: Math.floor((event.first ?? 0) / (event.rows ?? 10)),
    size: event.rows ?? 10,
    sortField: event.sortField as string,
    sortOrder: event.sortOrder === 1 ? 'asc' : 'desc'

  };

    this.agencyService.findPage(request).subscribe({

      next: response => {

        const contents=response.data
        this.agencies.set(contents);

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

  createAgency() {

    this.router.goToAgency(['new']);

  }

  detailsAgency(agency: Agency) {
    if(agency.status!==StatusEnum.ACTIVE){
      this.tostMessageService.warning(this.toastmessges.toast_warn_summary,this.toastmessges.agency_edit_warning)
      return
    }
    this.router.goToAgency([agency.id]);

  }

  editAgency(agency: Agency) {
    if(agency.status!==StatusEnum.ACTIVE){
      this.tostMessageService.warning(this.toastmessges.toast_warn_summary,this.toastmessges.agency_detail_warning)
      return
    }
    this.router.goToAgency([agency.id,'edit']);

  }

  deleteAgency=(agency: Agency) => {
    this.confirmService.confirmDialog(
      "p-button-danger",
      `p-button-text`,
      ()=>{
         this.loading.set(true);

            this.agencyService.delete(
                agency.id
            ).subscribe({

                next: () => {

                    this.tostMessageService
                    .success(this.toastmessges.toast_succes_summary,
                      this.toastmessges.agency_success_deleted);
                      //location.reload()
                      const oldData=this.agencies()
                     
                      const newData=oldData.filter((item)=>item.id!==agency.id)
                      this.agencies.set(newData)
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
 private changeAgencyStatus=(agency: Agency, status: StatusEnum) => {
   
         this.loading.set(true);

            this.agencyService.changeStatus(
                agency.id,
                status
            ).subscribe({

                next: (resp) => {

                  if (resp?.success && resp?.data!=null) {
                    this.tostMessageService
                    .success(resp.message??this.toastmessges.toast_success_detail,
                      this.toastmessges.toast_succes_summary);
                      const oldData=this.agencies()
                     
                      const newData=oldData.map((item)=>{
                        if(item.id===agency.id){
                          return resp.data
                        }
                        return item
                      })
                      this.agencies.set(newData)
                     // this.load();
                    //
                     // location.reload()
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

  agencyStatusAction=(agency: Agency)=>{
    this.confirmFormervice.open({

      options: [
        { label:this.forms_labels.active, value: StatusEnum.ACTIVE },
        { label: this.forms_labels.disable, value: StatusEnum.INACTIVE },
        { label: this.forms_labels.maintenance, value: StatusEnum.MAINTENANCE }
      ],

      onConfirm: (selectedReason) => {
        console.log('Motif sélectionné :', selectedReason);
        // Appeler API backend avec `selectedReason`
       this.changeAgencyStatus(agency,selectedReason);
      },
      message: this.forms_labels.status,
    });
  }

statusValue=(cellvalue: any)=>{
 
  const val=cellvalue===StatusEnum.ACTIVE
    ?this.toastmessges?.active
    :cellvalue===StatusEnum.INACTIVE
    ?this.toastmessges?.disable
    :this.toastmessges?.maintenance;
     console.log("status value",cellvalue," toastmessges ", val);
 
    return val;
  } 
  statusIcon=(cellvalue: any)=>{
    const icon:IconType= cellvalue===StatusEnum.ACTIVE
    ?"pi pi-check"
    :cellvalue===StatusEnum.INACTIVE
    ?"pi pi-ban"
    :"pi pi-wrench";
    return icon
  } 
  statusSeverity=(cellvalue: any)=> {
    const severity:SeverityType= cellvalue===StatusEnum.ACTIVE
    ?"success"
    :cellvalue===StatusEnum.INACTIVE
    ?"danger"
    :"warn";
    return severity
  } 
  
}
