import { Component, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, User } from "firebase/auth";
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isEmailVerified = false;
  isLoggedIn = false; // To track if the user is logged in
  currentUser: User | null = null; // To store the current user's data
  constructor(private router:Router){

  }
  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        this.isLoggedIn = true;
        this.currentUser = user;
        this.isEmailVerified = user.emailVerified;

        if (this.isEmailVerified) {
          console.log('User is signed in and email is verified:', user);
        } else {
          this.router.navigate(["emailverification"])
        }
      } else {
        // User is signed out
        this.isLoggedIn = false;
        this.currentUser = null;
        this.isEmailVerified = false;
        console.log('User is signed out');
      }
    });
  }

  // Method to check if the user is logged in
  loggedIn(): boolean {
    return this.isLoggedIn;
  }
  onLogout(){
    const auth = getAuth();
    auth.signOut();
    console.log('User signed out!');
  }
  emailVerified(): boolean {
    return this.isEmailVerified;
  }
}
