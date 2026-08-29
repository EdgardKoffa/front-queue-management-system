import { Component, inject, signal } from '@angular/core';
import { ColumnConfig, FunctionIconSeverityTooltip, IconType, SeverityType, TableColumn } from '../../../../../shared/models/table-column';
import { formsLabels, headerLabels } from '../../../../../shared/constants';
import { validationMessages } from '../../../../../shared/constants/validation.message';
import { AlertDialogueService } from '../../../../../core/services/alert.dialogue.services';
import { ToastNotificationService } from '../../../../../core/services/notification.service';
import { CounterService } from '../../service/counter.service';
import { Counter } from '../../models/counter';
import { NavigationService } from '../../../../../core/services/navigation.service';
import { ConfirmDialogService } from '../../../../../core/services/confir.form.dialog.service';
import { CounterStatus } from '../../enums/counter-status';
import { TableLazyLoadEvent } from 'primeng/table';
import { PageRequest } from '../../../../../core/models/page-request';
import { formedSelectOptions } from '../../../../../shared/utils/utils.functions';
import { PageHeader } from '../../../../../shared/components/page-header/page-header';
import { DataTable } from '../../../../../shared/components/data-table/data-table';

@Component({
  selector: 'app-counter-list',
  imports: [PageHeader,DataTable],
  templateUrl: './counter-list.html',
  styleUrl: './counter-list.css',
})
export class CounterList {

  readonly count_labels=headerLabels.counter
  readonly form_labels=formsLabels
  readonly branch_labels=headerLabels.branch
  private readonly toastmessges=validationMessages
      readonly confirmService=inject(AlertDialogueService)
      readonly tostMessageService=inject(ToastNotificationService)
      private readonly counterService = inject(CounterService);
   private readonly navigate =inject(NavigationService);
    butonIcon = signal('pi pi-plus');
    counters = signal<Counter[]>([]);
  
    loading = signal(false);
  
    totalRecords = signal(0);
   private confirmStatusFormervice = inject(ConfirmDialogService<CounterStatus>);
    
   private confirmIsactivateFormervice = inject(ConfirmDialogService<boolean>);
    
 

