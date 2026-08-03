import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastNotificationService } from '../services/notification.service';
import { TokenService } from '../../features/auth/services/token.service';
import { SessionService } from '../../features/auth/services/session.service';
import { NavigationService } from '../services/navigation.service';
import { catchError, throwError } from 'rxjs';
import { RoutesBaseNames } from '../../configuration/routes.config';
import { Router } from '@angular/router';
import { validationMessages } from '../../shared/constants/validation.message';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationMsg=validationMessages
  const notification=inject(ToastNotificationService)
  
  const tokenService=inject(TokenService)

  const sessionService=inject(SessionService)

  const navigate =inject(NavigationService)

  const router = inject(Router);
  const currentRoute = router.url; 
  console.log('Requête émise depuis la route :', currentRoute);
 
  return next(req).pipe(
    catchError((error:HttpErrorResponse)=>{
       console.warn("erreur interne",error," code ",error.status)
      switch (error.status) {
        
         case 400:
           notification.error(
            'La requête est invalide. Vérifiez les paramètres envoyés.'
          );
          navigate.goTo400()
          break;
        case 401:
          /**
           * On ne traite PAS le login ici.
           * Le composant Login gère lui-même son 401.
           */
          if (!req.url.includes(RoutesBaseNames.LOGIN)) {

            //tokenService.clear();

           // sessionService.clear();

            notification.warning(
             error?.message?? notificationMsg.toast_error401,notificationMsg.toast_error_summary
            );

           // navigate.goToLogin();
          }
          break;
         case 403:
           notification.error(
            notificationMsg.toast_error403,notificationMsg.toast_error_summary
          );

          navigate.goTo403();
          break;
         case 404:
           notification.warning(
            notificationMsg.toast_agency404_detail,notificationMsg.toast_error_summary
          );
          navigate.goTo404()
          break;
        
         case 500:
           notification.error(
            'Une erreur interne est survenue.'
          );
          navigate.goTo500()
          break;
        
        default:
          notification.error(
            "Le serveur est temporairement indisponible (maintenance ou surcharge). Réessayez après quelques minutes."
          );
          navigate.goTo502_503()
          break;
      }
      return throwError(()=>error)
    })
  );
};
