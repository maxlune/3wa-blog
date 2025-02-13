import { Request, Response } from "express";
import { PostRepository } from "../../../infrastructure/Repositories/PostRepository";
import { IPostRepository } from "../../../domain/repositories-interfaces/IPostRepository";

export class PostCreateController {
  constructor(private postRepository: IPostRepository) {}

  // Affichage du formulaire
  static async new(req: Request, res: Response) {
    try {
      const isAuthenticated = !!req.cookies["connect.sid"];

      res.render("posts/create-post", { title: "Créer un nouvel article", isAuthenticated });
    } catch (error) {
      console.error("Erreur lors de l'affichage du formulaire :", error);
      res.status(500).send("Erreur lors de l'affichage du formulaire.");
    }
  }

  // Handle submit
  create = async (req: any, res: any) => {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).send("Le titre et le contenu sont requis.");
      }

      const userId = req.session?.userId; 
      if (!userId) {
        return res.status(401).send("Vous devez être connecté pour créer un article.");
      }

      await this.postRepository.createPost({ title, content, userId });

      res.redirect("/posts"); 
    } catch (error) {
      console.error("Erreur lors de la création du post:", error);
      res.status(500).send("Erreur lors de la création du post.");
    }
  }
}
