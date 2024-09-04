import { Component, OnInit, HostListener } from '@angular/core';
import { getFirestore, collection, getDocs, query, orderBy, limit, startAfter } from '@firebase/firestore';
import { PostData } from '../models/post.model';

@Component({
  selector: 'app-postfeed',
  templateUrl: './postfeed.component.html',
  styleUrls: ['./postfeed.component.css']
})
export class PostfeedComponent implements OnInit {
  private firestore = getFirestore();
  posts: PostData[] = [];
  lastVisiblePost: any = null;
  isLoading = false;

  constructor() {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollTop = window.scrollY || window.pageYOffset;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    console.log('Scroll Top:', scrollTop);
    console.log('Scroll Height:', scrollHeight);
    console.log('Client Height:', clientHeight);

    // Load more posts when scrolled near the bottom
    if (scrollTop + clientHeight >= scrollHeight - 50 && !this.isLoading) {
      this.fetchPosts();
    }
  }

  async fetchPosts() {
    if (this.isLoading) return; // Prevent concurrent fetches
    this.isLoading = true;

    console.log('Fetching posts...');

    try {
      const postsCollection = collection(this.firestore, 'posts');
      let q = query(postsCollection, orderBy('createdAt', 'desc'), limit(5)); // Adjust limit here

      if (this.lastVisiblePost) {
        q = query(q, startAfter(this.lastVisiblePost));
      }

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        this.lastVisiblePost = querySnapshot.docs[querySnapshot.docs.length - 1];
      }

      // Append new posts to existing ones
      this.posts = this.posts.concat(querySnapshot.docs.map(doc => {
        const data = doc.data() as PostData;
        console.log('Fetched post data:', data);
        return {
          ...data,
          createdAt: data.createdAt
        };
      }));

      // Log the final posts array
      console.log('Final posts array:', this.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
