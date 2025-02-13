import { Request, Response } from "express";
import {IPostRepository} from "../../../domain/repositories-interfaces/IPostRepository";
import {PostCreateService} from "../../../application/services/PostCreateService";

export class PostCreateController {
  constructor(
    private postCreateService: PostCreateService,
  ) {}

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
      const userId = req.session?.userId; 

      await this.postCreateService.create(title, content, userId);

      res.redirect("/posts");
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Le titre et le contenu sont requis.") {
          res.status(400).json({ error: error.message });
        } else if (error.message === "Vous devez être connecté pour créer un article.") {
          res.status(401).json({ error: error.message });
        } else {
          console.error("Erreur lors de la création du post:", error);
          res.status(500).send("Erreur lors de la création du post.");
        }
      }
    }
  }
}
