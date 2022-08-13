import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IPost } from 'src/app/interfaces';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-update',
  templateUrl: './blog-update.component.html',
  styleUrls: ['./blog-update.component.css'],
})
export class BlogUpdateComponent implements OnInit {
  id: string = '';
  post?: IPost = undefined;
  postForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    body: new FormControl(null, [Validators.required]),
  });

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // access id param from route
    this.id = this.route.snapshot.paramMap.get('id')!;

    // get post data for given id
    this.blogService.getPostById(this.id).subscribe((post: IPost) => {
      // selected post
      this.post = post;

      // set new values in form
      this.postForm.setValue({
        title: post.title,
        body: post.body,
      });
    });
  }

  onSubmit() {
    // updated post
    const updatedPost: IPost = {
      title: this.postForm.get('title')?.value,
      body: this.postForm.get('body')?.value,
      imageId: this.post!.imageId,
      userId: this.post!.userId,
      id: this.post!.id,
    };

    // update selected post with new values, redirect if it is updated
    this.blogService
      .updatePost(updatedPost.id.toString(), updatedPost)
      .subscribe(
        () => {
          console.info('Updated post sent to API.');
          // show notification
          this.snackBar.open('Post updated, redirecting..', undefined, {
            duration: 3000,
            verticalPosition: 'top',
          });

          // Redirect to /home
          setTimeout(() => {
            this.router.navigateByUrl('home');
            // alternative way
            // this.router.navigate(['/']);
          }, 2000);
        },
        (error) => {
          // show notification
          this.snackBar.open('there is a problem related to API', undefined, {
            duration: 3000,
            verticalPosition: 'top',
          });
          console.error(error);
        }
      );
  }
}
