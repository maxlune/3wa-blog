export class UserDTO {
    constructor(
        public id: number,
        public nickname: string,
        public email: string,
        // public password: Password, // On renvoi pas le mdp
        public isContributor: boolean,
        // public createdAt: Date = new Date(),
        // public updatedAt: Date = new Date(),
    ) {}
}