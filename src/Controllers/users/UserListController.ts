import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class UserListController {
  static async list(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          nickname: true,
          isContributor: true,
        },
      });

      res.json(users);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
  }
}