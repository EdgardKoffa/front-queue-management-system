import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastNotificationService {
    private readonly msgService=inject(MessageService)

    success(message:string,summary="Success",duration?:number){
        const life=duration?duration:5000
        this.msgService.add({
            severity:"success",
            summary,
            detail:message,
            life,

        })
    }
     error(message:string,summary="Erreur",duration?:number){
        const life=duration?duration:5000
        this.msgService.add({
            severity:"error",
            summary,
            detail:message,
            life,
            
        })
    }
     warning(message:string,summary="Attention!",duration?:number){
        const life=duration?duration:5000
        this.msgService.add({
            severity:"warn",
            summary,
            detail:message,
            life,
            
        })
    }
     info(message:string,summary="Information!",duration?:number){
        const life=duration?duration:5000
        this.msgService.add({
            severity:"info",
            summary,
            detail:message,
            life,
            
        })
    }
}
