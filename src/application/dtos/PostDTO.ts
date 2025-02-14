import {PostEntity} from "../../domain/entities/PostEntity";

export class PostDTO {
  constructor(
    readonly id: number,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly title: string,
    readonly content: string,
    readonly userId: number,
    readonly nickname?: string,
  ) {}

  static fromEntity(post: PostEntity): PostDTO {
    return new PostDTO(
      post.id,
      post.createdAt,
      post.updatedAt,
      post.title.title,
      post.content.content,
      post.userId,
      post.nickname
    );
  }
}