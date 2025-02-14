import {UserEntity} from "../../domain/entities/UserEntity";

export class UserDTO {
    constructor(
        public id: number,
        public nickname: string,
        public email: string,
        public isContributor: boolean,
    ) {}

    static fromEntity(user: UserEntity): UserDTO {
        return new UserDTO(user.id, user.nickname, user.email.toString(), user.isContributor);
    }
}