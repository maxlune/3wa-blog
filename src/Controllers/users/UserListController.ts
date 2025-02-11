import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class UserListController {
  static async list(): Promise<any> {
    try {
      const users = await prisma.user.findMany({
        orderBy: {
          email: 'desc',
        },
      });

      return users;
    } catch (error) {
      console.error('Erreur lors de la récupération des users:', error);
      return null;
    }
  }
}