import {PrismaClient} from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class UserCreateController {
  static async create(req: Request, res: Response) {
    try {
    const { email, nickname, password, isContributor } = req.body;

    const user = await prisma.user.create({
      data: {
        email,
        nickname,
        password,
        isContributor,
      }
    });
    res.status(201).json(user);
    } catch (error) {
      console.error(`Erreur lors de la création de l'utilisateur:`, error);
      res.status(500).json({ error: `Erreur lors de la création de l'utilisateur` });
    }
  }
}