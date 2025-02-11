import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class PostDetailController {
  static async detail(postId: string): Promise<any | null> {
    try {
      const id = Number(postId);

      if (isNaN(id)) {
        throw new Error("ID non valide");
      }

      const post = await prisma.post.findUnique({
        where: { id },
      });

      return post;
    } catch (error) {
      console.error("Erreur lors de la récupération du post:", error);
      throw error; // Laisse la gestion de l'erreur à la route
    }
  }
}
