import {PostCreateController} from "../Controllers/posts/PostCreateController";
import {PostListController} from "../Controllers/posts/PostListController";
import {PostDetailController} from "../Controllers/posts/PostDetailController";
import {PostUpdateController} from "../Controllers/posts/PostUpdateController";
import {PostDeleteController} from "../Controllers/posts/PostDeleteController";
import express from "express";
import {PostRepository} from "../../infrastructure/Repositories/PostRepository";
import {PostUpdateService} from "../../application/services/posts/PostUpdateService";
import {PostCreateService} from "../../application/services/posts/PostCreateService";
import {PostDeleteService} from "../../application/services/posts/PostDeleteService";
import {PostDetailService} from "../../application/services/posts/PostDetailService";
import {PostListService} from "../../application/services/posts/PostListService";

const router = express.Router();

const postRepository = new PostRepository();

const postListService = new PostListService(postRepository);
const postListController = new PostListController(postListService);
const postCreateService = new PostCreateService(postRepository);
const postCreateController = new PostCreateController(postCreateService);
const postDetailService = new PostDetailService(postRepository);
const postDetailController = new PostDetailController(postDetailService);
const postDeleteService = new PostDeleteService(postRepository);
const postDeleteController = new PostDeleteController(postDeleteService);

const postUpdateService = new PostUpdateService(postRepository);
const postUpdateController = new PostUpdateController(postUpdateService)
const postEditController = new PostUpdateController(postUpdateService)

router.get("/posts/new", PostCreateController.new);
router.post("/posts", postCreateController.create);
router.get("/posts", postListController.list);
router.get("/posts/:id", postDetailController.detail)

router.get("/posts/:id/edit", postEditController.edit); // Affichage du formulaire
router.put("/posts/:id", (req, res, next) => {
  postUpdateController.update(req, res).catch(next); // Soumission update PUT
});


router.delete("/posts/:id", (req, res, next) => {
  postDeleteController.delete(req, res).catch(next);
})

export default router;