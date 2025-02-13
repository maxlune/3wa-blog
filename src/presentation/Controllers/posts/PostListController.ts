import {PostListService} from "../../../application/services/posts/PostListService";

export class PostListController {
  constructor(private postListService: PostListService) {}

  list = async (req: any, res: any): Promise<any> => {
    try {
      const posts =  await this.postListService.list();
      const isAuthenticated = !!req.cookies["connect.sid"];

      res.render("posts/posts", { title: "Liste des articles", posts, isAuthenticated });
    } catch (error) {
      console.error("Erreur dans la route /posts:", error);
      res.status(500).send("Erreur lors du chargement des articles.");
    }
  }
}