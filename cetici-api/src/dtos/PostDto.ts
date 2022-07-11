import { Property } from "@tsed/schema";

export class PostDto {
  @Property()
  content!: string;

  @Property()
  nominatimLocationId!: number;
}
