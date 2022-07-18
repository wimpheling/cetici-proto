import { Entity, ManyToOne, PrimaryKeyType, Property } from "@mikro-orm/core";
import { Required } from "@tsed/schema";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
export class Like {
  constructor(data: Pick<Like, "user" | "post">) {
    Object.assign(this, data);
  }

  @ManyToOne({ primary: true })
  @Required()
  post: Post;

  @ManyToOne({ primary: true })
  @Required()
  user: User;

  @Property()
  @Required()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  @Required()
  updatedAt = new Date();

  [PrimaryKeyType]: [string, string];
}
