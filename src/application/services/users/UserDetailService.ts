import { UserEntity } from "../../../domain/entities/UserEntity";
import { IUserRepository } from "../../../domain/repositories-interfaces/IUserRepository";
import { UserDTO } from "../../dtos/UserDTO";

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

      return this.mapToDTO(user);
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

    return this.mapToDTO(user);
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