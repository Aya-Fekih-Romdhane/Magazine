import { ArticleService } from './../services/article.service';
// import { Article } from './../models/Article';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../assets/css/bootstrap.min.css'],
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient, private as: ArticleService) {}

  // articles: Article[] = [];
 // articles_alaune: Article[] = [];

  ngOnInit(): void {
    // this.as.getAllArticlesFromDB().subscribe((res) => {
    //   // this.articles = res;
    //   console.log(res);
    // });
  }
}
