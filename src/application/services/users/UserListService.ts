import { UserEntity } from "../../../domain/entities/UserEntity";
import { IUserRepository } from "../../../domain/repositories-interfaces/IUserRepository";
import Email from "../../../domain/value-objects/users/Email.valueObject";
import Password from "../../../domain/value-objects/users/Password.valueObject";

export class UserListService {
  constructor(private userRepository: IUserRepository) {}

  async list(): Promise<any> {
    try {
      const users = await this.userRepository.findAll();
      return users.map(this.mapToEntity);
    } catch (error) {
      console.error('Erreur lors de la récupération des posts:', error);
      return null;
    }
  }

  private mapToEntity(user: any): UserEntity {
    return new UserEntity(
      user.id,
      user.nickname,
      new Email(user.email),
      new Password(user.password),
      user.isContributor
    );
  }


}