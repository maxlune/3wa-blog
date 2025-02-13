import {PostCreateController} from "../Controllers/posts/PostCreateController";
import {PostListController} from "../Controllers/posts/PostListController";
import {PostDetailController} from "../Controllers/posts/PostDetailController";
import {PostUpdateController} from "../Controllers/posts/PostUpdateController";
import {PostDeleteController} from "../Controllers/posts/PostDeleteController";
import express from "express";
import {PostRepository} from "../../infrastructure/Repositories/PostRepository";
import {PostListService} from "../../application/services/PostListService";
import {PostDetailService} from "../../application/services/PostDetailService";
import {PostDeleteService} from "../../application/services/PostDeleteService";
import {PostCreateService} from "../../application/services/PostCreateService";

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

const postUpdateController = new PostUpdateController(postRepository)
const postEditController = new PostUpdateController(postRepository)

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