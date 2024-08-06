import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { jwtDecode } from 'jwt-decode';

export default class AuthService {

  TOKEN_KEY = '@garage-dlvr-token';
  USER_EMAIL = '@garage-dlvr-user_email';
  USER_NAME = '@garage-dlvr-user_name';
  COMPANY_NAME = '@garage-dlvr-company-name';

  router = inject(Router);

  private isLogged = new BehaviorSubject(false);
  public currentStatusLogged = this.isLogged.asObservable();

  autenticated(): boolean {
    const token = this.getToken();
    return token ? this.validToken(token) : false;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  login(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);

    // decode JWT for get email and name by user
    const decode: any = jwtDecode(token);
    localStorage.setItem(this.USER_NAME, decode.name);
    localStorage.setItem(this.USER_EMAIL, decode.email);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_NAME);
    localStorage.removeItem(this.USER_EMAIL);
    this.isLogged.next(false);
    this.router.navigate(['/']);
  }

  setLoginStatus(status: boolean) {
    this.isLogged.next(status);
  }

  validToken(token: string): boolean {
    this.currentStatusLogged.subscribe(status => console.log('currentStatusLogged: ', status));
    return true;
  }

  getHeaders() {
    return {
      Accept: 'application/json',
      Authorization: `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json',
      rejectUnauthorized: 'false',
    };
  }
}