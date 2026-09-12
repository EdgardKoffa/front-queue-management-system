import { Routes } from '@angular/router';

export const User_ROUTES: Routes = [

    {

        path:'',

        loadComponent:()=>import(
            './pages/user-list/user-list'
        ).then(c=>c.UserList)

    },

    {

        path:'new',

        loadComponent:()=>import(
            './pages/user-create/user-create'
        ).then(c=>c.UserCreate)

    },

    {

        path:':id',

        loadComponent:()=>import(
            './pages/user-details/user-details'
        ).then(c=>c.UserDetails)

    },

    {

        path:':id/edit',

        loadComponent:()=>import(
            './pages/user-edit/user-edit'
        ).then(c=>c.UserEdit)

    }

];
