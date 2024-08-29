import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageComponent } from './page/page.component';
import { Page2Component } from './page2/page2.component';
import { ScholarshipLearningComponent } from './scholarship-learning/scholarship-learning.component';

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'home',component: PageComponent},
  {path:'page2', component:Page2Component},
  {path:'scolar-learning', component:ScholarshipLearningComponent},
  { path: '', redirectTo: '/welcome', pathMatch: 'full' }, // Default to intro
  { path: '**', redirectTo: '/welcome' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
