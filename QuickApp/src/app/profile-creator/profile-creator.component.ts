import { Component, Input, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, collection, addDoc, setDoc, doc } from 'firebase/firestore';

@Component({
  selector: 'app-profile-creator',
  templateUrl: './profile-creator.component.html',
  styleUrl: './profile-creator.component.css'
})
export class ProfileCreatorComponent implements OnInit{
  @Input() show?: boolean;
  private firestore = getFirestore(); // No need to initialize again
  private auth = getAuth(); // No need to initialize again
  isProfileCreatorVisible = false; // Flag to control visibility

  isLoggedIn = false; // To track if the user is logged in
  currentUser: User | null = null; // To store the current user's data
  
  constructor(){

  }
  
  ngOnInit(): void {
    // Example of using Firebase Auth to check user state
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
        this.currentUser = user;
        setTimeout(() => {
          this.isProfileCreatorVisible = true; // Delay before making the page visible
        }, 1000); // Delay in milliseconds
      } else {
        this.isLoggedIn = false;
        this.currentUser = null;
      }
    });
  }
  async onContinue(nameInput: HTMLInputElement, descriptionInput: HTMLTextAreaElement) {
    if (!this.currentUser) {
      console.error('User is not logged in');
      return;
    }

    const name = nameInput.value;
    const description = descriptionInput.value;
    const userId = this.currentUser.uid; // Get the current user's UID

    try {
      // Create a document reference with the user's UID
      const docRef = doc(this.firestore, 'users', userId);

      // Set document data
      await setDoc(docRef, {
        name: name,
        description: description,
        createdAt: new Date(),
      }, { merge: true }); // Merge to avoid overwriting existing data

      console.log('Document written with ID: ', userId);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
}
