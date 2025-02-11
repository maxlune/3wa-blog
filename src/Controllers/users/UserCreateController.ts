import {PrismaClient} from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class UserCreateController {
  static async create(req: Request, res: Response) {
    try {
    const { email, nickname, password, isContributor } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        nickname,
        password: hashedPassword,
        isContributor,
      }
    });

    const { password: pwd, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error(`Erreur lors de la création de l'utilisateur:`, error);
      res.status(500).json({ error: `Erreur lors de la création de l'utilisateur` });
    }
  }
}