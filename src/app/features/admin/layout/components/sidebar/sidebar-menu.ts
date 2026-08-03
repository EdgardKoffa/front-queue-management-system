import { MenuItem } from 'primeng/api';
import { MENU_LABELS } from '../../../../../shared/constants';
import { RoutesBaseNames } from '../../../../../configuration/routes.config';

export const SIDEBAR_MENU: MenuItem[] = [

    {
        label: MENU_LABELS.DASHBOARD,
        icon: 'pi pi-home',
        routerLink:'dashboard',
        title:MENU_LABELS.DASHBOARD,
        
    },

    {
        label: MENU_LABELS.ORGANISATION,

        icon: 'pi pi-building',

        items: [

            {
                label:MENU_LABELS.AGENCY ,
                icon: 'pi pi-building-columns',
                routerLink: RoutesBaseNames.AGENCY
            },
            {
                label:MENU_LABELS.BRANCH ,
                icon: 'pi pi-warehouse',
                routerLink: RoutesBaseNames.BRANCH
            },

            {
                label:MENU_LABELS.COUNTER ,
                icon: 'pi pi-desktop',
                routerLink: RoutesBaseNames.COUNTER
            },

            {
                label: MENU_LABELS.BANK_SERVICE,
                icon: 'pi pi-list',
                routerLink: RoutesBaseNames.COUNTER+'/services'
            }

        ]
    },

    {
        label: MENU_LABELS.TICKET,

        icon: 'pi pi-ticket',

        routerLink: RoutesBaseNames.COUNTER//+'/ticket'
    },

    {
        label: MENU_LABELS.USERS,

        icon: 'pi pi-users',

        routerLink: RoutesBaseNames.ADMIN+'/users'
    },

    {
        label:MENU_LABELS.REPORT,

        icon: 'pi pi-chart-bar',

        routerLink:RoutesBaseNames.ADMIN+'/reports'
    },

    {
        label: MENU_LABELS.SETTING,

        icon: 'pi pi-cog',

        routerLink: RoutesBaseNames.ADMIN+'settings'
    }

];

export const COUNTER_SIDEBAR_MENU:MenuItem[]=[

            {

                label:MENU_LABELS.DASHBOARD,

                icon:'pi pi-home',

                routerLink:RoutesBaseNames.COUNTER

            },

            {

                label:MENU_LABELS.CALL_TICKET,

                icon:'pi pi-volume-up',

                routerLink:RoutesBaseNames.COUNTER+'/call'

            },

            {

                label:MENU_LABELS.HISTORY,

                icon:'pi pi-history',

                routerLink:RoutesBaseNames.COUNTER+'/history'

            }

        ];