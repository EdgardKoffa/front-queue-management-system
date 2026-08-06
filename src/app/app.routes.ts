import { Routes } from '@angular/router';
import { RoutesBaseNames } from './configuration/routes.config';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';
import { RoleEnum } from './features/auth/enums/role-enum';

/* Apps route urls to pages */
export const routes: Routes = [
  {
    path: '',
    redirectTo: RoutesBaseNames.LOGIN,
    pathMatch: 'full'
  },

  {
    path: RoutesBaseNames.LOGIN,
    loadComponent: () =>
      import('./features/auth/pages/login/login')
        .then(m => m.Login)
  },
  {
    path: RoutesBaseNames.ADMIN,
    canActivate: [authGuard, roleGuard],
    data: {
      roles: [
        RoleEnum.ADMIN,
        RoleEnum.SUPER_ADMIN
      ]
    },
    loadComponent: () =>
      import('./features/admin/layout/admin-layout')
        .then(m => m.AdminLayout),
    children: [

      {
        path: 'dashboard',
        canActivate: [authGuard, roleGuard],
        data: {
          roles: [
            RoleEnum.ADMIN,
            RoleEnum.SUPER_ADMIN
          ]
        },
        loadComponent: () => import(
          './features/admin/dashboard/dashboard'
        ).then(c => c.Dashboard)
      },

      {
        path: RoutesBaseNames.AGENCY,
        canActivate: [authGuard, roleGuard],
        data: {
          roles: [
            RoleEnum.ADMIN,
            RoleEnum.SUPER_ADMIN
          ]
        },
        loadChildren: () => import(
          './features/admin/agencies/agency.routes'
        ).then(m => m.AGENCY_ROUTES)
      },
      {
        path: RoutesBaseNames.BRANCH,
        canActivate: [authGuard, roleGuard],
        data: {
          roles: [
            RoleEnum.ADMIN,
            RoleEnum.SUPER_ADMIN
          ]
        },
        loadChildren: () => import(
          './features/admin/branches/branch-routes'
        ).then(m => m.BRANCH_ROUTES)
      },
       {
        path: RoutesBaseNames.COUNTER,
        canActivate: [authGuard, roleGuard],
        data: {
          roles: [
            RoleEnum.ADMIN,
            RoleEnum.SUPER_ADMIN
          ]
        },
        loadChildren: () => import(
          './features/admin/counters/counters.routes'
        ).then(m => m.Counter_ROUTES)
      },

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },


    ]

  },

  /* 
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
