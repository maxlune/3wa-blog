import { UserListService } from "../../../application/services/users/UserListService";

export class UserListController {
  constructor(private userListService: UserListService) {}

  list = async (req: any, res: any): Promise<any> => {
    try {
      const users =  await this.userListService.list();
      const isAuthenticated = !!req.cookies["connect.sid"];

      res.render("users/users", { title: "Liste des utilisateurs", users, isAuthenticated });
    } catch (error) {
      console.error("Erreur dans la route /posts:", error);
      res.status(500).send("Erreur lors du chargement des utilisateurs.");
    }
  }
}