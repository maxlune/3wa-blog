import { Request, Response } from "express";
import { PostDeleteService } from "../../../application/services/PostDeleteService";

export class PostDeleteController {
  constructor(private postDeleteService: PostDeleteService) {}

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const postId = Number(req.params.id);
      await this.postDeleteService.delete(postId);
      res.status(200).json({ message: "Post supprimé avec succès" });
    } catch (error) {
      console.error("Erreur dans le contrôleur PostDeleteController:", error);
      if (error instanceof Error) {
        if (error.message === "Post non trouvé") {
          res.status(404).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Erreur lors de la suppression du post" });
        }
      }
    }
  }
}
