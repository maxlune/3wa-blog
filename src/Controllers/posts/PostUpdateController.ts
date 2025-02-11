import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class PostUpdateController {

  // Form
  static async edit(req: any, res: any) {
    try {
      const postId = req.params.id;
      const id = Number(postId);

      const post = await prisma.post.findUnique({
        where: { id },
      });

      if (!post) {
        return res.status(404).send("Post non trouvé.");
      }

      res.render("edit-post", { title: "Modifier l'article", post });
    } catch (error) {
      console.error("Erreur lors de l'affichage du formulaire :", error);
      res.status(500).send("Erreur lors de l'affichage du formulaire.");
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const postId = req.params.id;
      const id = Number(postId);

      const { title, content } = req.body;

      if (title === undefined && content === undefined) {
        return res.status(400).json({
          error: "Au moins un des champs 'title' ou 'content' est requis pour la mise à jour.",
        });
      }

      const postExists = await prisma.post.findUnique({
        where: { id },
      });
      if (!postExists) {
        return res.status(404).json({ error: "Post non trouvé" });
      }

      const updatedPost = await prisma.post.update({
        where: { id },
        data: {
          title: title !== undefined ? title : postExists.title,
          content: content !== undefined ? content : postExists.content,
        },
      });

      // res.status(200).json(updatedPost);
      res.redirect(`/posts/${updatedPost.id}`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du post:", error);
      res.status(500).json({ error: "Erreur lors de la mise à jour du post" });
    }
  }
}
