import {UserRepository} from "../../Repositories/UserRepository";

export class UserListController {
  constructor(private userRepository: UserRepository) {}

  async list(): Promise<any> {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      console.error('Erreur lors de la récupération des users:', error);
      return null;
    }
  }
}