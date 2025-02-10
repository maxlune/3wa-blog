import { Request, Response } from "express";
import { UserModel } from "../../Models2/users/user_model";

export const UserListController = {
  async list(req: Request, res: Response) {
    // const users = await UserModel.findAll();
    res.json({})
  }
}

