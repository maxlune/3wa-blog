import {PostTitle} from "../value-objects/posts/PostTitle";

export class PostEntity {
  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public title: PostTitle,
    public content: string,
    public userId: number,
  ) {}
}
