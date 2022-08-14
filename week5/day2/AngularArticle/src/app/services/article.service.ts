import { Injectable } from '@angular/core';
import { IArticle } from '../interfaces';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends BaseService {

  constructor(private base: BaseService) {
    super(base.http);
   }

  public postArticle(article: IArticle) {
    return this.base.postReq('/articles', article);
  }
  
  public getArticles() {
    return this.base.getReq('/articles');
  }

  public updateArticle(id: string, article: IArticle) {
    return this.base.putReq(`/articles/${id}`, article);
  }
}
