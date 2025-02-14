import {PrismaClient} from "@prisma/client";
import {PostEntity} from "../../domain/entities/PostEntity";
import {PostTitle} from "../../domain/value-objects/posts/PostTitle";
import {PostContent} from "../../domain/value-objects/posts/PostContent";

const prisma = new PrismaClient();

export class PostRepository {
  async createPost(data: { title: string; content: string, userId: number}): Promise<any> {
    const posts = await prisma.post.create({ data });
    const postNickname = this.findOneWithUser(data.userId)
    // return new PostEntity(
    //   posts.id,
    //   posts.createdAt,
    //   posts.updatedAt,
    //   new PostTitle(posts.title),
    //   new PostContent(posts.content),
    //   posts.userId,
    // );
    return {
      id: posts.id,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      title: new PostTitle(posts.title),
      content: new PostContent(posts.content),
      userId: posts.userId,
      nickname: postNickname,
    }
  }

  async findOneWithUser(id: number) {
    return await prisma.post.findUnique({
      where: { id: id },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
          }
        }
      }
    })
  }

  async getPostById(postId: number) {
    const posts = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: {
            nickname: true, // On récupère uniquement le pseudo de l'auteur en plus
          },
        },
      },
    });
    if (!posts) return null;
    // return new PostEntity(
    //   posts.id,
    //   posts.createdAt,
    //   posts.updatedAt,
    //   new PostTitle(posts.title),
    //   new PostContent(posts.content),
    //   posts.userId
    // );
    return {
        id: posts.id,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        title: new PostTitle(posts.title),
        content: new PostContent(posts.content),
        userId: posts.userId,
        nickname: posts.user.nickname,
    }
  }

  async getAllPosts(): Promise<PostEntity[]> {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts.map(post => new PostEntity(
      post.id,
      post.createdAt,
      post.updatedAt,
      new PostTitle(post.title),
      new PostContent(post.content),
      post.userId
    ));
  }

  async updatePost(postId: number, data: Partial<{ title: string; content: string }>) {
    const post = await prisma.post.update({
      where: { id: postId },
      data,
    });
    return new PostEntity(
      post.id,
      post.createdAt,
      post.updatedAt,
      new PostTitle(post.title),
      new PostContent(post.content),
      post.userId
    );
  }

  async deletePost(postId: number): Promise<void> {
    await prisma.post.delete({
      where: { id: postId },
    });
  }

  async postExists(postId: number): Promise<PostEntity | null> {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) return null;
    return new PostEntity(
      post.id,
      post.createdAt,
      post.updatedAt,
      new PostTitle(post.title),
      new PostContent(post.content),
      post.userId
    );
  }
}
