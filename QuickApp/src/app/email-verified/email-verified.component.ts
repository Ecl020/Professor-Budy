import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification } from "firebase/auth";

@Component({
  selector: 'app-email-verified',
  templateUrl: './email-verified.component.html',
  styleUrl: './email-verified.component.css'
})
export class EmailVerifiedComponent implements OnInit {
  emailSent: boolean = false; // Track if the email was successfully sent
  errorMessage: string | null = null; // Track error messages
  constructor(private router:Router){

  }
  ngOnInit(): void {
    const auth = getAuth();
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      this.sendVerificationEmail(auth.currentUser);
    } else {
      this.router.navigate(["Auth"]);
    }
  }

  // Method to send the verification email
  sendVerificationEmail(user: any) {
    sendEmailVerification(user)
      .then(() => {
        console.log('Verification email sent.');
        this.emailSent = true;
      })
      .catch((error) => {
        console.error('Error sending verification email:', error);
        this.errorMessage = 'Failed to send verification email. Please try again.';
      });
  }

  // Method triggered when the "Resend Verification Email" button is clicked
  onResend(): void {
    const auth = getAuth();
    if (auth.currentUser) {
      this.sendVerificationEmail(auth.currentUser);
    }
  }
}
