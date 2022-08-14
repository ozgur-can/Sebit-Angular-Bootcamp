import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticle, IComment } from '../interfaces';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css'],
})
export class ViewArticleComponent implements OnInit {
  article?: IArticle;
  articleIndex: string = '';
  comment?: IComment = { author: '', body: '' };
  existingComments?: IComment[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.articleIndex = this.route.snapshot.paramMap.get('articleIndex')!;

    // get all articles
    this.articleService.getArticles().subscribe((response: IArticle[]) => {
      // get article by index
      this.article = response[parseInt(this.articleIndex)];
      // get comments in article object
      this.existingComments = this.article!.comments;
    });
  }

  submitComment() {
    // if comment value is empty
    if (this.comment!.author === '' || this.comment!.body === '') {
      this.snackBar.open('Please type username and comment', 'Kapat', {
        duration: 2000,
      });
    } else {
      // update comment array in current article
      this.article!.comments.push(this.comment!);
      // push new comment to article with service
      this.articleService
        .updateArticle(this.articleIndex, this.article!)
        .subscribe(() => {
          // notification
          this.snackBar.open('Comment submitted, redirecting', 'Kapat', {
            duration: 2000,
          });
          // clear comment object
          this.comment!.author = '';
          this.comment!.body = '';
          this.comment = undefined;
          // navigate to home
          this.router.navigateByUrl('/home');
        });
    }
  }
}
