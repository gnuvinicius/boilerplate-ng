import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import TokenService from "./token.service";
import { Observable } from "rxjs";

// @Injectable({
//   providedIn: 'root'
// })
// class PermissionsService {

//   constructor(private router: Router) {}

//   canActive(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     return false;
//   }
// }

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  Observable<boolean | UrlTree> |
  Promise<boolean | UrlTree> |
  boolean |
  UrlTree  => {
  return inject(TokenService).autenticated() ? true : inject(Router).createUrlTree([''])
}