import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import AuthService from "./auth.service";
import { Observable } from "rxjs";

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
  Observable<boolean | UrlTree> |
  Promise<boolean | UrlTree> |
  boolean |
  UrlTree => {
  return inject(AuthService).autenticated() ? true : inject(Router).createUrlTree([''])
}