import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { TokenService } from '../../features/auth/services/token.service';
import { RoutesBaseNames } from '../../configuration/routes.config';
import { NavigationService } from '../services/navigation.service';

export const authGuard: CanActivateFn = () => {

  const tokenService = inject(TokenService);

  const router = inject(NavigationService);

  if (tokenService.hasToken()) {
    console.log("in authGuard hasToken",tokenService.hasToken())
    return true;
  }

  router.goToLogin();

  return false;

};