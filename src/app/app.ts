import { Component, signal, /* signal */ } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalLoading } from './shared/components/global.loading/loading';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,GlobalLoading],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 // protected readonly title = signal('ns-global-queue-front');
  
}
