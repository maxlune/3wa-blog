export class PostDTO {
  constructor(
    readonly id: number,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly title: string,
    readonly content: string,
    readonly userId: number,
    readonly nickname: string,
  ) {}
}