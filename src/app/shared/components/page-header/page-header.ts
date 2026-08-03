import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-page-header',
  imports: [ButtonModule],
  templateUrl: './page-header.html',
  styleUrl: './page-header.css',
})
export class PageHeader {

  title = input.required<string>();

    subtitle = input('');

    buttonLabel = input('');

    buttonIcon = input('pi pi-arrow-left');

    buttonVisible = input(true);

    action = output<void>();
}
