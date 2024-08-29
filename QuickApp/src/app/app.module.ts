import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageComponent } from './page/page.component';
import { Page2Component } from './page2/page2.component';
import { FormsModule } from '@angular/forms';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import { ScholarshipLearningComponent } from './scholarship-learning/scholarship-learning.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    PageComponent,
    Page2Component,
    ChatBotComponent,
    ScholarshipLearningComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    provideClientHydration()

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
