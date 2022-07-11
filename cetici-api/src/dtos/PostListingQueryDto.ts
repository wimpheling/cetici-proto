import { Property } from "@tsed/schema";
import { Point } from "../mikroorm/GeographyType";

export class PostListingQueryDto {
  @Property()
  location: Point;
}
