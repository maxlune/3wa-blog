import { UserEntity } from "../../../domain/entities/UserEntity";
import { IUserRepository } from "../../../domain/repositories-interfaces/IUserRepository";
import { UserDTO } from "../../dtos/UserDTO";

export class UserListService {
  constructor(private userRepository: IUserRepository) {}

  async list(): Promise<any> {
    try {
      const users = await this.userRepository.findAll();
      return users.map(this.mapToDTO);
    } catch (error) {
      console.error('Erreur lors de la récupération des posts:', error);
      return null;
    }
  }

  private mapToDTO(user: UserEntity): UserDTO {
    return {
      id: user.id,
      nickname: user.nickname,
      email: user.email.toString(),
      isContributor: user.isContributor
    };
  }


}