import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IComment, IPost } from 'src/app/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';
import { CommentService } from 'src/app/services/comment.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface IDialogData {
  post: IPost;
  willUpdate: boolean;
}

@Component({
  selector: 'app-blogdialog',
  templateUrl: './blogdialog.component.html',
  styleUrls: ['./blogdialog.component.css'],
})
export class BlogDialogComponent implements OnInit {
  willUpdate: boolean = false;
  postForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    body: new FormControl(null, [Validators.required]),
  });
  postElement?: IPost;
  comments?: any[];

  constructor(
    private blogService: BlogService,
    private commentService: CommentService,
    public dialogRef: MatDialogRef<BlogDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
    private snackBar: MatSnackBar,
  ) {
    // update / edit post
    if (data.willUpdate) {
      this.willUpdate = data.willUpdate;
      this.postForm.setValue({
        title: data.post.title,
        body: data.post.body,
      });

      // alternative way for updating UI for updated post [1]
      // this.postElement = data.post;
    }

    // show post
    else {
      this.postElement = data.post;
    }
  }

  ngOnInit(): void {
    // close dialog box when "Esc" button is pressed
    window.addEventListener(
      'keyup',
      (event: KeyboardEvent) => event.key === 'Esc' && this.dialogRef.close()
    );

    this.commentService.getComments().subscribe((data: []) => {
      this.comments = data.filter(
        (comment: IComment) => comment?.postId === this.postElement?.id
      );
    });
  }

  // close dialog
  closeDialog(): void {
    this.dialogRef.close(true);
  }

  onSubmit() {
    const updatedPost: IPost = {
      title: this.postForm.get('title')?.value,
      body: this.postForm.get('body')?.value,
      imageId: this.data.post.imageId,
      userId: this.data.post.userId,
      id: this.data.post.id,
    };

    this.blogService.updatePost(updatedPost.id, updatedPost).subscribe(
      (data: IPost) => {
        // close dialog
        this.dialogRef.close(data);
        
        // alternative way for updating UI for updated post [2]
        // this.postElement.title = data.title;
        // this.postElement.body = data.body;

        // show notification
        this.snackBar.open('Post updated', undefined, {
          duration: 2000,
          verticalPosition: 'top',
        });
      },
      (error) => {
        console.error("couldn't retrive data from API")
        // show notification
        this.snackBar.open('Post could not updated', undefined, {
          duration: 2000,
          verticalPosition: 'top',
        });
      }
    );
  }
}
