import { Component, OnInit } from '@angular/core';
import { IPost } from '../interfaces';
import { BlogService } from '../services/blog.service';
import { MatDialog } from '@angular/material/dialog';
import { BlogDialogComponent } from './blog-dialog/blog-dialog.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [BlogService],
})
export class HomeComponent implements OnInit {
  posts: IPost[] = [];
  page: number = 1;
  pageSize: number = 8;

  constructor(private blogService: BlogService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getPostList();
  }

  // get posts
  getPostList() {
    this.blogService
      .getPosts()
      .subscribe((data: IPost[]) => (this.posts = data));
  }

  // show dialog
  openDialog(post: IPost, willUpdate: boolean) {
    const dialogRef = this.dialog.open(BlogDialogComponent, {
      data: { post, willUpdate },
    });

    // update UI (title & body values) after we send post request to API
    dialogRef.afterClosed().subscribe((updatedPost: IPost) => {
      if (updatedPost) {
        post.title = updatedPost.title;
        post.body = updatedPost.body;
      }
    });
  }
}
