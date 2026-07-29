import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PanelMenuModule } from 'primeng/panelmenu';
import { SIDEBAR_MENU } from './sidebar-menu';
import { LayoutService } from '../../../../../core/services/layout.service';
import { APP_BRAND } from '../../../../../branding/app.brand';
import { SessionService } from '../../../../auth/services/session.service';
import { MenuFactory } from './menu.factory';
import { PRIMENG_IMPORTS } from '../../../../../shared/primeNG/primeng.imports';


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
  protected readonly items = computed(() => {

    const role = this.session.getUser()?.role;

    if (!role) {

        return [];

    }

    return MenuFactory.create(role);

});
}