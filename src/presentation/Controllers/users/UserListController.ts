import { IUserRepository } from "../../../domain/repositories-interfaces/IUserRepository";

export class UserListController {
  constructor(private userRepository: IUserRepository) {}

  async list(): Promise<any> {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      console.error('Erreur lors de la récupération des users:', error);
      return null;
    }
  }
}