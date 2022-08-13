import { Injectable } from '@angular/core';
import { HttpClient } from '@microsoft/signalr';
import { IPost } from '../interfaces';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends BaseService {
  constructor(private base: BaseService) {
    super(base.http);
  }

  public getComments() {
    return this.base.getReq('/comments');
  }

  // public getCommentWithId(id: number) {
  //   return this.base.getReq(`/comments`);
  // }
}
