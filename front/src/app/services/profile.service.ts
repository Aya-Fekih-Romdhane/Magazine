import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  
  url='http://127.0.0.1:3000/profile/';

  constructor( private http : HttpClient ) { }

   changePassword (data:any)
   {
    return this.http.post(this.url+'change-password',data);
   }

   getUser(){
    return this.http.get(this.url+'current-user');
   }

   update (data :any) {
    return this.http.put(this.url+'update-profile', data);
   }
}
