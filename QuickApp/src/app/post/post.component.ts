import { Component, Input } from '@angular/core';
import { PostData } from '../models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input()
  postData!: PostData;

}
