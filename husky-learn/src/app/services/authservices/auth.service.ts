import { Injectable } from '@angular/core';
import { apiconfig } from '../../config/apiconfig';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { User } from '../../model/User';
import { ApiService } from '../../sharedservices/http-request-custom';

import { JwtService } from "../../sharedservices/jwtToken";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false); 
  constructor( public router: Router,private apiService:ApiService,private jwtService:JwtService) { 
  }
signUp(userDetails):Observable<any>{
  return this.apiService.post('/users' , {user : userDetails})
    .pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorHandl));
}
  signIn(userDetails: User) {

    return this.apiService.post('/users/login' , {user : userDetails})
    .pipe(
      map((res: Response) => {
        this.loggedIn.next(true);
         this.jwtService.saveToken(res);
        return res || {}
      }),
      catchError(this.errorHandl));
   }
  // Error handling
  errorHandl(error:any) {
    return throwError(error);
  }
  get isLoggedIn() {
    if(localStorage.getItem('access_token')){
      this.loggedIn.next(true);
    }
    return this.loggedIn.asObservable(); 
  }
  setLogout(){
    let removeToken = localStorage.removeItem('access_token');
    this.loggedIn.next(false);
  }

  logout() {
    let removeToken = this.setLogout();
    if (removeToken == null) {
      this.router.navigate(['signin']);
    }
  }
}
