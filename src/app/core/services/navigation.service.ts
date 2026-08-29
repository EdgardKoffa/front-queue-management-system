import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesBaseNames } from '../../configuration/routes.config';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
     private readonly router = inject(Router);

  goToLogin(): void {
    this.router.navigate([RoutesBaseNames.LOGIN]);
  }

  goToAdmin(): void {
    this.router.navigate([RoutesBaseNames.ADMIN]);
  }

  goToAgency(endpoint?:any[]): void {
    if(endpoint){
    this.router.navigate([RoutesBaseNames.ADMIN,RoutesBaseNames.AGENCY,...endpoint]);
  }else{
     this.router.navigate([RoutesBaseNames.ADMIN,RoutesBaseNames.AGENCY]);
  }
  }

  goToBranch(endpoint?:any[]): void {
    if(endpoint){
    this.router.navigate([RoutesBaseNames.ADMIN,RoutesBaseNames.BRANCH,...endpoint]);
  }else{
     this.router.navigate([RoutesBaseNames.ADMIN,RoutesBaseNames.BRANCH]);
  }
  }

  goToCounter(endpoint:any[]=[]): void {
    this.router.navigate([RoutesBaseNames.ADMIN,RoutesBaseNames.COUNTER,...endpoint]);
  }

   goToBankService(endpoint:any[]=[]): void {
    this.router.navigate([RoutesBaseNames.ADMIN,RoutesBaseNames.SERVICE,...endpoint]);
  }

  goToKiosk(endpoint:any[]=[]): void {
    this.router.navigate([RoutesBaseNames.KIOSK,...endpoint]);
  }

  goToDisplay(endpoint:any[]=[]): void {
    this.router.navigate([RoutesBaseNames.DISPLAY,...endpoint]);
  }

  goToAdvertising(endpoint:any[]=[]): void {
    this.router.navigate([RoutesBaseNames.ADVERTISING,...endpoint]);
  }
 goTo400(endpoint:any[]=[]): void {
    this.router.navigate(["400",...endpoint]);
  }
  goTo401(endpoint:any[]=[]): void {
    this.router.navigate(["401",...endpoint]);
  }
  goTo403(endpoint:any[]=[]): void {
    this.router.navigate(["403",...endpoint]);
  }
  goTo404(endpoint:any[]=[]): void {
    this.router.navigate(["404",...endpoint]);
  }
  goTo500(endpoint:any[]=[]): void {
    this.router.navigate(["500",...endpoint]);
  }
  goTo502_503(endpoint:any[]=[]): void {
    this.router.navigate(["503",...endpoint]);
  }
}