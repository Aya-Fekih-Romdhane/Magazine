import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url ='http://127.0.0.1:3000/api/';



  constructor( private http : HttpClient , private router : Router) { }
   
  
  register (user : any){

   return this.http.post(this.url+'register',user);

    }

  login(user : any){
    return this.http.post(this.url+'login',user);
  }
  isLoggedIn(){
    let token = localStorage.getItem('token');

    if (token){
      return true ;
    }else{
      return false;
    }
    // return this.http.post(this.url,localStorage.getItem('token'));
  }
  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  getDataFromToken(){
    let token = localStorage.getItem('token');

     if (token){
       let data = JSON.parse(window.atob(token.split('.')[1]));
       return data;
    }    
  }
  GetToken(){
    return localStorage.getItem('token') || '';
  }
 HaveAccess(){
  var loginToken = localStorage.getItem('token') || ''
 }
  
}
