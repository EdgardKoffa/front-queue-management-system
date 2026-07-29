import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginRequest } from '../../models/login-request';
import { AuthService } from '../../services/auth.service';
import { RoleEnum } from '../../enums/role-enum';
import { NavigationService } from '../../../../core/services/navigation.service';
import { PRIMENG_IMPORTS } from '../../../../shared/primeNG/primeng.imports';
import { ToastNotificationService } from '../../../../core/services/notification.service';
import { LABELS } from './login-labels';

@Component({
  selector: 'app-login',
   standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...PRIMENG_IMPORTS
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly fb = inject(FormBuilder);

  private readonly authService = inject(AuthService);
 private readonly messageService = inject(ToastNotificationService);
  private readonly router = inject(NavigationService);

  readonly hidePassword = signal(true);

  readonly labels = LABELS;
readonly loginForm = this.fb.nonNullable.group({

    userName: ['', Validators.required],

    password: ['', Validators.required]

  });
togglePassword(): void {

    this.hidePassword.update(v => !v);

  }
 login(): void {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;

    }
 
   // this.loading.set(true);

    const request: LoginRequest = this.loginForm.getRawValue();

    this.authService.login(request).subscribe(
      {

      next: response => {

        this.messageService.success('Connexion réussie');


 //       this.loading.set(false);

         switch (response.role) {

          case RoleEnum.SUPER_ADMIN:
          console.warn("after login",response.role)
            this.router.goToAdmin();

            break;
          
          case RoleEnum.ADMIN:

            this.router.goToAdmin();

            break;

          case RoleEnum.OPERATOR:

            this.router.goToCounter();

            break;

          case RoleEnum.KIOSK:

            this.router.goToKiosk();

            break;

          case RoleEnum.DISPLAY:

            this.router.goToDisplay();

            break;

          default:

            this.router.goToLogin();

        } 

      },

      error: err => {
        console.log(err)
        let message = err.error?.message ?? 'Erreur de connexion';

    if (err.status === 401&&!err.error?.message) {
        message = "Nom d'utilisateur ou mot de passe incorrect.";
    } else if (err.status === 403) {
        message = "Accès refusé.";
    } else if (err.status === 0) {
        message = "Impossible de joindre le serveur.";
    }
    //    this.loading.set(false);
        this.messageService.error(message);
     
      }

    });
 }

}
