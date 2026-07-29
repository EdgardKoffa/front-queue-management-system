import { MenuItem } from 'primeng/api';
import { MENU_LABELS } from '../../../../../shared/constants';

export const SIDEBAR_MENU: MenuItem[] = [

    {
        label: MENU_LABELS.DASHBOARD,
        icon: 'pi pi-home',
        routerLink: '/admin/dashboard'
    },

    {
        label: MENU_LABELS.ORGANISATION,

        icon: 'pi pi-building',

        items: [

            {
                label:MENU_LABELS.AGENCY ,
                icon: 'pi pi-building-columns',
                routerLink: '/admin/agencies'
            },

            {
                label:MENU_LABELS.COUNTER ,
                icon: 'pi pi-desktop',
                routerLink: '/admin/counters'
            },

            {
                label: MENU_LABELS.BANK_SERVICE,
                icon: 'pi pi-list',
                routerLink: '/admin/services'
            }

        ]
    },

    {
        label: MENU_LABELS.TICKET,

        icon: 'pi pi-ticket',

        routerLink: '/admin/tickets'
    },

    {
        label: MENU_LABELS.USERS,

        icon: 'pi pi-users',

        routerLink: '/admin/users'
    },

    {
        label:MENU_LABELS.REPORT,

        icon: 'pi pi-chart-bar',

        routerLink: '/admin/reports'
    },

    {
        label: MENU_LABELS.SETTING,

        icon: 'pi pi-cog',

        routerLink: '/admin/settings'
    }

];

export const COUNTER_SIDEBAR_MENU:MenuItem[]=[

            {

                label:MENU_LABELS.DASHBOARD,

                icon:'pi pi-home',

                routerLink:'/counter'

            },

            {

                label:MENU_LABELS.CALL_TICKET,

                icon:'pi pi-volume-up',

                routerLink:'/counter/call'

            },

            {

                label:MENU_LABELS.HISTORY,

                icon:'pi pi-history',

                routerLink:'/counter/history'

            }

        ];