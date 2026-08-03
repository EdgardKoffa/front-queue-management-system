import { Component, signal, /* signal */ } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalLoading } from './shared/components/global.loading/loading';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmFormDialog } from './shared/components/confirm-form-dialog/confirm-form-dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    GlobalLoading,
    ToastModule,
    ConfirmDialogModule,
    ConfirmFormDialog
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 // protected readonly title = signal('ns-global-queue-front');
  
}
