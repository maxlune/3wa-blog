import { Request, Response } from "express";
import { UserCreateService } from "../../../application/services/users/UserCreateService";

export class UserCreateController {
  constructor(private userCreateService: UserCreateService) {}

  // Affichage du formulaire si non connecté
  new = async(req: Request, res: Response) => {

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
      await this.userCreateService.createUser(req.body);
      res.redirect("/users/login");
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      res.status(400).send("Erreur lors de la création de l'utilisateur.");
    }
  };
}