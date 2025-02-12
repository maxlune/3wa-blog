import { Request, Response } from "express";
import { PostRepository } from "../../Repositories/PostRepository";

export class PostUpdateController {

  // Form
  static async edit(req: any, res: any) {
    try {
      const postId = Number(req.params.id);
      if (isNaN(postId)) {
        return res.status(400).send("ID invalide.");
      }

      // Utilisation du PostRepository pour récupérer le post
      const post = await PostRepository.getPostById(postId);

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
  static async update(req: Request, res: Response) {
    try {
      const postId = Number(req.params.id);
      const { title, content } = req.body;

      if (title === undefined && content === undefined) {
        return res.status(400).json({
          error: "Au moins un des champs 'title' ou 'content' est requis pour la mise à jour.",
        });
      }

      const postExists = await PostRepository.postExists(postId);
      if (!postExists) {
        return res.status(404).json({ error: "Post non trouvé" });
      }

      const updatedPost = await PostRepository.updatePost(postId, { title, content });

      res.redirect(`/posts/${updatedPost.id}`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du post:", error);
      res.status(500).json({ error: "Erreur lors de la mise à jour du post" });
    }
  }
}
