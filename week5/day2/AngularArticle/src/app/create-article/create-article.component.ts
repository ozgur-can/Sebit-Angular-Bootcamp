import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { IArticle } from '../interfaces';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css'],
})
export class CreateArticleComponent implements OnInit {
  // angular editor settings
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };

  content: string = '';
  username: string = '';
  title: string = '';
  article?: IArticle;

  constructor(
    private snackBar: MatSnackBar,
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  post() {
    if (this.username === '' || this.title === '' || this.content === '') {
      // notification
      this.snackBar.open('Lütfen tüm alanları doldurunuz', 'Kapat');
    } else {
      // article object
      this.article = {
        author: this.username,
        comments: [],
        content: this.content,
        title: this.title,
      };

      // send article object to API
      this.articleService.postArticle(this.article).subscribe(() => {
        this.snackBar.open('article sent to API', 'Tamam', { duration: 2000 });
        // navigate
        this.router.navigateByUrl('home');
      });
    }
  }
}
