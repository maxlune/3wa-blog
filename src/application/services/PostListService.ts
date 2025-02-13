import {IPostRepository} from "../../domain/repositories-interfaces/IPostRepository";

export class PostListService {
  constructor(private postRepository: IPostRepository) {}

  async list(): Promise<any> {
    try {

      return await this.postRepository.getAllPosts();

    } catch (error) {
      console.error('Erreur lors de la récupération des posts:', error);
      return null;
    }
  }
}