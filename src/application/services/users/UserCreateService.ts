import { IUserRepository } from "../../../domain/repositories-interfaces/IUserRepository";
import bcrypt from "bcrypt";

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

    return await this.userRepository.create(
      email,
      nickname,
      hashedPassword,
      isContributorBoolean
    );
  }
}