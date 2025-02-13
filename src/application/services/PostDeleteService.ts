import {IPostRepository} from "../../domain/repositories-interfaces/IPostRepository";

export class PostDeleteService {
  constructor(private postRepository: IPostRepository) {}

  async delete(postId: number) {
      const postExists = await this.postRepository.postExists(postId);

      if (!postExists) {
        throw new Error("Post non trouvé")
      }
      await this.postRepository.deletePost(postId);
  }
}