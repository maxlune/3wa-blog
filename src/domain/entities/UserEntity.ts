import Email from "../value-objects/users/Email.valueObject";
import Password from "../value-objects/users/Password.valueObject";

export class UserEntity {
    constructor(
        public id: number,
        public nickname: string,
        public email: Email,
        public password: Password,
        public isContributor: boolean,
    ) {}
}