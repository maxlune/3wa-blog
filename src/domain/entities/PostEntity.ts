import {PostTitle} from "../value-objects/posts/PostTitle";
import {PostContent} from "../value-objects/posts/PostContent";

export class PostEntity {
  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public title: PostTitle,
    public content: PostContent,
    public userId: number,
    public nickname?: string,
  ) {}
}
