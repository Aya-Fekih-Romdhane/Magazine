import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  user ={
    email:'',
    password:''
  }

  hide = true;
  
  email!: string;
  password!: string;

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(private http: HttpClient , private auth : AuthService, private router : Router) {}

  ngOnInit(): void {}
  token:any;
  login() {

    let credentials = {
      email: this.email,
      password: this.password,
    };

    this.auth.login(this.user)
    .subscribe(
      res=>{
         this.token = res;
         localStorage.setItem('token' , this.token.myToken)
          console.log(res); 
          this.router.navigate([''])
      },
      err=>{
       console.log(err);
       Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Votre email ou mot de passe est incorrect !',
        showConfirmButton: false,
        timer: 1500
      }) 
      }
    )
  }
     
  
  }

