import {PrismaClient} from "@prisma/client";
import { Request, Response } from "express";
import {UserRepository} from "../../Repositories/UserRepository";

const prisma = new PrismaClient();

export class UserDetailController {
  static async detail(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const id = Number(userId)

      const user = UserRepository.findOne(id)

      res.json(user);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur" });
    }
  }
}