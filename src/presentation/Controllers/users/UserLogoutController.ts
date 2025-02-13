import { Request, Response } from "express";

export class UserLogoutController {
  logout = async(req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Erreur lors de la déconnexion:", err);
        return res.status(500).json({ error: "Erreur lors de la déconnexion" });
      }
      res.clearCookie("connect.sid", { path: "/" });
      res.redirect("/users/login");
    });
  }
}
