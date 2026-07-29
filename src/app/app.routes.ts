import { Routes } from '@angular/router';
import { RoutesConfig } from './configuration/routes.config';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';
import { RoleEnum } from './features/auth/enums/role-enum';

export const routes: Routes = [
   {
    path: '',
    redirectTo: RoutesConfig.LOGIN,
    pathMatch: 'full'
  },

  {
    path: RoutesConfig.LOGIN,
    loadComponent: () =>
      import('./features/auth/pages/login/login')
        .then(m => m.Login)
  },
  {
    path: RoutesConfig.ADMIN,
    canActivate:[authGuard,roleGuard],
    data:{
      roles:[
        RoleEnum.ADMIN,
        RoleEnum.SUPER_ADMIN
      ]
    },
    loadComponent: () =>
      import('./features/admin/layout/admin-layout')
        .then(m => m.AdminLayout),
        children:[

        {
            path:'dashboard',
            loadComponent:()=>import(
                './features/admin/dashboard/dashboard'
            ).then(c=>c.Dashboard)
        },

        {
            path:'',
            redirectTo:'dashboard',
            pathMatch:'full'
        }

    ]

  },
/* 
  {
    path: RoutesConfig.COUNTER,
     canActivate:[authGuard,roleGuard],
    data:{
      roles:[
        RoleEnum.OPERATOR,
      ]
    },
    loadComponent: () =>
      import('./layouts/counter/counter-layout/counter-layout')
        .then(m => m.CounterLayout)
  },

  {
    path: RoutesConfig.KIOSK,
     canActivate:[authGuard,roleGuard],
    data:{
      roles:[
        RoleEnum.KIOSK,
      ]
    },
    loadComponent: () =>
      import('./layouts/kiosk/kiosk-layout/kiosk-layout')
        .then(m => m.KioskLayout)
  },

  {
    path: RoutesConfig.DISPLAY,
     canActivate:[authGuard,roleGuard],
    data:{
      roles:[
        RoleEnum.DISPLAY,
      ]
    },
    loadComponent: () =>
      import('./layouts/display/display-layout/display-layout')
        .then(m => m.DisplayLayout)
  },

  {
    path: RoutesConfig.ADVERTISING,
     canActivate:[authGuard,roleGuard],
    data:{
      roles:[
        RoleEnum.ADVERTISING,
      ]
    },
    loadComponent: () =>
      import('./layouts/advertising/advertising-layout/advertising-layout')
        .then(m => m.AdvertisingLayout)
  },
 */
 {
    path: '401',
    loadComponent: () =>
        import('./features/errors/unauthorized/unauthorized')
            .then(c => c.Unauthorized)
},

{
    path: '403',
    loadComponent: () =>
        import('./features/errors/forbidden/forbidden')
            .then(c => c.Forbidden)
},

{
    path: '500',
    loadComponent: () =>
        import('./features/errors/server-error/server-error')
            .then(c => c.ServerError)
},
{
    path: '404',
    loadComponent: () =>
        import('./features/errors/not-found/not-found')
            .then(c => c.NotFound)
}
,
{
    path: '**',
    loadComponent: () =>
        import('./features/errors/not-found/not-found')
            .then(c => c.NotFound)
}

];
