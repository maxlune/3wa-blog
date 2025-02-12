import {UserRepository} from "../../Repositories/UserRepository";

export class UserListController {
  static async list(): Promise<any> {
    try {
      return UserRepository.findAll();
    } catch (error) {
      console.error('Erreur lors de la récupération des users:', error);
      return null;
    }
  }
}