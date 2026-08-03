import { inject, Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { validationMessages } from '../../shared/constants/validation.message';

@Injectable({
  providedIn: 'root',
})
export class AlertDialogueService {
    private readonly cdialogueService=inject(ConfirmationService)
    private readonly messageLabels=validationMessages
    confirmDialog(acceptButtonStyleClass:'p-button-danger'|'p-button-text',rejectButtonStyleClass:'p-button-danger'|'p-button-text',
        actionAccept:()=>void,
        rejecAction:()=>void,
        acceptIcon:"pi pi-trash"|"pi pi-user-edit"|"pi pi-pen-to-square"|"pi pi-ban"|"pi pi-check",
        rejectIcon:"pi pi-times-circle"|"pi pi-ban"|"pi pi-check",
        closable?: boolean | undefined){
        this.cdialogueService.confirm({
            header:"Confirmation",
            message:this.messageLabels.confirmDG_question,
            closable,
            icon:"pi pi-question-circle",
            accept:actionAccept,
            reject:rejecAction,
             acceptButtonStyleClass,
            acceptIcon,
            rejectIcon,
            rejectLabel:this.messageLabels.confirmDG_reject,
            acceptLabel:this.messageLabels.confirmDG_accept,
        rejectButtonStyleClass,
        })
    }
}