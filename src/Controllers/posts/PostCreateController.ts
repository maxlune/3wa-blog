import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class PostCreateController {
  static async create(req: Request, res: Response) {
    try {
      const { title, content } = req.body;

      const post = await prisma.post.create({
        data: {
          title,
          content,
        }
      });

      res.status(201).json(post);
    } catch (error) {
      console.error('Erreur lors de la création du post:', error);
      res.status(500).json({ error: 'Erreur lors de la création du post' });
    }
  }
}
