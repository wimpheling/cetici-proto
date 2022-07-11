import { Collection, Entity, OneToMany, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { Email, Property as SchemaProperty } from "@tsed/schema";
import { Post } from "./Post";

@Entity()
export class User {
  constructor(data: Pick<User, "name" | "password" | "email" | "salt">) {
    Object.assign(this, data);
  }

  @PrimaryKey({ type: "uuid", defaultRaw: "uuid_generate_v4()" })
  @SchemaProperty()
  id!: string;

  @Property()
  @SchemaProperty()
  name!: string;

  @Property()
  password!: string;

  @Property()
  salt!: string;

  @Property()
  @Email()
  @Unique()
  email!: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @OneToMany(() => Post, (post) => post.author)
  posts = new Collection<Post>(this);
}
