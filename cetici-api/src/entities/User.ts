import { Entity, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { Email } from "@tsed/schema";

@Entity()
export class User {
  constructor(data: Pick<User, "name" | "password" | "email" | "salt">) {
    Object.assign(this, data);
  }

  @PrimaryKey({ type: "uuid", defaultRaw: "uuid_generate_v4()" })
  id!: string;

  @Property()
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
}
