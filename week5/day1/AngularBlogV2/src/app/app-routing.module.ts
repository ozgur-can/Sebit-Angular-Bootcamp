import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogUpdateComponent } from './home/blog-update/blog-update.component';
import { BlogViewComponent } from './home/blog-view/blog-view.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'view-blog/:id', component: BlogViewComponent
  },
  {
    path: 'update-blog/:id', component: BlogUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
