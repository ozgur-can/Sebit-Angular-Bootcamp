import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComment, IPost } from 'src/app/interfaces';
import { BlogService } from 'src/app/services/blog.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css'],
})
export class BlogViewComponent implements OnInit {
  id: string = '';
  post?: IPost;
  comments: IComment[] = [];
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    // access id param from route
    this.id = this.route.snapshot.paramMap.get('id')!;

    // get post data for given id
    this.blogService.getPostById(parseInt(this.id)).subscribe(
      (data: IPost) => {
        this.post = data;
        // get specific comments
        this.commentService.getComments().subscribe((data: []) => {
          this.comments = data.filter(
            (it: IComment) => it?.postId === this.post?.id
          );
        });
      },
      (error) => console.log(error)
    );
  }

  onSubmit() {}
}
