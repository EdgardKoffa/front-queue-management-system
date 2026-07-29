import { MenuItem } from 'primeng/api';
import { RoleEnum } from '../../../../auth/enums/role-enum';
import { COUNTER_SIDEBAR_MENU, SIDEBAR_MENU } from './sidebar-menu';
import { MENU_LABELS } from '../../../../../shared/constants';

export class MenuFactory {

    static create(role: RoleEnum): MenuItem[] {

        switch (role) {

            case RoleEnum.SUPER_ADMIN:

                return this.superAdmin();

            case RoleEnum.ADMIN:

                return this.admin();

            case RoleEnum.OPERATOR:

                return this.counter();

            case RoleEnum.KIOSK:

                return [];

            case RoleEnum.DISPLAY:

                return [];

            case RoleEnum.ADVERTISING:

                return this.advertising();

            default:

                return [];

        }

    }

    private static superAdmin(): MenuItem[] {

        return SIDEBAR_MENU
        
      }

    private static admin(): MenuItem[] {

        return this.superAdmin();

    }

    private static counter(): MenuItem[] {

        return COUNTER_SIDEBAR_MENU

    }

    private static advertising(): MenuItem[] {

        return [

            {

                label:MENU_LABELS.CAMPAIGN,

                icon:'pi pi-images',

                routerLink:'/advertising'

            }

        ];

    }

}