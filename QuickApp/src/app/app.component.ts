import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isIntroPage: boolean = false;

  constructor(private router: Router) {
    // Check the current route and update `isIntroPage`
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isIntroPage = this.router.url === '/welcome';
      }
    });
  }
}
