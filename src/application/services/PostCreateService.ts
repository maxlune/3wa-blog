import {PostRepository} from "../../infrastructure/Repositories/PostRepository";

export class PostCreateService {
  constructor(private postRepository: PostRepository) {}

  create = async (title: string, content: string, userId: number) => {
    if (!title || !content) {
      throw new Error("Le titre et le contenu sont requis.")
    }

    if (!userId) {
      throw new Error("Vous devez être connecté pour créer un article.")
    }

    await this.postRepository.createPost({ title, content, userId })
  }
}