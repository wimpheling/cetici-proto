import { CollectionOf, Property, Required } from "@tsed/schema";

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

export class PostCommentDto {
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
  author!: PostAuthorDto;
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

  @CollectionOf(PostCommentDto)
  @Required()
  comments!: PostCommentDto[];

  @Property()
  liked: boolean;
}

export type FlatPostListingDto = Omit<PostListingDto, "comments" | "author" | "location"> & {
  authorName: string;
  authorId: string;
  displayName: string;
  placeId: number;
};
