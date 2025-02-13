import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { IUserRepository } from "../../../domain/repositories-interfaces/IUserRepository";

export class UserCreateController {
  constructor(private userRepository: IUserRepository) {}

  // Affichage du formulaire
  static async new(req: Request, res: Response) {

    const isAuthenticated = !!req.cookies["connect.sid"];
    if (isAuthenticated) {
      return res.redirect("/");
    }

    try {
      res.render("users/register", { title: "Inscription" });
    } catch (error) {
      console.error("Erreur lors de l'affichage du formulaire :", error);
      res.status(500).send("Erreur lors de l'affichage du formulaire.");
    }
  }

  // Handle form register
  create = async (req: any, res: any) => {
    try {
      const { email, nickname, password, passwordCheck, isContributor } = req.body;

      if (password !== passwordCheck) {
        return res.status(400).send("Les mots de passe ne correspondent pas.");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const isContributorBoolean = isContributor === "true"; // Conversion en boolean

      await this.userRepository.create(
        email,
        nickname,
        hashedPassword,
        isContributorBoolean,
      )

      res.redirect("/users/login");
    } catch (error) {
      console.error(`Erreur lors de la création de l'utilisateur:`, error);
      res.status(500).json({ error: `Erreur lors de la création de l'utilisateur` });
    }
  }
}