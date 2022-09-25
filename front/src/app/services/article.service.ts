import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Article } from '../models/Article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articleURL: string = 'http://localhost:3000/article/';

  constructor(private _http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // getAllArticlesFromDB(): Observable<Article[]> {
  //   return this._http.get<Article[]>(this.articleURL);
  // }

  // addArticle(article: Article): Observable<Article> {
  //   return this._http.post<Article>(this.articleURL, article, this.httpOptions);
  // }
  // getArticleByCatego(str: string): Observable<Article[]> {
  //   return this._http.get<Article[]>(this.articleURL + 'bycategory/' + str);
  // }

  // getArticleById(permaLink: Number): Observable<Article[]> {
  //   return this._http.get<Article[]>(this.articleURL + permaLink);
  // }
}