     load(event: TableLazyLoadEvent) {

  this.loading.set(true);

  const request: PageRequest = {

    page: Math.floor((event.first ?? 0) / (event.rows ?? 10)),
    size: event.rows ?? 10,
    sortField: event.sortField as string,
    sortOrder: event.sortOrder === 1 ? 'asc' : 'desc'

  };

    this.counterService.findPage(request).subscribe({

      next: response => {

        const contents=response.data
        this.counters.set(contents.filter(b=>b?.deletedAt===null));

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

    this.navigate.goToCounter(['new']);

  }

  details(counter: Counter) {
    if(counter.active!==true){
      this.tostMessageService.warning(this.toastmessges.toast_warn_summary,this.toastmessges.agency_edit_warning)
      return
    }
    this.navigate.goToCounter([counter.id]);

  }

  edit(counter: Counter) {
    if(counter.active!==true){
      this.tostMessageService.warning(this.toastmessges.toast_warn_summary,this.toastmessges.agency_detail_warning)
      return
    }
    this.navigate.goToCounter([counter.id,'edit']);

  }

  delete=(counter: Counter) => {
    this.confirmService.confirmDialog(
      "p-button-danger",
      `p-button-text`,
      ()=>{
         this.loading.set(true);

            this.counterService.delete(
                counter.id
            ).subscribe({

                next: () => {

                    this.tostMessageService
                    .success(this.toastmessges.toast_succes_summary,
                      this.toastmessges.agency_success_deleted);
                      //location.reload()
                      const oldData=this.counters()
                     
                      const newData=oldData.filter((item)=>item.id!==counter.id)
                      this.counters.set(newData)
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

  private changeStatusAction=(counter: Counter, status: CounterStatus) => {
     
           this.loading.set(true);
  
              this.counterService.changeStatus(
                  counter.id,
                  status
              ).subscribe({
  
                  next: (resp) => {
  
                    if (resp?.success && resp?.data!=null) {
                      this.tostMessageService
                      .success(resp.message??this.toastmessges.toast_success_detail,
                        this.toastmessges.toast_succes_summary);
                        const oldData=this.counters()
                       
                        const newData=oldData.map((item)=>{
                          if(item.id===counter.id){
                            return resp.data
                          }
                          return item
                        })
  
                        this.counters.set(newData)
                        
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
    private changeBooleanAction=(counter: Counter, status: boolean) => {
     
           this.loading.set(true);
  
              this.counterService.changeActivate(
                  counter.id,
                  status
              ).subscribe({
  
                  next: (resp) => {
  
                    if (resp?.success && resp?.data!=null) {
                      this.tostMessageService
                      .success(resp.message??this.toastmessges.toast_success_detail,
                        this.toastmessges.toast_succes_summary);
                        const oldData=this.counters()
                       
                        const newData=oldData.map((item)=>{
                          if(item.id===counter.id){
                            return resp.data
                          }
                          return item
                        })
  
                        this.counters.set(newData)
                        
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
   private optionLabesl= this.count_labels.counterStatus
   
  

    statusAction=(counter: Counter)=>{
      this.confirmStatusFormervice.open({
       
        options:formedSelectOptions(Object.values(this.optionLabesl),Object.keys(this.optionLabesl)),
  
        onConfirm: (selectedReason) => {
          console.log('Motif sélectionné :', selectedReason);
          // Appeler API backend avec `selectedReason`
         this.changeStatusAction(counter,selectedReason);
        },
        message: this.form_labels.status,
      });
    }
  isActiveAction=(counter: Counter)=>{
      this.confirmIsactivateFormervice.open({
       
        options:formedSelectOptions([this.form_labels.active,this.form_labels.disable],
         [true,false]),
  
        onConfirm: (selectedReason) => {
          console.log('Motif sélectionné :', selectedReason);
          // Appeler API backend avec `selectedReason`
         this.changeBooleanAction(counter,selectedReason);
        },
        message: this.form_labels.status,
      });
    }
  /* statusValue=(cellvalue: any)=>{
   
    const val=cellvalue===StatusEnum.ACTIVE
      ?this.toastmessges?.active
      :cellvalue===StatusEnum.INACTIVE
      ?this.toastmessges?.disable
      :this.toastmessges?.maintenance;
       console.log("status value",cellvalue," toastmessges ", val);
   
      return val;
    }  */
    statusIconSeverity=(cellvalue: any)=>{
     // 
     let optionIcon:FunctionIconSeverityTooltip={icon:"pi pi-check",severity:"info",tooltip:""}
     const cstatus=this.count_labels.counterStatus 
     switch (cellvalue) {
        case CounterStatus.OPEN:
          optionIcon.icon="pi pi-check"
          optionIcon.severity="success"
          optionIcon.tooltip=cstatus.OPEN
          break ;
      case CounterStatus.CLOSED:
          optionIcon.icon="pi pi-ban"
          optionIcon.severity="warn"
          optionIcon.tooltip=cstatus.CLOSED
          break ;
           case CounterStatus.BUSY:
          optionIcon.icon="pi pi-minus-circle"
          optionIcon.severity="info"
          optionIcon.tooltip=cstatus.BUSY
          break ;
           case CounterStatus.OUT_OF_SERVICE:
          optionIcon.icon="pi pi-times"
          optionIcon.severity="danger"
          optionIcon.tooltip=cstatus.OUT_OF_SERVICE
          break ;
            case CounterStatus.PAUSED:
          optionIcon.icon="pi pi-pause"
          optionIcon.severity="secondary"
          optionIcon.tooltip=cstatus.PAUSED
          break ;
        default:
           optionIcon.icon="pi pi-circle-on"
          optionIcon.severity="primary"
          optionIcon.tooltip=cstatus.RESUME
          break;
      }
      /* cellvalue===StatusEnum.ACTIVE
      ?"pi pi-check"
      :cellvalue===StatusEnum.INACTIVE
      ?"pi pi-ban"
      :"pi pi-wrench"; */
      return optionIcon
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
   
    readonly columns:ColumnConfig<Counter> [] = [

    {
        field:'number',
        header:'N°'
    },

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
        field:'status',
        header:this.form_labels.status,
        isButton:true,
        actionFn:(value) =>this.statusAction(value),
        iconFn:(value)=>this.statusIconSeverity(value).icon,
        severityFn:(value)=>this.statusIconSeverity(value).severity,
        tooltipFn:(value)=>this.statusIconSeverity(value).tooltip
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
