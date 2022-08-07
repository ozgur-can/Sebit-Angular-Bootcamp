import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPost } from 'src/app/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';

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

  constructor(
    private blogService: BlogService,
    public dialogRef: MatDialogRef<BlogDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) {
    if (data.willUpdate) {
      this.willUpdate = data.willUpdate;
      this.postForm.setValue({
        title: data.post.title,
        body: data.post.body
      });
    }
  }

  ngOnInit(): void {
    window.addEventListener("keyup", (event) => event.key === "Esc" && this.dialogRef.close());
  }

  closeDialog(): void {
    this.dialogRef.close(true);
  }

  onSubmit() {
    const updatedPost: IPost = {
      title: this.postForm.get('title')?.value,
      body: this.postForm.get('body')?.value,
      imageId: this.data.post.imageId,
      userId: this.data.post.userId,
      id: this.data.post.id
    }

    this.blogService
    .updatePost(updatedPost.id, updatedPost)
    .subscribe(
      (data) => this.dialogRef.close(data),
      (error) => console.log("couldn't retrive data from API")
    );
  }
}
