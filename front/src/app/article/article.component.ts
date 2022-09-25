// import { Category } from './../models/Category';
import { CategoryService } from './../services/category.service';
// import { Article } from './../models/Article';
import { ArticleService } from './../services/article.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css', '../../assets/css/bootstrap.min.css'],
})
export class ArticleComponent implements OnInit {
  permaLink: Number;
  article: any;
  // categorys: Category[] = [];
  comments: Comment[] = [];

  constructor(
    private router: ActivatedRoute,
    private as: ArticleService,
    private cs: CategoryService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.permaLink = params['_id'];
    });

    // this.as.getArticleById(this.permaLink).subscribe((res) => {
    //   this.article = res;
    //   console.log(res);
    // });

    // this.cs.getAllCategorysFromDB().subscribe((res) => {
    //   // this.categorys = res;
    // });
  }
}
