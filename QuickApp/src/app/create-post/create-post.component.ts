import { Component, OnInit } from '@angular/core';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, collection, addDoc, setDoc, doc } from 'firebase/firestore';

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
  constructor(){}

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

  PostClick(commentInput: HTMLTextAreaElement) {
    if (!this.currentUser) {
      console.error('User is not logged in');
      return;
    }
  
    const comment = commentInput.value;
  
    if (this.selectedImageFile) {
      const storage = getStorage();
      const filePath = `uploads/${Date.now()}_${this.selectedImageFile.name}`;
      const fileRef = ref(storage, filePath);
  
      const uploadTask = uploadBytesResumable(fileRef, this.selectedImageFile);
  
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error('Upload failed:', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            this.savePost(comment, downloadURL);
          });
        }
      );
    } else {
      this.savePost(comment, null);
    }
  }
  


  async savePost(comment: string, imageUrl: string | null) {
    if (!this.currentUser) {
      console.error('User is not logged in');
      return;
    }
  
    const userId = this.currentUser.uid;
  
    try {
      // Generate a unique document ID by using the Firestore 'collection' function
      const postsCollectionRef = collection(this.firestore, 'posts');
      const postRef = doc(postsCollectionRef); // Firestore will automatically generate a unique ID
  
      await setDoc(postRef, {
        comment: comment,
        imageUrl: imageUrl,
        userId: userId,
        createdAt: new Date(),
      },{ merge: true });
  
      console.log('Post saved successfully with ID:', postRef.id);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  }
  
}
