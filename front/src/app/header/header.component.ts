// import { Category } from './../models/Category';
import { CategoryService } from './../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../assets/css/bootstrap.min.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private cs: CategoryService) {}

  // categorys: Category[] = [];
  token: string;

  ngOnInit(): void {
    // this.cs.getAllCategorysFromDB().subscribe((res) => {
    //   this.categorys = res;
    // });
    // this.token = this.readLocalStorageValue('token');
  }

  readLocalStorageValue() {
  if(localStorage.getItem('token')){
    return true;
  }else{
    return false;
  }
  }
}
