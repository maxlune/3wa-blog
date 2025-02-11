import {PrismaClient} from "@prisma/client";
import {Request, Response} from "express";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class UserLoginController {

  // Affichage du formulaire 
  static async loginForm(req: Request, res: Response) {
    try {
      res.render("users/login", { title: "Connexion" });
    } catch (error) {
      console.error("Erreur lors de l'affichage du formulaire :", error);
      res.status(500).send("Erreur lors de l'affichage du formulaire.");
    }
  }
  static async login(req: Request, res: Response) {
    try {
      const { id, nickname, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { id },
      })

      if (!user) {
        return res.status(401).json({ error: "Identifiants invalides"})
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: "Identifiants invalides" });
      }

      // req.session.userId = user.id
      res.json({ message: "Connexion réussie" });
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      res.status(500).json({ error: "Erreur lors de la connexion" });
    }
  }
}