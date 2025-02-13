import {PrismaClient} from "@prisma/client";

// const prisma = new PrismaClient();
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "file:./models/prisma/schema.prisma", 
    },
  },
});

export class UserRepository {
  async findAll() {
    return prisma.user.findMany();
  }

  async create(email: string, nickname: string, password: string, isContributor: boolean) {
    return prisma.user.create({
      data: {
        email,
        nickname,
        password,
        isContributor,
      }
    });
  }

  async findOne(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }

  async findOneWithPosts(id: number) {
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

  async findOneByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async delete(id: number): Promise<void> {
    prisma.user.delete({ where: { id } });
  }
}