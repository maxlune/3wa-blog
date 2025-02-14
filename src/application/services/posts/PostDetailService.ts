import {IPostRepository} from "../../../domain/repositories-interfaces/IPostRepository";
import {PostEntity} from "../../../domain/entities/PostEntity";
import {PostDTO} from "../../dtos/PostDTO";

export class PostDetailService {
  constructor(private postRepository: IPostRepository) {}

  private mapToDTO(post: PostEntity): PostDTO {
    return {
      id: post.id,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      title: post.title.title,
      content: post.content.content,
      userId: post.userId,
      nickname: post.nickname,
    }
  }

  async detail(postId: string): Promise<PostDTO | null> {
    try {
      const id = Number(postId);

      if (isNaN(id)) {
        throw new Error("ID non valide");
      }

      const post = await this.postRepository.getPostById(id);
      if (!post) {
        return null;
      }
      return this.mapToDTO(post);
    } catch (error) {
      console.error("Erreur lors de la récupération du post:", error);
      throw error; // Laisse la gestion de l'erreur à la route
    }
  }
}