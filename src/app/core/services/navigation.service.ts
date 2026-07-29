import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesConfig } from '../../configuration/routes.config';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
     private readonly router = inject(Router);

  goToLogin(): void {
    this.router.navigate([RoutesConfig.LOGIN]);
  }

  goToAdmin(): void {
    this.router.navigate([RoutesConfig.ADMIN]);
  }

  goToCounter(): void {
    this.router.navigate([RoutesConfig.COUNTER]);
  }

  goToKiosk(): void {
    this.router.navigate([RoutesConfig.KIOSK]);
  }

  goToDisplay(): void {
    this.router.navigate([RoutesConfig.DISPLAY]);
  }

  goToAdvertising(): void {
    this.router.navigate([RoutesConfig.ADVERTISING]);
  }
 goTo400(): void {
    this.router.navigate(["/400"]);
  }
  goTo401(): void {
    this.router.navigate(["/401"]);
  }
  goTo403(): void {
    this.router.navigate(["/403"]);
  }
  goTo404(): void {
    this.router.navigate(["/404"]);
  }
  goTo500(): void {
    this.router.navigate(["/500"]);
  }
  goTo502_503(): void {
    this.router.navigate(["/503"]);
  }
}