import {PrismaClient} from "@prisma/client";
import {Request, Response} from "express";
import bcrypt from "bcrypt";
import {UserRepository} from "../../Repositories/UserRepository";

const prisma = new PrismaClient();

export interface CustomRequest extends Request {
  session: {
    userId?: number;
  } & Request["session"];
}

export class UserLoginController {

  // Affichage du formulaire
  static async loginForm(req: Request, res: Response) {

    const isAuthenticated = !!req.cookies["connect.sid"];
    if (isAuthenticated) {
      return res.redirect("/");
    }

    try {
      res.render("users/login", { title: "Connexion" });
    } catch (error) {
      console.error("Erreur lors de l'affichage du formulaire :", error);
      res.status(500).send("Erreur lors de l'affichage du formulaire.");
    }
  }

  static async login(req: CustomRequest, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await UserRepository.findOneByEmail(email);

      if (!user) {
        res.status(401).json({ error: "Identifiants invalides"})
        return
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        res.status(401).json({ error: "Identifiants invalides" });
        return
      }

      req.session.userId = user.id;
      // res.json({ message: "Connexion réussie" });
      res.redirect("/users/me")
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      res.status(500).json({ error: "Erreur lors de la connexion" });
    }
  }

  static async me(req: CustomRequest, res: Response) {
    if (req.session.userId) {
      const user = await prisma.user.findUnique({
        where: { id: req.session.userId },
      });
      if (user) {
        return user
      } else {
        res.status(404).json({ error: "Utilisateur non trouvé" });
      }
    } else {
      res.status(401).json({ error: "Non connecté" });
    }
  }
}