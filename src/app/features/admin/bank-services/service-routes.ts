import { Routes } from '@angular/router';

export const SERVICE_ROUTES: Routes = [

    {

        path:'',

        loadComponent:()=>import(
            './pages/service-list/service-list'
        ).then(c=>c.ServiceList)

    },

    {

        path:'new',

        loadComponent:()=>import(
            './pages/service-create/service-create'
        ).then(c=>c.ServiceCreate)

    },

    {

        path:':id',

        loadComponent:()=>import(
            './pages/service-details/service-details'
        ).then(c=>c.ServiceDetails)

    },

    {

        path:':id/edit',

        loadComponent:()=>import(
            './pages/service-edit/service-edit'
        ).then(c=>c.ServiceEdit)

    }

];
