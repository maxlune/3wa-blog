import {PrismaClient} from "@prisma/client";
import { Request, Response } from "express";
import {UserRepository} from "../../Repositories/UserRepository";

const prisma = new PrismaClient();

export class UserDeleteController {
  static async delete(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const id = Number(userId);

      const userExists = UserRepository.findOne(id)
      if (!userExists) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }

      await UserRepository.delete(id)

      res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur" });
    }
  }
}