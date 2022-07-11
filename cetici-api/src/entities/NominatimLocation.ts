import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Property as SchemaProperty, Required } from "@tsed/schema";
import { Point, PointType } from "../mikroorm/GeographyType";
import { Post } from "./Post";

@Entity()
export class NominatimLocation {
  constructor(data: Pick<NominatimLocation, "placeId" | "displayName" | "location">) {
    Object.assign(this, data);
  }

  @SchemaProperty()
  @Required()
  @PrimaryKey()
  placeId: number;

  @SchemaProperty()
  @Property()
  @Required()
  displayName: string;

  @Property({ type: PointType })
  @SchemaProperty()
  @Required()
  location!: Point;

  @ManyToOne()
  @SchemaProperty()
  lastUpdatedPost?: Post;
}
