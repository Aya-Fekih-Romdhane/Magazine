import { AuthGuard } from './services/auth.guard';
import { ProfileSecurityComponent } from './profile-security/profile-security.component';
import { ProfileComponent } from './profile/profile.component';
import { ArticleComponent } from './article/article.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { DefaultComponent } from './layouts/default/default.component';
// import { DashboardComponent } from './modules/dashboard/dashboard.component';
// import { PostsComponent } from './modules/posts/posts.component';
// import { BlogComponent } from './modules/blog/blog.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent },
  { path: 'article/:_id', component: ArticleComponent },
  { path: 'profile',canActivate : [AuthGuard], component: ProfileComponent },
  { path: 'profile/security',canActivate : [AuthGuard], component: ProfileSecurityComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
