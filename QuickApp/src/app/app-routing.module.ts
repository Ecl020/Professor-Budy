import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageComponent } from './searchScholarships/page.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostfeedComponent } from './postfeed/postfeed.component';

const routes: Routes = [
  {path: 'emailverification', component: EmailVerifiedComponent},
  {path: 'postfeed', component: PostfeedComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'create-post', component: CreatePostComponent},
  {path: 'Auth', component: AuthComponent},
  {path: 'home', component: HomeComponent},
  {path: 'Find-Scholarships',component: PageComponent},
  
  { path: '', redirectTo: '/welcome', pathMatch: 'full' }, // Default to intro
  { path: '**', redirectTo: '/welcome' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
