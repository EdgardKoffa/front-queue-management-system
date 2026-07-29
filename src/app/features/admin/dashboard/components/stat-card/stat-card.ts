import { Component, input } from '@angular/core';
import { PRIMENG_IMPORTS } from '../../../../../shared/primeNG/primeng.imports';

@Component({
  selector: 'app-stat-card',
   standalone:true,
  imports: [...PRIMENG_IMPORTS],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css',
})
export class StatCard {
  title = input('');

  value = input(0);

  icon = input('');

}
