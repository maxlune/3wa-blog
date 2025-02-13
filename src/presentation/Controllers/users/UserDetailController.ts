import { Request, Response } from "express";
import { UserDetailService } from "../../../application/services/users/UserDetailService";
import { CustomRequest } from "./UserLoginController";

export class UserDetailController {
  constructor(private userDetailService: UserDetailService) {}

  detail = async(req: Request, res: Response): Promise<any | null> => {
    try {
      const userId = req.params.id;
      const id = Number(userId)

      const user = await this.userDetailService.detail(id);
      if (!user) {
        return res.status(404).send("Utilisateur non trouvé.");
      }

      const isAuthenticated = !!req.cookies["connect.sid"];

      return res.render("users/profil", { title: "Profil user", user, isAuthenticated  });
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur" });
    }
  }

  me = async (req: CustomRequest, res: Response): Promise<any | null> => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Non connecté" });
      }
      const isAuthenticated = !!req.cookies["connect.sid"];

      const user = await this.userDetailService.me(Number(req.session.userId));
      
      return res.render("users/me", { title: "Mon profil", user, isAuthenticated  });
    } catch (error) {
      console.error("Erreur lors de la récupération du profil :", error);
      res.status(400).json({ error: "Erreur lors de la récupération du profil." });
    }
  };
}