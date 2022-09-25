import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';
@Component({
  selector: 'app-profile-security',
  templateUrl: './profile-security.component.html',
  styleUrls: ['./profile-security.component.css']
})
export class ProfileSecurityComponent implements OnInit {

  changePasswordForm: any = FormGroup;
  responseMessage: any;
  user: any;
  new: any;

  constructor(private formBuilder: FormBuilder,
  
    private profile: ProfileService,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    // this.changePasswordForm = this.formBuilder.group({
    //   old_password: [null, [Validators.required]],
    //   new_password: [null, [Validators.required]],
    //   confirm_password: [null, [Validators.required]],
    // })
  }

  validateSubmit() {
    // if (this.changePasswordForm.controls['new_password'].value != this.changePasswordForm.controls['confirm_password'].value) {
    //   return true;
    // } else {
    //   return false;
    // }
  }
  handleChangePassword() {
    // var formData = this.changePasswordForm.value;
    // var data = {
    //   old_password: formData.old_password,
    //   new_password: formData.new_password,
    //   confirm_password: formData.confirm_password
    // }
    // this.profile.changePassword(data)
    //   .subscribe((response: any) => {
    //     console.log(response);
        
    //   },(err)=>{
    //     console.log(err);
       
      
    //   }
    //   )

  }

}

