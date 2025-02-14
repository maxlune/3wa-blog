import {PrismaClient, User} from "@prisma/client";
import { UserEntity } from "../../domain/entities/UserEntity";
import Email from "../../domain/value-objects/users/Email.valueObject";
import Password from "../../domain/value-objects/users/Password.valueObject";

const prisma = new PrismaClient();

export class UserRepository {

  async findAll(): Promise<UserEntity[]> {
    const users = await prisma.user.findMany();

    // TODO: mapping DTO pour ne pas envoyer le mdp
    return users.map(user => new UserEntity(
      user.id,
      user.nickname,
      new Email(user.email),
      new Password(user.password),
      user.isContributor
    ));
  }


  async create(user: UserEntity): Promise<UserEntity> {
    const createdUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email.toString(),
        nickname: user.nickname,
        password: user.password.toString(),
      }
    });

    // TODO: mapping DTO pour ne pas envoyer le mdp
    return new UserEntity(
      createdUser.id,
      createdUser.nickname,
      new Email(createdUser.email),
      new Password(createdUser.password),
      createdUser.isContributor
    );
  }


  async findOne(id: number): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) return null;
    // TODO: mapping DTO pour ne pas envoyer le mdp
    return new UserEntity(
      user.id,
      user.nickname,
      new Email(user.email),
      new Password(user.password),
      user.isContributor
    );
  }


  async findOneWithPosts(id: number): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({
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

    if (!user) return null;
    // TODO: mapping DTO pour ne pas envoyer le mdp
    return new UserEntity(
      user.id,
      user.nickname,
      new Email(user.email),
      new Password(user.password),
      user.isContributor,
    );
  }


  async findOneByEmail(email: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return null;
    // TODO: mapping DTO pour ne pas envoyer le mdp
    return new UserEntity(
      user.id,
      user.nickname,
      new Email(user.email),
      new Password(user.password),
      user.isContributor
    );
  }
}