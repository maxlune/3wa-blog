import { Request, Response } from "express";
import { PostRepository } from "../../Repositories/PostRepository";

export class PostListController {
  static async list(): Promise<any> {
    try {

      return await PostRepository.getAllPosts();
      
    } catch (error) {
      console.error('Erreur lors de la récupération des posts:', error);
      return null;
    }
  }
}