import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user : any;
  image :any;

  selectImage(e : any){
    this.image= e.target.files[0];
    if(e.target.files){
      var reader=new FileReader()
      reader.readAsDataURL(e.target.files[0])
       reader.onload=(event:any)=>{
         this.url=event.target.result
   }
    }
  }

  constructor(private profile : ProfileService , private auth : AuthService, private router : Router) { }
  modifier(){
    let fd = new FormData()
    fd.append('FirstName',this.user.data.FirstName);
    fd.append('LastName',this.user.data.LastName);
    fd.append('email',this.user.data.email);
    fd.append('adress',this.user.data.adress);
    fd.append('phone',this.user.data.phone);
    fd.append('profession',this.user.data.profession);
    if (this.image){
      fd.append('profile_image',this.image);
    }else{
      fd.append('profile_image',this.user.data.profile_image);
    }

    this.profile.update(fd)
    .subscribe(
      res=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your change has been saved :D',
          showConfirmButton: false,
          timer: 1500
        })
         this.router.navigate(['/profile']);
      },
      err=>{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ouups upload image plz ! ',
          showConfirmButton: false,
          timer: 1500
        })    
      }
    )
  }

  ngOnInit(): void {

     //get current user
   this.profile.getUser()
   .subscribe(
     res=>{
       this.user=res;
       console.log(this.user);
       
     },
     err=>{
       console.log(err);
     }

   )
  
  }
  
  logOut(){
    this.auth.logOut();
  }
  // url = "http://127.0.0.1:3000/getimage/"

  url = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

}
