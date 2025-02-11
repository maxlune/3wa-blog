import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class PostDeleteController {
  static async delete(req: Request, res: Response) {
    try {
      const postId = req.params.id;
      const id = Number(postId);

      const postExists = await prisma.post.findUnique({
        where: { id },
      });
      if (!postExists) {
        return res.status(404).json({ error: "Post non trouvé" });
      }

      await prisma.post.delete({
        where: { id },
      });

      res.status(200).json({ message: "Post supprimé avec succès" });
    } catch (error) {
      console.error("Erreur lors de la suppression du post:", error);
      res.status(500).json({ error: "Erreur lors de la suppression du post" });
    }
  }
}
