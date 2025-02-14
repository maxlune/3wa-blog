import { IUserRepository } from "../../../domain/repositories-interfaces/IUserRepository";
import { UserDTO } from "../../dtos/UserDTO";
import {IPostRepository} from "../../../domain/repositories-interfaces/IPostRepository";
import {PostDTO} from "../../dtos/PostDTO";

export class UserDetailService {
  constructor(
    private userRepository: IUserRepository,
    private postRepository: IPostRepository,
  ) {}

  async detail(userId: number): Promise<any | null> {
    try {
      const id = Number(userId);

      if (isNaN(id)) {
        throw new Error("ID non valide");
      }

      const user = await this.userRepository.findOne(id);
      const posts = await this.postRepository.findPostsFromUser(id);
      if (!user) return null;

      return {
        user: UserDTO.fromEntity(user),
        posts: posts.map(post => PostDTO.fromEntity(post)),
      }
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

    return UserDTO.fromEntity(user);
  }
}