import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, doc, getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private firestore = getFirestore(); // Firestore instance
  hasProfile = false; // To track if the user has a profile
  userProfile: any; // To store the user profile information
  isLoggedIn = false; // To track if the user is logged in
  currentUser: User | null = null; // To store the current user's data
  title: string = 'QuickApp'; // Declare and initialize the title property
  isIntroPage: boolean = false;
  

  constructor(private router: Router) {
    // Check the current route and update `isIntroPage`
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isIntroPage = this.router.url === '/welcome';
      }
    });
  }

  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.isLoggedIn = true;
        this.currentUser = user;
        
        // Check if the user has a profile
        if (this.currentUser) {
          this.getUserProfile(this.currentUser.uid);
        }
      } else {
        this.isLoggedIn = false;
        this.currentUser = null;
        this.hasProfile = false; // Reset profile status when logged out
        console.log('User is signed out');
      }
    });
  }

  // Method to check if the user is logged in
  loggedIn(): boolean {
    return this.isLoggedIn;
  }

  // Fetch user profile data
  async getUserProfile(uid: string) {
    try {
      const docRef = doc(this.firestore, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.userProfile = docSnap.data();
        this.hasProfile = true; // Profile exists
        console.log('User profile:', this.userProfile);
      } else {
        this.userProfile = null;
        this.hasProfile = false; // No profile found
        console.log('No such document!');
      }
    } catch (e) {
      console.error('Error fetching document:', e);
      this.hasProfile = false; // Ensure profile status is reset on error
    }
  }
}
