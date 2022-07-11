import { Property, Required } from "@tsed/schema";

export class PostLocationDto {
  @Property()
  @Required()
  displayName: string;

  @Property()
  @Required()
  placeId: number;
}

export class PostAuthorDto {
  @Property()
  name: string;
  @Property()
  id: string;
}

export class PostListingDto {
  @Property()
  @Required()
  id!: string;

  @Property()
  @Required()
  createdAt: Date;

  @Property()
  @Required()
  content!: string;

  @Property()
  @Required()
  distance!: number;

  @Property()
  @Required()
  author!: PostAuthorDto;

  @Property()
  @Required()
  location!: PostLocationDto;
}
