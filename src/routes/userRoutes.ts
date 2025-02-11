import express from "express";
import {UserListController} from "../Controllers/users/UserListController";
import {UserDetailController} from "../Controllers/users/UserDetailController";
import {UserCreateController} from "../Controllers/users/UserCreateController";
import {UserDeleteController} from "../Controllers/users/UserDeleteController";
import {UserLoginController} from "../Controllers/users/UserLoginController";
import {UserLogoutController} from "../Controllers/users/UserLogoutController";

const router = express.Router()

router.get("/users/new", UserCreateController.new); // GET formulaire d'inscription
router.post("/users", UserCreateController.create); // handle submit

router.get("/users/login", UserLoginController.loginForm); // GET formulaire de connexion
router.post("/users/login", (req, res, next) => {
  UserLoginController.login(req, res).catch(next);
})

// router.get("/users", UserListController.list);
router.get("/users", async (req: any, res: any) => {
  try {
    const users = await UserListController.list();

    if (!users || users.length === 0) {
      return res.status(404).send("Aucun user trouvé.");
    }

    return res.render("users/users", { title: "Liste des Utilisateurs", users });
  } catch (error) {
    console.error("Erreur dans la route users/users:", error);
    res.status(500).send("Erreur lors du chargement des utilisateurs.");
  }
});

router.get("/users/:id", UserDetailController.detail);

router.delete("/users/:id", (req, res, next) => {
  UserDeleteController.delete(req, res).catch(next);
})


router.post("/users/logout", UserLogoutController.logout);

export default router;
