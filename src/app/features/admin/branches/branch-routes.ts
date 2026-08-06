import { Routes } from '@angular/router';

export const BRANCH_ROUTES: Routes = [

    {

        path:'',

        loadComponent:()=>import(
            './pages/branch-list/branch-list'
        ).then(c=>c.BranchList)

    },

    {

        path:'new',

        loadComponent:()=>import(
            './pages/branch-create/branch-create'
        ).then(c=>c.BranchCreate)

    },

    {

        path:':id',

        loadComponent:()=>import(
            './pages/branch-detail/branch-detail'
        ).then(c=>c.BranchDetail)

    },

    {

        path:':id/edit',

        loadComponent:()=>import(
            './pages/branch-edit/branch-edit'
        ).then(c=>c.BranchEdit)

    }

];
