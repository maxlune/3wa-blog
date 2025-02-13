// import {PostRepository} from "../../infrastructure/Repositories/PostRepository";
//
// export class PostUpdateService {
//   constructor(private postRepository: PostRepository) {}
//
//   update = async(title: string, content: string, postId: number) => {
//     const postExists = await this.postRepository.postExists(postId);
//
//     if (!postExists) {
//       throw new Error("Post non trouvé");
//     }
// }
// }