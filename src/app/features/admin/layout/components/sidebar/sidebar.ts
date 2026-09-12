import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutService } from '../../../../../core/services/layout.service';
import { APP_BRAND } from '../../../../../branding/app.brand';
import { SessionService } from '../../../../auth/services/session.service';
import { MenuFactory } from './menu.factory';
import { PRIMENG_IMPORTS } from '../../../../../shared/primeNG/primeng.imports';
import { AuthService } from '../../../../auth/services/auth.service';
import { MENU_LABELS } from '../../../../../shared/constants';


@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        ...PRIMENG_IMPORTS
    ],
    templateUrl: './sidebar.html',
    styleUrl: './sidebar.css'
})
export class Sidebar {
  //  readonly items = SIDEBAR_MENU;
    readonly applabels=APP_BRAND;
  protected readonly layout =inject(LayoutService);

  private readonly session =inject(SessionService);
  readonly auth=inject(AuthService)

  logout(){
    this.auth.logout()
  }
  protected readonly items = computed(() => {

    const role = this.session.getUser()?.role;

    if (!role) {

        return [];

    }

    return [...MenuFactory.create(role),{
             label:MENU_LABELS.LOGOUT,
    
            icon:'pi pi-sign-out text-red-500! dark:text-red-400! font-bold text-xl',
            linkClass: 'text-red-500! dark:text-red-400! font-bold',
            command:()=>{
                this.auth.logout()
            }
        }];

});
}