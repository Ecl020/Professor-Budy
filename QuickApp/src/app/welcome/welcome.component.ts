import { Component, OnInit, Renderer2, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { GeminiService } from '../gemini.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  prompt: string = '';
  response:string = '';
  premadResponse:string = '';
  geminiService:GeminiService = inject(GeminiService);
  loading:boolean = false;

  constructor(private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: Object,private router: Router) {}

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      // Execute only in the browser
      const modalElement = document.getElementById('initialTerrence');
      if (modalElement) {
        const bootstrapModal = new (window as any).bootstrap.Modal(modalElement, {
          keyboard: false // Optional: disable closing with the keyboard
        });
        bootstrapModal.show();
        this.sendPremmadeData('Introduce your self,tell the user they can explore and that this application is meant to be a hub to help individuals learn about scholarships, finicial literary , and prepare as best as we can.In 50 words or less');
      }
    }
  }

  async sendPremmadeData(premadePrompt?: string) {
    const promptToSend = premadePrompt || this.prompt;
    if (promptToSend) {
      this.loading = true;
      this.premadResponse = '';
      this.premadResponse = await this.geminiService.generatePreMadeText(promptToSend);
      this.loading = false;
    }
  }
  

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
