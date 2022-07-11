import { Property } from "@tsed/schema";

export class ReverseGeocodingQueryDto {
  @Property()
  longitude: number;

  @Property()
  latitude: number;
}
