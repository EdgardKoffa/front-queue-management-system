import { Component, inject, signal } from '@angular/core';
import { formsLabels, headerLabels } from '../../../../../shared/constants';
import { validationMessages } from '../../../../../shared/constants/validation.message';
import { AlertDialogueService } from '../../../../../core/services/alert.dialogue.services';
import { ToastNotificationService } from '../../../../../core/services/notification.service';
import { UserService } from '../../services/user-service';
import { NavigationService } from '../../../../../core/services/navigation.service';
import { UserEntity } from '../../models/user';
import { ConfirmDialogService } from '../../../../../core/services/confir.form.dialog.service';
import { TableLazyLoadEvent } from 'primeng/table';
import { PageRequest } from '../../../../../core/models/page-request';
import { ColumnConfig, FunctionIconSeverityTooltip, IconType, SeverityType } from '../../../../../shared/models/table-column';
import { formedSelectOptions } from '../../../../../shared/utils/utils.functions';
import { PageHeader } from '../../../../../shared/components/page-header/page-header';
import { DataTable } from '../../../../../shared/components/data-table/data-table';

@Component({
  selector: 'app-user-list',
  imports: [PageHeader,DataTable],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  readonly user_labels=headerLabels.users
    readonly form_labels=formsLabels
    readonly branch_labels=headerLabels.branch
    private readonly toastmessges=validationMessages
        readonly confirmService=inject(AlertDialogueService)
        readonly tostMessageService=inject(ToastNotificationService)
        private readonly userService = inject(UserService);
     private readonly navigate =inject(NavigationService);
      butonIcon = signal('pi pi-plus');
      users = signal<UserEntity[]>([]);
    
      loading = signal(false);
    
      totalRecords = signal(0);
     private confirmStatusFormervice = inject(ConfirmDialogService<boolean>);
      
     private confirmIsactivateFormervice = inject(ConfirmDialogService<boolean>);
      
   
  
       load(event: TableLazyLoadEvent) {
  
    this.loading.set(true);
  
    const request: PageRequest = {
  
      page: Math.floor((event.first ?? 0) / (event.rows ?? 10)),
      size: event.rows ?? 10,
      sortField: event.sortField as string,
      sortOrder: event.sortOrder === 1 ? 'asc' : 'desc'
  
    };
  
      this.userService.findPage(request).subscribe({
  
        next: response => {
  
          const contents=response.data
          this.users.set(contents.filter(b=>b?.deletedAt===null));
  
          this.totalRecords.set(response.totalElements);
        
          this.loading.set(false);
  
        },
  
        error: (err) => {
          this.tostMessageService.error(
            err?.response?.data?.message??err?.message??this.toastmessges.toast_error404,
            this.toastmessges.toast_error_summary
          )
          this.loading.set(false);
          return 
        }
  
      });
  
    }
  
    create() {
  
      this.navigate.goToUsers(['new']);
  
    }
  
    details(user: UserEntity) {
      /* if(user.enabled!==true||user.locked){
        this.tostMessageService.warning(this.toastmessges.toast_warn_summary,this.toastmessges.agency_edit_warning)
        return
      } */
      this.navigate.goToCounter([user.id]);
  
    }
  
    edit(user: UserEntity) {
     /*  if(user.enabled!==true){
        this.tostMessageService.warning(this.toastmessges.toast_warn_summary,this.toastmessges.agency_detail_warning)
        return
      } */
      this.navigate.goToCounter([user.id,'edit']);
  
    }
  
    delete=(user: UserEntity) => {
      this.confirmService.confirmDialog(
        "p-button-danger",
        `p-button-text`,
        ()=>{
           this.loading.set(true);
  
              this.userService.delete(
                  user.id
              ).subscribe({
  
                  next: () => {
  
                      this.tostMessageService
                      .success(this.toastmessges.toast_succes_summary,
                        this.toastmessges.agency_success_deleted);
                        //location.reload()
                        const oldData=this.users()
                       
                        const newData=oldData.filter((item)=>item.id!==user.id)
                        this.users.set(newData)
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

     private changeBooleanAction=(user: UserEntity, status: boolean,typye:"locked"|"enabled") => {
         
               this.loading.set(true);
      
                 (typye==="enabled"? this.userService.enable_desableUserRole(
                      user.id,
                      status
                  ):this.userService.lock_unlockUserRole(
                      user.id,
                      status
                  )).subscribe({
      
                      next: (resp) => {
      
                        if (resp?.success && resp?.data!=null) {
                          this.tostMessageService
                          .success(resp.message??this.toastmessges.toast_success_detail,
                            this.toastmessges.toast_succes_summary);
                            const oldData=this.users()
                           
                            const newData=oldData.map((item)=>{
                              if(item.id===user.id){
                                return resp.data
                              }
                              return item
                            })
      
                            this.users.set(newData)
                            
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
     
    isActiveAction=(user: UserEntity,type:"enabled"|"locked")=>{
          this.confirmIsactivateFormervice.open({
           
            options:formedSelectOptions([this.form_labels.active,this.form_labels.disable],
             [true,false]),
      
            onConfirm: (selectedReason) => {
              console.log('Motif sélectionné :', selectedReason);
              // Appeler API backend avec `selectedReason`
             this.changeBooleanAction(user,selectedReason,type);
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
    readonly columns:ColumnConfig<UserEntity> [] = [
    
        {
            field:'firstName',
            header:this.form_labels.F_NAME
        },
    
        {
            field:'email',
            header:"Email"
        },
    
        {
            field:'lastName',
            header:this.form_labels.L_NAME
        },
    
        {
            field:'branchName',
            header:this.branch_labels.title[0]
        },
    
        {
            field:'username',
            header:this.form_labels.username
        },
        {
            field:'enabled',
            header:this.form_labels.isActif[0],
            isButton:true,
            actionFn:(value) =>this.isActiveAction(value,"enabled"),
            iconFn:(value)=>this.isActiveIcon(value),
            severityFn:(value)=>this.isActiveSeverity(value),
           // tooltipFn:(value)=>this.statusIconSeverity(value).tooltip
        },
    
        {
            field:'locked',
            header:this.form_labels.isLocked,
            isButton:true,
            actionFn:(value)=>this.isActiveAction(value,"locked"),
            iconFn:(value)=>this.isActiveIcon(value),
            severityFn:(value)=>this.isActiveSeverity(value),
           //tooltipFn:(val)=>val===true?this.form_labels.isLocked:this.form_labels.isDesactif[0]
        }
    
    ];
}
