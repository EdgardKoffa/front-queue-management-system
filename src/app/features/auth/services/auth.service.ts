import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { SessionService } from './session.service';
import { AuthenticatedUser } from '../models/authenticated-user';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { Endpoints } from '../../../configuration/endpoint';
import { LoginRequest } from '../models/login-request';
import { NavigationService } from '../../../core/services/navigation.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
   private readonly http = inject(HttpClient);

  private readonly tokenService = inject(TokenService);

  private readonly sessionService = inject(SessionService);

   private readonly router = inject(NavigationService);

  login(request: LoginRequest): Observable<LoginResponse> {
   // console.log("=======> request",request)
    return this.http
      .post<LoginResponse>(Endpoints.auth.login, request)
      .pipe(
        tap(response => {

          this.tokenService.save(response.token);

          const user: AuthenticatedUser = {
            username: response.username,

            firstname: response.firstname,

            lastname: response.lastname,

            email: response.email,

            role: response.role,

            branchId: response.branchId,
            id: response.id
          };

          this.sessionService.setUser(user);

        })
      );

  }

   resetAuth(): void {

    this.tokenService.clear();

    this.sessionService.clear();

  } 
  logout(): void {

    this.resetAuth()

    this.router.goToLogin();

  }


  isAuthenticated(): boolean {

    return this.tokenService.exists();

  }

}
