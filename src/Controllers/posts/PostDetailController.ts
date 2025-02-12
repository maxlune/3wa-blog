import { Request, Response } from "express";
import { PostRepository } from "../../Repositories/PostRepository";

export class PostDetailController {
  static async detail(postId: string): Promise<any | null> {
    try {
      const id = Number(postId);

      if (isNaN(id)) {
        throw new Error("ID non valide");
      }

      // console.log(await PostRepository.getPostById(id));

      return await PostRepository.getPostById(id);
    } catch (error) {
      console.error("Erreur lors de la récupération du post:", error);
      throw error; // Laisse la gestion de l'erreur à la route
    }
  }
}
