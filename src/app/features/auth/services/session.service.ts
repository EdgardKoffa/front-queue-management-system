import { computed, Injectable, signal } from '@angular/core';
import { AuthenticatedUser } from '../models/authenticated-user';
import { RoleEnum } from '../enums/role-enum';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
   readonly currentUser = signal<AuthenticatedUser | null>(null);
private readonly sessionkey="user_session";
    readonly isAuthenticated = computed(() =>
    this.currentUser() !== null
  );
getUser():AuthenticatedUser|null{
 const sessionValue=sessionStorage.getItem(this.sessionkey)
 if(sessionValue&&sessionValue.length>0){
  return JSON.parse(sessionValue)
 }
  return this.currentUser()
}


  setUser(user: AuthenticatedUser): void {
    sessionStorage.setItem(this.sessionkey,JSON.stringify(user))
    this.currentUser.set(user);
  }

  clear(): void {
    sessionStorage.removeItem(this.sessionkey)
    this.currentUser.set(null);
  }

  hasRole(role:string):boolean{

    const usr=this.getUser();

    return usr?.role===role;

}
  hasAnyRole(roles:RoleEnum[]):boolean{

    const usr=this.getUser();

    if(!usr){

        return false;

    }

    return roles.includes(usr.role);

}
  
}
