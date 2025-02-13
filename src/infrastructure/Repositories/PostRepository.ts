import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PostRepository {
  async createPost(data: { title: string; content: string, userId: number}) {
    return await prisma.post.create({ data });
  }

  async getPostById(postId: number) {
    return await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: {
            nickname: true, // On récupère uniquement le pseudo de l'auteur en plus
          },
        },
      },
    });
  }

  async getAllPosts() {
    return await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async updatePost(postId: number, data: Partial<{ title: string; content: string }>) {
    return await prisma.post.update({
      where: { id: postId },
      data,
    });
  }

  async deletePost(postId: number): Promise<void> {
    await prisma.post.delete({
      where: { id: postId },
    });
  }

  async postExists(postId: number): Promise<{id: number, createdAt: Date, updatedAt: Date, title: string, content: string, userId: number} | null> {
    return await prisma.post.findUnique({
      where: { id: postId },
    });
  }
}
