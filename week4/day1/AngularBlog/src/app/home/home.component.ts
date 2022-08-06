import { Component, OnInit } from '@angular/core';
import { IPost } from '../interfaces';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [BlogService]
})
export class HomeComponent implements OnInit {
  posts: IPost[] = [];

  constructor(
    private blogService: BlogService
    ) { }

  ngOnInit(): void {
    this.blogService
    .getPosts()
    .subscribe((data) => this.posts = data);
  }

}
