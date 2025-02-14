import {PostEntity} from "../entities/PostEntity";

export interface IPostRepository {
  getAllPosts(): Promise<PostEntity[]>;
  getPostById(id: number): Promise<PostEntity | null>;
  createPost(data: { title: string, content: string, userId: number }): Promise<PostEntity>;
  deletePost(id: number): Promise<void>;
  postExists(id: number): Promise<PostEntity | null>;
  updatePost(id: number, data: Partial<{ title: string; content: string }>): Promise<PostEntity>;
}