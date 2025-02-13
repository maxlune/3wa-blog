import {Request, Response} from "express";
import bcrypt from "bcrypt";
import {IUserRepository} from "../../../domain/repositories-interfaces/IUserRepository";

export interface CustomRequest extends Request {
  session: {
    userId?: number;
  } & Request["session"];
}

export class UserLoginController {
  constructor(private userRepository: IUserRepository) {}

  // Affichage du formulaire
  loginForm = async(req: Request, res: Response) => {

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

  async login(req: CustomRequest, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await this.userRepository.findOneByEmail(email);

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

}