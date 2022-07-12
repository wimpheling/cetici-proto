import { Property } from "@tsed/schema";

export class CommentPostQueryDto {
  @Property()
  content: string;
}
