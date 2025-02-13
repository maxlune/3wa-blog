import { Request, Response } from "express";
import {IUserRepository} from "../../../domain/repositories-interfaces/IUserRepository";

export class UserDetailController {
  constructor(private userRepository: IUserRepository) {}

  async detail(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const id = Number(userId)

      const user = await this.userRepository.findOneWithPosts(id);
      if (!user) {
        return res.status(404).send("Utilisateur non trouvé.");
      }

      return { ...user, password: undefined };
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur" });
    }
  }
}