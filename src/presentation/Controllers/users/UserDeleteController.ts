import { Request, Response } from "express";
import {IUserRepository} from "../../../domain/repositories-interfaces/IUserRepository";

export class UserDeleteController {
  constructor(private userRepository: IUserRepository) {}

  async delete(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const id = Number(userId);

      const userExists = this.userRepository.findOne(id)
      if (!userExists) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }

      await this.userRepository.delete(id)

      res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur" });
    }
  }
}