import express from "express";
import {UserListController} from "../Controllers/users/UserListController";
import {UserDetailController} from "../Controllers/users/UserDetailController";
import {UserCreateController} from "../Controllers/users/UserCreateController";
import {UserDeleteController} from "../Controllers/users/UserDeleteController";

const router = express.Router()

router.post("/users", UserCreateController.create);
router.get("/users", UserListController.list);
router.get("/users/:id", UserDetailController.detail);
router.delete("/users/:id", (req, res, next) => {
  UserDeleteController.delete(req, res).catch(next);
})

export default router;
