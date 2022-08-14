import { Component, OnInit } from '@angular/core';
import { IArticle } from '../interfaces';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  articles: IArticle[] = [];
  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    // get articles from service
    this.articleService.getArticles().subscribe((response) => {
      this.articles = response;
    });
  }
}
