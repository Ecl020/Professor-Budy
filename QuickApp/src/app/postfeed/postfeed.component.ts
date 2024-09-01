import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, getDocs, query, orderBy, limit, startAfter } from '@firebase/firestore';
import { PostData } from '../models/post.model';

@Component({
  selector: 'app-postfeed',
  templateUrl: './postfeed.component.html',
  styleUrls: ['./postfeed.component.css']
})
export class PostfeedComponent implements OnInit {
  private firestore = getFirestore(); // No need to initialize again
  posts: PostData[] = [];
  lastVisiblePost: any = null;

  constructor() {}

  async ngOnInit() {
    await this.fetchPosts();
  }

  async fetchPosts() {
    console.log('Fetching posts...');

    try {
      // Fetch all posts from the 'posts' collection
      const postsCollection = collection(this.firestore, 'posts');
      const querySnapshot = await getDocs(postsCollection);

      // Log the raw query snapshot
      console.log('Query snapshot:', querySnapshot);

      // Map and log fetched posts
      this.posts = querySnapshot.docs.map(doc => {
        const data = doc.data() as PostData;
        console.log('Fetched post data:', data);
        return {
          ...data,
          createdAt: data.createdAt
        };
      });

      // Log the final posts array
      console.log('Final posts array:', this.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
}
