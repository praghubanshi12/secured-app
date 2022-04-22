import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenService: TokenStorageService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.tokenService.getToken()) {
      this.tokenService.signOut();
      this.router.navigateByUrl("/login");
      return false;
    }
    if (JSON.stringify(route.data) !== "{}") {
      let userRoles = this.tokenService.getUser().roles;
      if (!userRoles.includes(route.data['role'])) {
        this.router.navigateByUrl("/login");
        return false;
      }
    }

    return true;
  }

}
