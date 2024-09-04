export interface PostData {
  id: string;
  userName: string;
  comment: string;
  createdAt: Date;
  userAvatarUrl?: string; // Optional, if you want to include a user avatar
  imageUrl?: string;      // Optional, if posts have images
  likesCount?: number;    // Optional, to store the number of likes
  comments?: CommentData[]; // Optional, to store post comments
}

export interface CommentData {
  id: string;
  userId: string;
  userName: string;
  comment: string;
  createdAt: Date;
  replies?: ReplyData[];
}


export interface ReplyData {
  id: string;
  userId: string;
  userName: string;
  reply: string;
  createdAt: Date;
}
