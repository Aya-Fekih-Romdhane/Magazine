import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  user ={
    FirstName:'',
    LastName:'',
    phone:'',
    adress:'',
    email:'',
    password:''
  }
   



  hide = true;
  hidee = true;
  FirstName!: string;
  LastName!: string;
  email!: string;
  phone!: string;
  adress!: string;
  password!: string;

  registerForm = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      adress: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      passwordConfirm: new FormControl(null, [Validators.required]),
    },
    // add custom Validators to the form, to make sure that password and passwordConfirm are equal
    { validators: CustomValidators.passwordsMatching }
  );

  constructor(private http: HttpClient , private auth : AuthService, private router : Router ) {}
  register() {
    if (!this.registerForm.valid) {
      return;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    let credentials = {
      FirstName: this.FirstName,
      LastName: this.LastName,
      email: this.email,
      phone: this.phone,
      adress: this.adress,
      password: this.password,
    };

    this.auth.register(this.user)
    .subscribe(
      res=>{
        Swal.fire(
          'Good job!',
          'Your account has been created !',
          'success'
        )

        this.router.navigate(['/login']);
        
      },err=>{
        console.log(err);
        
      }
    )

  

  }

  ngOnInit(): void {}
}
export class CustomValidators {
  static passwordsMatching(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordConfirm')?.value;

    // Check if passwords are matching. If not then add the error 'passwordsNotMatching: true' to the form
    if (
      password === passwordConfirm &&
      password !== null &&
      passwordConfirm !== null
    ) {
      return null;
    } else {
      return { passwordsNotMatching: true };
    }
  }
}
