import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class PostDetailController {
  static async detail(req: Request, res: Response) {
    try {
      const postId = req.params.id;
      const id = Number(postId);

      const post = await prisma.post.findUnique({
        where: { id },
      });

      res.json(post);
    } catch (error) {
      console.error("Erreur lors de la récupération du post:", error);
      res.status(500).json({ error: "Erreur lors de la récupération du post" });
    }
  }
}
