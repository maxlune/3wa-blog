import express from "express";
import {UserListController} from "../Controllers/users/UserListController";
import {UserDetailController} from "../Controllers/users/UserDetailController";
import {UserCreateController} from "../Controllers/users/UserCreateController";
import {UserDeleteController} from "../Controllers/users/UserDeleteController";
import {UserLoginController} from "../Controllers/users/UserLoginController";
import {UserLogoutController} from "../Controllers/users/UserLogoutController";
import {UserRepository} from "../../infrastructure/Repositories/UserRepository";
import { UserListService } from "../../application/services/users/UserListService";
import { UserDetailService } from "../../application/services/users/UserDetailService";
import { UserCreateService } from "../../application/services/users/UserCreateService";
import {PostRepository} from "../../infrastructure/Repositories/PostRepository";

const router = express.Router()

const userRepository = new UserRepository();
const postRepository = new PostRepository();

const userListService = new UserListService(userRepository);
const userDetailService = new UserDetailService(userRepository, postRepository);
const userCreateService = new UserCreateService(userRepository);

const userListController = new UserListController(userListService);
const userCreateController = new UserCreateController(userCreateService);
const userLoginController = new UserLoginController(userRepository);
const userDeleteController = new UserDeleteController(userRepository);
const userDetailController = new UserDetailController(userDetailService);
const userLogoutController = new UserLogoutController();

router.get("/users/new", userCreateController.new); // GET formulaire d'inscription
router.post("/users", userCreateController.create); // handle submit
router.get("/users/login", userLoginController.loginForm); // GET formulaire de connexion
router.post("/users/login", (req, res, next) => {
  userLoginController.login(req, res).catch(next);
})
router.get("/users", userListController.list);
router.get("/users/me", userDetailController.me);
router.get("/users/:id", userDetailController.detail);
router.delete("/users/:id", (req, res, next) => {
  userDeleteController.delete(req, res).catch(next);
})
router.post("/users/logout", userLogoutController.logout);

export default router;
