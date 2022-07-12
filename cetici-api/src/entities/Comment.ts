import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Property as SchemaProperty, Required } from "@tsed/schema";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Comment {
  constructor(data: Pick<Comment, "content" | "author" | "parentPost" | "parentComment">) {
    Object.assign(this, data);
  }

  @PrimaryKey({ type: "uuid", defaultRaw: "uuid_generate_v4()" })
  @SchemaProperty()
  id!: string;

  @Property()
  @SchemaProperty()
  @Required()
  content!: string;

  @Property()
  @SchemaProperty()
  @Required()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  @SchemaProperty()
  @Required()
  updatedAt = new Date();

  @ManyToOne()
  @SchemaProperty()
  @Required()
  author: User;

  @ManyToOne()
  @SchemaProperty()
  parentPost?: Post;

  @ManyToOne()
  @SchemaProperty()
  parentComment?: Comment;
}
