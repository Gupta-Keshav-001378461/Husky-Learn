import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ApiService } from '../../sharedservices/http-request-custom';
import { map, catchError } from 'rxjs/operators';
import { Profile } from 'src/app/model/Profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private apiService: ApiService) { }
  // Service to save user profile
  save(userDetails): Observable<any> {
    return this.apiService.post('/users', { user: userDetails })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }

  getUser(): Observable<any> {
    return this.apiService.get('/user')
      .pipe(
        map((res: Response) => {
          return res || {}
        }),

        catchError(this.errorHandl));
  }

  // Service to update details of a user
  updateUser(user, userDetails): Observable<any> {
    return this.apiService.put('/user', { user: userDetails })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }

  // Service to get user profile
  getProfiles(username): Observable<any> {
    return this.apiService.get('/profiles/' + username)
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));

  }

  //  Service to follow a particular user
  followUser(username): Observable<any> {
    return this.apiService.post('/profiles/' + username + '/follow')
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }

  // Unfollow a particular user
  unfollowUser(username): Observable<any> {
    return this.apiService.delete('/profiles/' + username + '/follow')
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }

  errorHandl(error: any) {
    return throwError(error);
  }

}

