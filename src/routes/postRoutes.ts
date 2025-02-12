import {PostCreateController} from "../Controllers/posts/PostCreateController";
import {PostListController} from "../Controllers/posts/PostListController";
import {PostDetailController} from "../Controllers/posts/PostDetailController";
import {PostUpdateController} from "../Controllers/posts/PostUpdateController";
import {PostDeleteController} from "../Controllers/posts/PostDeleteController";
import express from "express";

const router = express.Router();

router.get("/posts/new", PostCreateController.new); 
router.post("/posts", PostCreateController.create);

router.get("/posts", async (req: any, res: any) => {
  try {
    const posts = await PostListController.list();

    const isAuthenticated = !!req.cookies["connect.sid"];

    return res.render("posts/posts", { title: "Liste des articles", posts, isAuthenticated });
  } catch (error) {
    console.error("Erreur dans la route /posts:", error);
    res.status(500).send("Erreur lors du chargement des articles.");
  }
});


router.get("/posts/:id", async (req: any, res: any) => {
  try {
    const post = await PostDetailController.detail(req.params.id);

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



router.get("/posts/:id/edit", PostUpdateController.edit); // Affichage du formulaire
router.put("/posts/:id", (req, res, next) => {
  PostUpdateController.update(req, res).catch(next); // Soumission update PUT
});


router.delete("/posts/:id", (req, res, next) => {
  PostDeleteController.delete(req, res).catch(next);
})


export default router;