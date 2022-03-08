import { Injectable } from '@angular/core';
import { 
  ActivatedRouteSnapshot, 
  CanActivate, 
  Router, 
  RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';


//https://loiane.com/2017/08/angular-hide-navbar-login-page/
//taken help from this source for auth guard

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isLoggedIn
    .pipe(
        take(1),                              
        map((isLoggedIn: boolean) => {  
          if (!isLoggedIn){
            window.alert("Access not allowed!");
            this.router.navigate(['/login']);  
            return false;
          }
          return true;
        })
      )
  }
}