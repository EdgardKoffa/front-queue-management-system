import { Routes } from '@angular/router';

export const Counter_ROUTES: Routes = [

    {

        path:'',

        loadComponent:()=>import(
            './pages/counter-list/counter-list'
        ).then(c=>c.CounterList)

    },

    {

        path:'new',

        loadComponent:()=>import(
            './pages/counter-create/counter-create'
        ).then(c=>c.CounterCreate)

    },

    {

        path:':id',

        loadComponent:()=>import(
            './pages/counter-details/counter-details'
        ).then(c=>c.CounterDetails)

    },

    {

        path:':id/edit',

        loadComponent:()=>import(
            './pages/counter-edit/counter-edit'
        ).then(c=>c.CounterEdit)

    }

];
