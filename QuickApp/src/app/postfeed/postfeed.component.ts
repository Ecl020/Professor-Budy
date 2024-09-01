import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, addDoc, setDoc, doc, getDocs } from '@firebase/firestore';
import { PostData } from '../models/post.model';

@Component({
  selector: 'app-postfeed',
  templateUrl: './postfeed.component.html',
  styleUrls: ['./postfeed.component.css']
})
export class PostfeedComponent implements OnInit {
  private firestore = getFirestore(); // No need to initialize again
  posts: PostData[] = [];

  constructor() {}

  async ngOnInit() {
    await this.fetchPosts();
  }

  async fetchPosts() {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, 'posts'));
      this.posts = querySnapshot.docs.map(doc => {
        const data = doc.data() as PostData;
        return {
          ...data,
          createdAt: data.createdAt // Convert Firestore timestamp to JavaScript Date
        };
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
}
