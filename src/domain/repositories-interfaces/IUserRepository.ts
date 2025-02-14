import { UserEntity } from "../entities/UserEntity";

export interface IUserRepository {
  findAll(): Promise<UserEntity[]>;
  findOne(id: number): Promise<UserEntity | null>;
  findOneByEmail(email: string): Promise<UserEntity | null>;
  findOneWithPosts(id: number): Promise<UserEntity | null>;
  create(user: UserEntity): Promise<UserEntity>;
}