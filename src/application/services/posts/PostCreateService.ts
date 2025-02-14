import {PostRepository} from "../../../infrastructure/Repositories/PostRepository";
import {PostEntity} from "../../../domain/entities/PostEntity";
import {PostDTO} from "../../dtos/PostDTO";

export class PostCreateService {
  constructor(private postRepository: PostRepository) {}

  private mapToDTO(post: any): PostDTO {
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

  create = async (title: string, content: string, userId: number) => {
    if (!title || !content) {
      throw new Error("Le titre et le contenu sont requis.")
    }

    if (!userId) {
      throw new Error("Vous devez être connecté pour créer un article.")
    }

    const post = await this.postRepository.createPost({ title, content, userId })
    return this.mapToDTO(post);
  }
}