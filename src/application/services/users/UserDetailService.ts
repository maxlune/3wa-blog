import { UserEntity } from "../../../domain/entities/UserEntity";
import { IUserRepository } from "../../../domain/repositories-interfaces/IUserRepository";
import Email from "../../../domain/value-objects/users/Email.valueObject";
import Password from "../../../domain/value-objects/users/Password.valueObject";

export class UserDetailService {
  constructor(private userRepository: IUserRepository) {}

  async detail(userId: number): Promise<any | null> {
    try {
      const id = Number(userId);

      if (isNaN(id)) {
        throw new Error("ID non valide");
      }

      const user = await this.userRepository.findOneWithPosts(id);
      if (!user) return null;

      return this.mapToEntity(user);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'user:", error);
      throw error; // Laisse la gestion de l'erreur à la route
    }
  }

  async me(userId: number) {
    if (!userId) {
      throw new Error("Non connecté");
    }

    const user = await this.userRepository.findOneWithPosts(userId);

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    return this.mapToEntity(user);
  }

  private mapToEntity(user: any): UserEntity {
    return new UserEntity(
      user.id,
      user.nickname,
      new Email(user.email),
      new Password(user.password, true),
      user.isContributor
    );
  }
}