import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlogUpdateComponent } from '../blog-update/blog-update.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  constructor(public snackBar: MatSnackBar) {}
  ngOnInit(): void {}

  openSnackBar() {
    this.snackBar.openFromComponent(BlogUpdateComponent, {
      duration: 500,
    });
  }
}
