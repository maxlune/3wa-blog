import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {
  static async findAll() {
    return prisma.user.findMany();
  }

  static async create(email: string, nickname: string, password: string, isContributor: boolean) {
    return prisma.user.create({
      data: {
        email,
        nickname,
        password,
        isContributor,
      },
    });
  }

  static async findOne(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }

  static async findOneWithPosts(id: number) {
    return await prisma.user.findUnique({
      where: { id: id },
      include: {
        posts: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            createdAt: true,
          },
        },
      },
    });
  }
  

  static async findOneByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  static async delete(id: number) {
    return prisma.user.delete({ where: { id } });
  }
}
