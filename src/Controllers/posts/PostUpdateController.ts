import { Request, Response } from "express";
import {IPostRepository} from "../../interfaces/IPostRepository";
import {PostRepository} from "../../Repositories/PostRepository";

export class PostUpdateController {
  constructor(private postRepository: IPostRepository) {}

  // Form
  edit = async (req: any, res: any) => {
    try {
      const postId = Number(req.params.id);
      if (isNaN(postId)) {
        return res.status(400).send("ID invalide.");
      }

      // Utilisation du PostRepository pour récupérer le post
      const post = await this.postRepository.getPostById(postId);

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

      if (title === undefined && content === undefined) {
        return res.status(400).json({
          error: "Au moins un des champs 'title' ou 'content' est requis pour la mise à jour.",
        });
      }

      const postExists = await this.postRepository.postExists(postId);
      if (!postExists) {
        return res.status(404).json({ error: "Post non trouvé" });
      }

      const updatedPost = await this.postRepository.updatePost(postId, { title, content });

      res.redirect(`/posts/${updatedPost.id}`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du post:", error);
      res.status(500).json({ error: "Erreur lors de la mise à jour du post" });
    }
  }
}
