import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class PostListController {
  static async list(req: Request, res: Response) {
    try {
      const posts = await prisma.post.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      });

      res.json(posts);
    } catch (error) {
      console.error('Erreur lors de la récupération des posts:', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des posts' });
    }
  }
}