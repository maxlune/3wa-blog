import {PostRepository} from "../../../infrastructure/Repositories/PostRepository";
import {PostEntity} from "../../../domain/entities/PostEntity";

export class PostUpdateService {
  constructor(private postRepository: PostRepository) {}

  update = async(title: string, content: string, postId: number) => {
    const postExists = await this.postRepository.postExists(postId);
    // if (title === undefined && content === undefined) {
    //   throw new Error("Au moins un des champs 'title' ou 'content' est requis pour la mise à jour.")
    // }

    if (!postExists) {
      throw new Error("Post non trouvé");
    }

    await this.postRepository.updatePost(postId, { title, content })

    return this.postRepository.getPostById(postId);
  }

  getPostById = async(id: number): Promise<PostEntity | null> => {
    return await this.postRepository.getPostById(id);
  }
}