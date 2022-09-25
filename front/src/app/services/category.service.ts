// import { Category } from './../models/Category';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categoryURL: string = 'http://localhost:3000/categorie/';

  constructor(private _http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // getAllCategorysFromDB(): Observable<Category[]> {
  //   return this._http.get<Category[]>(this.categoryURL);
  // }
}
