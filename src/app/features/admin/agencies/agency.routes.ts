import { Routes } from '@angular/router';

export const AGENCY_ROUTES: Routes = [

    {

        path:'',

        loadComponent:()=>import(
            './pages/agency-list/agency-list'
        ).then(c=>c.AgencyList)

    },

    {

        path:'new',

        loadComponent:()=>import(
            './pages/agency-create/agency-create'
        ).then(c=>c.AgencyCreate)

    },

    {

        path:':id',

        loadComponent:()=>import(
            './pages/agency-details/agency-details'
        ).then(c=>c.AgencyDetails)

    },

    {

        path:':id/edit',

        loadComponent:()=>import(
            './pages/agency-edit/agency-edit'
        ).then(c=>c.AgencyEdit)

    }

];
