import { Property, Required } from "@tsed/schema";

export class ReverseGeocodingResultDto {
  @Property()
  @Required()
  place_id: number;

  @Property()
  @Required()
  display_name: string;

  @Property()
  @Required()
  lat: string;

  @Property()
  @Required()
  lon: string;

  @Property()
  @Required()
  osm_type: string;

  @Property()
  @Required()
  osm_id: string;

  //   @Property()
  //   bounding_box: number[];
}
