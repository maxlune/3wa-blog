import {PostCreateController} from "../Controllers/posts/PostCreateController";
import {PostListController} from "../Controllers/posts/PostListController";
import {PostDetailController} from "../Controllers/posts/PostDetailController";
import {PostUpdateController} from "../Controllers/posts/PostUpdateController";
import {PostDeleteController} from "../Controllers/posts/PostDeleteController";
import express from "express";

const router = express.Router()

router.post("/posts", PostCreateController.create);
router.get("/posts", PostListController.list);
router.get("/posts/:id", PostDetailController.detail)
router.put("/posts/:id", (req, res, next) => {
  PostUpdateController.update(req, res).catch(next);
});
router.delete("/posts/:id", (req, res, next) => {
  PostDeleteController.delete(req, res).catch(next);
})

export default router;