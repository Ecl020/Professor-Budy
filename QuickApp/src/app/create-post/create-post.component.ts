import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, collection, addDoc, setDoc, doc, getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  private firestore = getFirestore(); // No need to initialize again
  private auth = getAuth(); // No need to initialize again
  currentUser: User | null = null; // To store the current user's data
  isLoggedIn = false; // To track if the user is logged in
  selectedImageFile: File | null = null; // Initialize the variable
  comment: string = ''; // Bind to Quill editor
  

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
  }
  constructor(private http: HttpClient){}

  PhotoSelected(photoSelector: HTMLInputElement) {
    if (photoSelector.files && photoSelector.files.length > 0) {
      this.selectedImageFile = photoSelector.files[0];
    } else {
      return;
    }

    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedImageFile);

    fileReader.addEventListener('loadend', (ev) => {
      let readableString = fileReader.result?.toString();
      if (readableString) {
        let postPreviewImage = document.getElementById('post-preview-image') as HTMLImageElement;
        if (postPreviewImage) {
          postPreviewImage.src = readableString;
        }
      }
    });
  }

  async PostClick(commentInput: HTMLTextAreaElement) {
    if (!this.currentUser) {
      console.error('User is not logged in');
      return;
    }
  
    const comment = commentInput.value;
    
    if (this.selectedImageFile) {
      const storage = getStorage();
      const filePath = `uploads/${Date.now()}_${this.selectedImageFile.name}`;
      const fileRef = ref(storage, filePath);
  
      try {
        // Return a Promise for the image upload task
        const uploadTask = uploadBytesResumable(fileRef, this.selectedImageFile);
        await new Promise<void>((resolve, reject) => {
          uploadTask.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
            },
            (error) => {
              console.error('Upload failed:', error);
              reject(error);
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                console.log('File available at', downloadURL);
                await this.savePost(comment, downloadURL);
                resolve();
              } catch (error) {
                console.error('Error getting download URL:', error);
                reject(error);
              }
            }
          );
        });
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      await this.savePost(comment, null);
    }
  }
  
  


  // async savePost(comment: string, imageUrl: string | null) {
  //   if (!this.currentUser) {
  //     console.error('User is not logged in');
  //     return;
  //   }
  
  //   const userId = this.currentUser.uid;
  
  //   try {
  //     // Generate a unique document ID by using the Firestore 'collection' function
  //     const postsCollectionRef = collection(this.firestore, 'posts');
  //     const postRef = doc(postsCollectionRef); // Firestore will automatically generate a unique ID
  
  //     await setDoc(postRef, {
  //       comment: comment,
  //       // imageUrl: imageUrl,
  //       userId: userId,
  //       createdAt: new Date(),
  //     },{ merge: true });
  
  //     console.log('Post saved successfully with ID:', postRef.id);
  //   } catch (error) {
  //     console.error('Error adding post:', error);
  //   }
  // }

  async savePost(comment: string, imageUrl: string | null) {
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
  
        // Prepare post data with a unique ID
        const postId = doc(collection(this.firestore, 'posts')).id; // Generate a unique ID
        const postData = {
          id: postId, // Add the generated ID to the post data
          comment: comment,
          imageUrl: imageUrl,
          userId: userId,
          userName: userProfile['name'],
          createdAt: new Date(),
        };
  
       
  
        // Send to Mock JSON server via your API
        this.http.post('http://localhost:3000/posts', postData)
          .subscribe(response => {
            console.log('Post saved to mock JSON server:', response);
          }, error => {
            console.error('Error saving post to mock JSON server:', error);
          });
      } else {
        console.error('User profile not found');
      }
    } catch (error) {
      console.error('Error adding post:', error);
    }
  }
  
  
  
}
