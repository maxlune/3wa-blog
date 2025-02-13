import {IPostRepository} from "../../../domain/repositories-interfaces/IPostRepository";

export class PostDetailController {
  constructor(private postRepository: IPostRepository) {}

  async detail(postId: string): Promise<any | null> {
    try {
      const id = Number(postId);

      if (isNaN(id)) {
        throw new Error("ID non valide");
      }

      // console.log(await PostRepository.getPostById(id));

      return await this.postRepository.getPostById(id);
    } catch (error) {
      console.error("Erreur lors de la récupération du post:", error);
      throw error; // Laisse la gestion de l'erreur à la route
    }
  }
}
