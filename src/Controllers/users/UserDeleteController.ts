import {PrismaClient} from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class UserDeleteController {
  static async delete(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const id = Number(userId);

      const userExists = await prisma.user.findUnique({
        where: { id },
      })
      if (!userExists) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }

      await prisma.user.delete({
        where: { id },
      })

      res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur" });
    }
  }
}