import { Component, Input, OnInit } from '@angular/core';
import { CommentData, PostData } from '../models/post.model';

import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, collection, addDoc, setDoc, doc, getDoc } from 'firebase/firestore';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit{
  private firestore = getFirestore(); // No need to initialize again
  private auth = getAuth(); // No need to initialize again
  currentUser: User | null = null; // To store the current user's data
  isLoggedIn = false; // To track if the user is logged in
  selectedImageFile: File | null = null; // Initialize the variable
  comments: CommentData[] = []; // To store fetched comments
  showComments = false; // Toggle variable
  @Input()
  postData!: PostData;

  ngOnInit(): void {
    // Example of using Firebase Auth to check user state
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
        this.currentUser = user;
      } else {
        this.isLoggedIn = false;
        this.currentUser = null;
      }
    });
    this.loadComments();
    console.log('Post Data:', this.postData);
    console.log('Comments Array:', this.postData?.comments);
  }

  constructor(private http: HttpClient){}

  onAddComment(): void {
    const commentText = prompt('Enter your comment:');
    if (commentText) {
      this.saveComment(this.postData.id, commentText, null);
    }
  }

  async saveComment(postId: string, comment: string, imageUrl: string | null) {
    if (!this.currentUser) {
      console.error('User is not logged in');
      return;
    }
  
    const userId = this.currentUser.uid;
  
    try {
      // Fetch the user's profile information
      const userDocRef = doc(this.firestore, 'users', userId);
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        const userProfile = userDoc.data();
  
        // Prepare comment data with a unique ID
        const commentId = doc(collection(this.firestore, 'comments')).id; // Generate a unique ID
        const commentData = {
          id: commentId,
          postId: postId, // Associate the comment with the post
          comment: comment,
          imageUrl: imageUrl,
          userId: userId,
          userName: userProfile['name'],
          createdAt: new Date(),
        };
  
        // Send to Mock JSON server via your API
        this.http.post('http://localhost:3000/comments', commentData)
          .subscribe(response => {
            console.log('Comment saved to mock JSON server:', response);
          }, error => {
            console.error('Error saving comment to mock JSON server:', error);
          });
      } else {
        console.error('User profile not found');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }
    // Method to load comments for the current post
    loadComments(): void {
      this.http.get<CommentData[]>(`http://localhost:3000/comments?postId=${this.postData.id}`)
        .subscribe(comments => {
          this.comments = comments;
          // Update postData with fetched comments
          this.postData.comments = comments; // Ensure postData is updated
          console.log('Fetched Comments:', comments);
        }, error => {
          console.error('Error fetching comments:', error);
        });
    }
    
    toggleComments(): void {
      this.showComments = !this.showComments;
    }
    onLikePost(): void {
      // Increment the like count
      const updatedLikesCount = (this.postData.likesCount ?? 0) + 1;
  
      // Update the like count in the backend
      this.http.patch(`http://localhost:3000/posts/${this.postData.id}`, { likesCount: updatedLikesCount })
        .subscribe(() => {
          // Update the local postData with the new like count
          this.postData.likesCount = updatedLikesCount;
        }, error => {
          console.error('Error updating like count:', error);
        });
    }
  
}
