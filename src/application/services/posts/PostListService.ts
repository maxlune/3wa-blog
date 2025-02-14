import {IPostRepository} from "../../../domain/repositories-interfaces/IPostRepository";
import {PostEntity} from "../../../domain/entities/PostEntity";
import {PostDTO} from "../../dtos/PostDTO";

export class PostListService {
  constructor(private postRepository: IPostRepository) {}

  private mapToDTO(post: PostEntity): PostDTO {
    return {
      id: post.id,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      title: post.title.title,
      content: post.content.content,
      userId: post.userId,
    }
  }

  async list(): Promise<PostDTO[] | null> {
    try {

      const posts: PostEntity[] = await this.postRepository.getAllPosts();
      return posts.map(this.mapToDTO)
    } catch (error) {
      console.error('Erreur lors de la récupération des posts:', error);
      return null;
    }
  }
}