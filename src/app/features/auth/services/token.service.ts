import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
   private readonly TOKEN_KEY ='token_local_key' //'Eblz+UfRhUON3l30ixeQfFiOs0x4lW6GzdqyvpzyCus=';

  save(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  get(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  remove(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  exists(): boolean {
    return this.get() !== null;
  }
   clear(): void {
    this.remove();
  }

  decodeToken(): any {
    try {
      const token=this.get()
      if(!token){
        return null
      }
      const payload = token.split('.')[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      const jsonPayload =JSON.parse(decoded);
      console.log("decoded token payload",jsonPayload)
      return jsonPayload;
    } catch (e) {
      console.warn("",e)
      return null;
    }
  }

  hasToken(): boolean {
    const token = this.get();

    return token !== null && token.trim() !== '';
  }
}
