import express from "express";
import {UserListController} from "../Controllers/users/UserListController";
import {UserDetailController} from "../Controllers/users/UserDetailController";
import {UserCreateController} from "../Controllers/users/UserCreateController";
import {UserDeleteController} from "../Controllers/users/UserDeleteController";
import {UserLoginController} from "../Controllers/users/UserLoginController";
import {UserLogoutController} from "../Controllers/users/UserLogoutController";
import {UserRepository} from "../../infrastructure/Repositories/UserRepository";

const router = express.Router()

const userRepository = new UserRepository();
const userListController = new UserListController(userRepository);
const userCreateController = new UserCreateController(userRepository);
const userLoginController = new UserLoginController(userRepository);
const userDeleteController = new UserDeleteController(userRepository);
const userDetailController = new UserDetailController(userRepository);

router.get("/users/new", UserCreateController.new); // GET formulaire d'inscription
router.post("/users", userCreateController.create); // handle submit

router.get("/users/login", UserLoginController.loginForm); // GET formulaire de connexion
router.post("/users/login", (req, res, next) => {
  userLoginController.login(req, res).catch(next);
})

// router.get("/users", UserListController.list);
router.get("/users", async (req: any, res: any) => {
  try {
    const users = await userListController.list();

    const isAuthenticated = !!req.cookies["connect.sid"];

    return res.render("users/users", { title: "Liste des Utilisateurs", users, isAuthenticated });
  } catch (error) {
    console.error("Erreur dans la route users/users:", error);
    res.status(500).send("Erreur lors du chargement des utilisateurs.");
  }
});

// router.get("/users/me", UserLoginController.me);
router.get("/users/me", async (req: any, res: any) => {

  const isAuthenticated = !!req.cookies["connect.sid"];

  try {
    const user = await userLoginController.me(req, res);

    return res.render("users/me", { title: "Profil", user, isAuthenticated: isAuthenticated });
  } catch (error) {
    console.error("Erreur dans la route /users/me :", error);
    res.status(500).send("Erreur lors du chargement de l'utilisateur.");
  }
})

router.get("/users/:id", async (req: any, res: any) => {

  const isAuthenticated = !!req.cookies["connect.sid"];

  try {
    const user = await userDetailController.detail(req, res);

    return res.render("users/profil", { title: "Profil", user, isAuthenticated: isAuthenticated });
  } catch (error) {
    console.error("Erreur dans la route /users/me :", error);
    res.status(500).send("Erreur lors du chargement de l'utilisateur.");
  }
})

router.delete("/users/:id", (req, res, next) => {
  userDeleteController.delete(req, res).catch(next);
})
router.post("/users/logout", UserLogoutController.logout);

export default router;
