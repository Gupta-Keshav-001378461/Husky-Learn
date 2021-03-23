import { Injectable } from '@angular/core';

import { ApiService } from '../../sharedservices/http-request-custom';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private apiService: ApiService) {

  }
  // Save article service
  save(articleDetails): Observable<any> {
    return this.apiService.post('/articles', { article: articleDetails })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }
  // update article service
  update(slug, articleDetails): Observable<any> {
    return this.apiService.put('/articles/' + slug, { article: articleDetails })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }
  // Service to get all articles
  getAllArticles(): Observable<any> {
    return this.apiService.get('/articles')
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }
  // Service tofavorite an article
  favoriteArticle(slug): Observable<any> {
    return this.apiService.post('/articles/' + slug + '/favorite')
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }

  // Srvice to unfavorite an article
  unfavoriteArticle(slug): Observable<any> {
    return this.apiService.delete('/articles/' + slug + '/favorite')
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }

  // Service to post comment on an article
  postComment(slug, comment): Observable<any> {
    return this.apiService.post('/articles/' + slug + '/comments', { comment: { body: comment } })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }

  // Service for getting all articles of particular username
  getAllArticlesByUsername(username): Observable<any> {
    return this.apiService.get('/articles?author=' + username)
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }

  // Service to get all favorited articles
  getAllFavoriteArticles(username): Observable<any> {
    return this.apiService.get('/articles?favorited=' + username)
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }

  // Service to get all comments on an article
  getAllComments(slug): Observable<any> {
    return this.apiService.get('/articles/' + slug + '/comments')
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }

  // Service to delete an article
  deleteArticle(slug): Observable<any> {
    return this.apiService.delete('/articles/' + slug)
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }

  //  Service to delete a comment on article
  deleteComment(slug, commentID): Observable<any> {
    return this.apiService.delete('/articles/' + slug + '/comments/' + commentID)
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }
  //getTagList
 getTagList():Observable<any>{
  return this.apiService.get('/tags')
  .pipe(
  map((res: Response) => {
  return res || {}
  }),
  catchError(this.errorHandl));
  }
  //getby tag all articles
 getByTag(tagname):Observable<any>{
  return this.apiService.get('/articles?tag=' + tagname)
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
