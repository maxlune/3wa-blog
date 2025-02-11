import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class PostCreateController {
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
  static async create(req: any, res: any) {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).send("Le titre et le contenu sont requis.");
      }

      const post = await prisma.post.create({
        data: {
          title,
          content,
        },
      });

      res.redirect("/posts"); 
    } catch (error) {
      console.error("Erreur lors de la création du post:", error);
      res.status(500).send("Erreur lors de la création du post.");
    }
  }
}
