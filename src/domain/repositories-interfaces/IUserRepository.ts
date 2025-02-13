import {User} from "@prisma/client";

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User | null>;
  delete(id: number): Promise<void>;
  findOneByEmail(email: string): Promise<User | null>;
  findOneWithPosts(id: number): Promise<User | null>;
  create(email: string, nickname: string, password: string, isContributor: boolean): Promise<User>;
}