import {Post} from "@prisma/client";

export interface IPostRepository {
  getAllPosts(): Promise<Post[]>;
  getPostById(id: number): Promise<Post | null>;
  createPost(data: {title: string, content: string, userId: number}): Promise<Post>;
  deletePost(id: number): Promise<void>;
  postExists(id: number): Promise<{id: number, createdAt: Date, updatedAt: Date, title: string, content: string, userId: number} | null>;
  updatePost(id: number, data: Partial<{ title: string; content: string }>):  Promise<{id: number, createdAt: Date, updatedAt: Date, title: string, content: string, userId: number}>;
}