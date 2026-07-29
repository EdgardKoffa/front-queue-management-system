import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastNotificationService } from '../services/notification.service';
import { TokenService } from '../../features/auth/services/token.service';
import { SessionService } from '../../features/auth/services/session.service';
import { NavigationService } from '../services/navigation.service';
import { catchError, throwError } from 'rxjs';
import { RoutesConfig } from '../../configuration/routes.config';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const notification=inject(ToastNotificationService)
  
  const tokenService=inject(TokenService)

  const sessionService=inject(SessionService)

  const router =inject(NavigationService)
  
  return next(req).pipe(
    catchError((error:HttpErrorResponse)=>{
       console.warn("erreur interne",error.message," code ",error.status)
      switch (error.status) {
        
         case 400:
           notification.error(
            'La requête est invalide. Vérifiez les paramètres envoyés.'
          );
          router.goTo400()
          break;
        case 401:
          /**
           * On ne traite PAS le login ici.
           * Le composant Login gère lui-même son 401.
           */
          if (!req.url.includes(RoutesConfig.LOGIN)) {

            tokenService.clear();

            sessionService.clear();

            notification.warning(
              'Votre session a été expiré. Veuilles vous reconnectez '
            );

            router.goToLogin();
          }
          break;
         case 403:
           notification.error(
            'Accès refusé.'
          );

          router.goTo403();
          break;
         case 404:
           notification.warning(
            'Ressource introuvable.'
          );
          router.goTo404()
          break;
        
         case 500:
           notification.error(
            'Une erreur interne est survenue.'
          );
          router.goTo500()
          break;
        
        default:
          notification.error(
            "Le serveur est temporairement indisponible (maintenance ou surcharge). Réessayez après quelques minutes."
          );
          router.goTo502_503()
          break;
      }
      return throwError(()=>error)
    })
  );
};
