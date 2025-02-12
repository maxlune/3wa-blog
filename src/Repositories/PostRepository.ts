import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PostRepository {
  static async createPost(data: { title: string; content: string }) {
    return await prisma.post.create({ data });
  }

  static async getPostById(postId: number) {
    return await prisma.post.findUnique({
      where: { id: postId },
    });
  }

  static async getAllPosts() {
    return await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async updatePost(postId: number, data: Partial<{ title: string; content: string }>) {
    return await prisma.post.update({
      where: { id: postId },
      data,
    });
  }

  static async deletePost(postId: number) {
    return await prisma.post.delete({
      where: { id: postId },
    });
  }

  static async postExists(postId: number) {
    return await prisma.post.findUnique({
      where: { id: postId },
    });
  }
}
