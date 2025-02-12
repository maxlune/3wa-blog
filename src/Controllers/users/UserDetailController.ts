import {PrismaClient} from "@prisma/client";
import { Request, Response } from "express";
import {UserRepository} from "../../Repositories/UserRepository";

const prisma = new PrismaClient();

export class UserDetailController {
  static async detail(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const id = Number(userId)

      // const user = UserRepository.findOne(id)
      const user = await UserRepository.findOneWithPosts(id);
      if (!user) {
        return res.status(404).send("Utilisateur non trouvé.");
      }

      const userWithoutPassword = { ...user, password: undefined };

      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur" });
    }
  }
}