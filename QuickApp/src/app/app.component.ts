import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, User } from "firebase/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  isLoggedIn = false; // To track if the user is logged in
  currentUser: User | null = null; // To store the current user's data
  title: string = 'QuickApp'; // Declare and initialize the title property
  isIntroPage: boolean = false;
  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        this.isLoggedIn = true;
        this.currentUser = user;

      } else {
        // User is signed out
        this.isLoggedIn = false;
        this.currentUser = null;
        console.log('User is signed out');
      }
    });
  }
  constructor(private router: Router) {
    
    // Check the current route and update `isIntroPage`
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isIntroPage = this.router.url === '/welcome';
      }
    });
  }

  loggedIn(): boolean {
    return this.isLoggedIn;
  }
}
