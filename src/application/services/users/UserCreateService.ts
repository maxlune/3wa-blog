import { UserEntity } from "../../../domain/entities/UserEntity";
import { IUserRepository } from "../../../domain/repositories-interfaces/IUserRepository";
import bcrypt from "bcrypt";
import Email from "../../../domain/value-objects/users/Email.valueObject";
import Password from "../../../domain/value-objects/users/Password.valueObject";

export class UserCreateService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(data: {
    email: string;
    nickname: string;
    password: string;
    passwordCheck: string;
    isContributor: string;
  }) {
    const { email, nickname, password, passwordCheck, isContributor } = data;

    if (password !== passwordCheck) {
      throw new Error("Les mots de passe ne correspondent pas.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const isContributorBoolean = isContributor === "true"; // Conversion en boolean

    // TODO: id number -> string uuid4
    // TODO: DTO pour ne pas renvoyer le mdp
    const userEntity = new UserEntity(
      Math.floor(Math.random() * 2_147_483_647), // random int 32 bits
      nickname,
      new Email(email),
      new Password(hashedPassword),
      isContributorBoolean
    );

    return await this.userRepository.create(userEntity);
  }
}