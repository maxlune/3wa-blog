import {PostDetailService} from "../../../application/services/PostDetailService";

export class PostDetailController {
  constructor(private postDetailService: PostDetailService) {}

  detail = async(req: any, res: any): Promise<any | null> => {
    try {
      const post = await this.postDetailService.detail(req.params.id);

      if (!post) {
        return res.status(404).send("Article introuvable.");
      }

      const isAuthenticated = !!req.cookies["connect.sid"];

      return res.render("posts/post-detail", { title: "Détail d'un article", post, isAuthenticated  });
    } catch (error) {
      console.error("Erreur dans la route /posts/:id :", error);
      res.status(500).send("Erreur lors du chargement de l'article.");
    }
  }
}
