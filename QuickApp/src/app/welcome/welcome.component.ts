import { Component, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

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
      }
    }
  }
  

  navigateToHome() {
    this.router.navigate(['/home']);
  }
  
  navigateToScholarships(){
    this.router.navigate(['scholarship'])
  }
}
