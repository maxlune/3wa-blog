import {PrismaClient} from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class UserCreateController {

  // Affichage du formulaire 
  static async new(req: Request, res: Response) {
    try {
      res.render("users/register", { title: "Inscription" });
    } catch (error) {
      console.error("Erreur lors de l'affichage du formulaire :", error);
      res.status(500).send("Erreur lors de l'affichage du formulaire.");
    }
  }

  // Handle form register
  static async create(req: any, res: any) {
    try {
      const { email, nickname, password, passwordCheck, isContributor } = req.body;

      if (password !== passwordCheck) {
        return res.status(400).send("Les mots de passe ne correspondent pas.");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          nickname,
          password: hashedPassword,
          isContributor: isContributor === "true",
        }
      });

      const { password: pwd, ...userWithoutPassword } = user;
      res.redirect("/users/login"); 
    } catch (error) {
      console.error(`Erreur lors de la création de l'utilisateur:`, error);
      res.status(500).json({ error: `Erreur lors de la création de l'utilisateur` });
    }
  }
}