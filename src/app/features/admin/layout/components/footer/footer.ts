import { Component } from '@angular/core';
import { APP_BRAND } from '../../../../../branding/app.brand';
import { PRIMENG_IMPORTS } from '../../../../../shared/primeNG/primeng.imports';

@Component({
  selector: 'app-footer',
  standalone:true,
  imports: [
    ...PRIMENG_IMPORTS
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  readonly appLabels=APP_BRAND;
}
