import { Injectable } from '@angular/core';
// import { environment } from '../../../environments/environment';
// import { Headers, Http, Response, URLSearchParams } from '@angular/http';
// import { Observable } from 'rxjs/Rx';

import { apiconfig } from '../config/apiconfig';
import { JwtService } from "./jwtToken";
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    private jwtService :JwtService
  ) {}

  private setHeaders() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }
    if(this.jwtService.getToken()){
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Token ${this.jwtService.getToken()}`
        })
      }
    }
    return httpOptions;
  }
  endpoint:string = apiconfig.base_url;
  private formatErrors(error: any) {
     return Observable.throw(error.json());
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${this.endpoint}${path}`, JSON.stringify(body), this.setHeaders())
    .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }

  get(path: string): Observable<any> {
    return this.http.get(`${this.endpoint}${path}`, this.setHeaders())
    .pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorHandl)
    )
 }
//this api needs testing
 put(path: string, body: Object = {}): Observable<any> {
  return this.http.put(`${this.endpoint}${path}`, JSON.stringify(body), this.setHeaders())
  .pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorHandl));
}
//this api needs testing
delete(path: string): Observable<any> {
  return this.http.delete(`${this.endpoint}${path}`, this.setHeaders())
  .pipe(
    map((res: Response) => {
      return res || {}
    }),
    catchError(this.errorHandl)
  )
}
  errorHandl(error:any) {
    return throwError(error.error);
  }
}
