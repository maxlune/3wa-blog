import { Request, Response } from "express";
import {PostUpdateService} from "../../../application/services/PostUpdateService";

export class PostUpdateController {
  constructor(private postUpdateService: PostUpdateService) {}

  // Form
  edit = async (req: any, res: any) => {
    try {
      const postId = Number(req.params.id);
      if (isNaN(postId)) {
        return res.status(400).send("ID invalide.");
      }

      // Utilisation du PostRepository pour récupérer le post
      const post = await this.postUpdateService.getPostById(postId);

      if (!post) {
        return res.status(404).send("Post non trouvé.");
      }

      const isAuthenticated = !!req.cookies["connect.sid"];

      res.render("posts/edit-post", { title: "Modifier l'article", post, isAuthenticated });
    } catch (error) {
      console.error("Erreur lors de l'affichage du formulaire :", error);
      res.status(500).send("Erreur lors de l'affichage du formulaire.");
    }
  }
  update = async (req: Request, res: Response) => {
    try {
      const postId = Number(req.params.id);
      const { title, content } = req.body;

      const updatedPost = await this.postUpdateService.update( title, content, postId);

      if (updatedPost) {
        res.redirect(`/posts/${updatedPost.id}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Post non trouvé") {
          res.status(404).json({ error: error.message });
        } else {
          console.error("Erreur dans le contrôleur PostUpdateController:", error);
          res.status(500).json({ error: "Erreur lors de la mise à jour du post" });
        }
      }
    }
  }
}
