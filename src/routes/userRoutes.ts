import express from "express";
import {UserListController} from "../Controllers/users/UserListController";
import {UserDetailController} from "../Controllers/users/UserDetailController";
import {UserCreateController} from "../Controllers/users/UserCreateController";
import {UserDeleteController} from "../Controllers/users/UserDeleteController";
import {UserLoginController} from "../Controllers/users/UserLoginController";
import {UserLogoutController} from "../Controllers/users/UserLogoutController";

const router = express.Router()

router.post("/users", UserCreateController.create);
router.get("/users", UserListController.list);
router.get("/users/:id", UserDetailController.detail);
router.delete("/users/:id", (req, res, next) => {
  UserDeleteController.delete(req, res).catch(next);
})
router.post("/users/login", (req, res, next) => {
  UserLoginController.login(req, res).catch(next);
})
router.post("/users/logout", UserLogoutController.logout);

export default router;
