import { Injectable } from '@angular/core';
import { HttpClient } from '@microsoft/signalr';
import { IPost } from '../interfaces';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService extends BaseService {
  constructor(private base: BaseService) {
    super(base.http);
  }

  public getPosts() {
    return this.base.getReq('/posts');
  }

  public getPostById(id: number) {
    return this.base.getReq(`/posts/${id}`);
  }

  public updatePost(id: number, data: IPost) {
    return this.base.putReq(`/posts/${id}`, data);
  }
}
