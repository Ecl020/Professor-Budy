import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageComponent } from './page/page.component';
import { Page2Component } from './page2/page2.component';
import { ScholarshipLearningComponent } from './scholarship-learning/scholarship-learning.component';
import { TaxesLearningComponent } from './taxes-learning/taxes-learning.component';
import { LoansLearningComponent } from './loans-learning/loans-learning.component';
import { CreditLearningComponent } from './credit-learning/credit-learning.component';
import { ScamsLearningComponent } from './scams-learning/scams-learning.component';
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
  {path:'page2', component:Page2Component},
  {path:'scolar-learning', component:ScholarshipLearningComponent},
  {path:'taxes-learning', component:TaxesLearningComponent},
  {path:'loans-learning', component:LoansLearningComponent},
  {path:'credit-learning', component:CreditLearningComponent},
  {path:'scams-learning', component:ScamsLearningComponent},
  { path: '', redirectTo: '/welcome', pathMatch: 'full' }, // Default to intro
  { path: '**', redirectTo: '/welcome' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
