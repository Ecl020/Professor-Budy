import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/home']);
  }
  isPopupVisible = false;

  showPopup() {
    console.log("Popup should be visible now");
    this.isPopupVisible = true;
  }
  
  hidePopup() {
    console.log("Popup should be hidden now");
    this.isPopupVisible = false;
  }
  
}
