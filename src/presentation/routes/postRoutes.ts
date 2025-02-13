import {PostCreateController} from "../Controllers/posts/PostCreateController";
import {PostListController} from "../Controllers/posts/PostListController";
import {PostDetailController} from "../Controllers/posts/PostDetailController";
import {PostUpdateController} from "../Controllers/posts/PostUpdateController";
import {PostDeleteController} from "../Controllers/posts/PostDeleteController";
import express from "express";
import {PostRepository} from "../../infrastructure/Repositories/PostRepository";
import {PostListService} from "../../application/services/PostListService";

const router = express.Router();

const postRepository = new PostRepository();

const postListService = new PostListService(postRepository);
const postListController = new PostListController(postListService);

const postCreateController = new PostCreateController(postRepository);
const postDetailController = new PostDetailController(postRepository);
const postDeleteController = new PostDeleteController(postRepository);
const postUpdateController = new PostUpdateController(postRepository)
const postEditController = new PostUpdateController(postRepository)

router.get("/posts/new", PostCreateController.new);
router.post("/posts", postCreateController.create);
router.get("/posts", postListController.list);

router.get("/posts/:id", async (req: any, res: any) => {
  try {
    const post = await postDetailController.detail(req.params.id);

    if (!post) {
      return res.status(404).send("Article introuvable.");
    }

    const isAuthenticated = !!req.cookies["connect.sid"];

    return res.render("posts/post-detail", { title: "Détail d'un article", post, isAuthenticated  });
  } catch (error) {
    console.error("Erreur dans la route /posts/:id :", error);
    res.status(500).send("Erreur lors du chargement de l'article.");
  }
});

router.get("/posts/:id/edit", postEditController.edit); // Affichage du formulaire
router.put("/posts/:id", (req, res, next) => {
  postUpdateController.update(req, res).catch(next); // Soumission update PUT
});


router.delete("/posts/:id", (req, res, next) => {
  postDeleteController.delete(req, res).catch(next);
})

export default router;