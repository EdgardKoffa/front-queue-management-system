import { Component, inject } from '@angular/core';
import { LoaderService } from '../../../core/services/loader.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-global-loader',
  imports: [ProgressSpinnerModule],
  templateUrl: './loading.html',
  styleUrl: './loading.css',
})
export class GlobalLoading {
   readonly loader=inject(LoaderService)

}
