import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  post?: IPost;
  postForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    body: new FormControl(null, [Validators.required]),
  });

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // access id param from route
    this.id = this.route.snapshot.paramMap.get('id')!;

    // get post data for given id
    this.blogService.getPostById(Number(this.id)).subscribe((post: IPost) => {
      this.post = post;

      // set values in form
      this.postForm.setValue({
        title: post.title,
        body: post.body,
      });
    });
  }

  onSubmit() {
    const updatedPost: IPost = {
      title: this.postForm.get('title')?.value,
      body: this.postForm.get('body')?.value,
      imageId: this.post!.imageId,
      userId: this.post!.userId,
      id: this.post!.id,
    };

    this.blogService.updatePost(updatedPost.id, updatedPost).subscribe(
      () => {
        if (confirm('Post updated, redirecting in 3 sec')) {
          // Redirect
          setTimeout(() => {
            this.router.navigateByUrl('home');
            // alternative
            // this.router.navigate(['/']);
            console.log('Thing was saved to the database.');
          }, 3000);
        } else {
          // Do nothing!
        }
      },
      (error) => console.log(error)
    );
  }
}
