import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SessionService } from '../../../../auth/services/session.service';
import { MENU_LABELS } from '../../../../../shared/constants';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../../auth/services/auth.service';
import { LayoutService } from '../../../../../core/services/layout.service';
import { PRIMENG_IMPORTS } from '../../../../../shared/primeNG/primeng.imports';
import { getTheme, setTheme } from '../../../../../shared/utils';


@Component({
  selector: 'app-topbar',
  imports: [
     RouterModule,
        ...PRIMENG_IMPORTS
  ],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {
private readonly session = inject(SessionService);
private readonly auth=inject(AuthService)
readonly menu_labels=MENU_LABELS
protected readonly currentUser = computed(() => this.session.getUser());
protected readonly layout =inject(LayoutService);
protected readonly theme=getTheme
logout(){
  this.auth.logout()
}
 toggleThemeMode() {
   const element = document.querySelector('html')!;
     element.classList.toggle('my-app-dark');
 
  if(this.theme){
    localStorage.removeItem("dark")
  }else{
    setTheme()
  }
  }
protected readonly items: MenuItem[] = [

    {
        label:MENU_LABELS.MY_PROFIL,

        icon:'pi pi-user'
    },

    {

        label:MENU_LABELS.CHANGE_PWD,

        icon:'pi pi-lock'

    },

    {

        separator:true

    },

    {

        label:MENU_LABELS.LOGOUT,

        icon:'pi pi-sign-out',

        command:()=>this.logout()

    }

];

}
