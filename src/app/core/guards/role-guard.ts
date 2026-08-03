import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { SessionService } from '../../features/auth/services/session.service';
import { RoutesBaseNames } from '../../configuration/routes.config';
import { NavigationService } from '../services/navigation.service';
import { RoleEnum } from '../../features/auth/enums/role-enum';

export const roleGuard: CanActivateFn = (route) => {

  const sessionService = inject(SessionService);

  const router = inject(NavigationService);

  const expectedRoles = route.data['roles'] as RoleEnum[];

 // const user = sessionService.getUser();
console.log("in roleGuard",route.data)
  if (!sessionService.isAuthenticated()) {
console.log("in roleGuard isAuthenticated",sessionService.isAuthenticated())
    router.goToLogin();

    return false;

  }

  if (sessionService.hasAnyRole(expectedRoles)) {
   // console.log("in roleGuard hasAnyRole",sessionService.hasAnyRole(expectedRoles),"role",expectedRoles)
    return true;

  }

  router.goToLogin();

  return false;

};