import { Request, Response } from "express";
import { IPostRepository } from "../../../domain/repositories-interfaces/IPostRepository";

export class PostDeleteController {
  constructor(private postRepository: IPostRepository) {}

  async delete(req: Request, res: Response) {
    try {
      const postId = req.params.id;
      const id = Number(postId);

      const postExists = await this.postRepository.postExists(id);

      if (!postExists) {
        return res.status(404).json({ error: "Post non trouvé" });
      }

      await this.postRepository.deletePost(id);

      res.status(200).json({ message: "Post supprimé avec succès" });
    } catch (error) {
      console.error("Erreur lors de la suppression du post:", error);
      res.status(500).json({ error: "Erreur lors de la suppression du post" });
    }
  }
}
