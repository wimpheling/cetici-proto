import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Property as SchemaProperty, Required } from "@tsed/schema";
import { User } from "./User";
import { NominatimLocation } from "./NominatimLocation";

@Entity()
export class Post {
  constructor(data: Pick<Post, "location" | "content" | "author">) {
    Object.assign(this, data);
  }

  @PrimaryKey({ type: "uuid", defaultRaw: "uuid_generate_v4()" })
  @SchemaProperty()
  id!: string;

  @Property()
  @SchemaProperty()
  @Required()
  content!: string;

  @ManyToOne()
  @SchemaProperty()
  @Required()
  location!: NominatimLocation;

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
  author: User;
}
