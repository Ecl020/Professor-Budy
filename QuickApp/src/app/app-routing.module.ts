import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageComponent } from './page/page.component';
import { Page2Component } from './page2/page2.component';
import { ScholarshipComponent } from './Pages/Scholarship-Page/scholarship/scholarship.component';

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'home',component: PageComponent},
  {path:'page2', component:Page2Component},
  {path: 'scholarship', component:ScholarshipComponent},
  {path: '', redirectTo: '/welcome', pathMatch: 'full' }, // Default to intro
  {path: '**', redirectTo: '/welcome' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
