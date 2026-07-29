import { Component } from '@angular/core';
import { Sidebar } from './components/sidebar/sidebar';
import { Topbar } from './components/topbar/topbar';
import { Footer } from './components/footer/footer';
import { RouterOutlet } from '@angular/router';
import { PRIMENG_IMPORTS } from '../../../shared/primeNG/primeng.imports';

@Component({
  selector: 'app-admin-layout',
  standalone:true,
  imports: [
    RouterOutlet,
    Sidebar,
        Topbar,
        Footer,
       ...PRIMENG_IMPORTS

  ],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {}
