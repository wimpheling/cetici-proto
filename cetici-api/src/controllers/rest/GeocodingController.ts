import { EntityManager } from "@mikro-orm/postgresql";
import { Controller, Inject, ProviderScope, Scope } from "@tsed/di";
import { Em } from "@tsed/mikro-orm";
import { Authenticate } from "@tsed/passport";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Get, Post as PostVerb, Returns, Security } from "@tsed/schema";
import { ReverseGeocodingQueryDto } from "../../dtos/ReverseGeocodingQueryDto";
import { ReverseGeocodingResultDto } from "../../dtos/ReverseGeocodingResultDto";
import { NominatimLocation } from "../../entities/NominatimLocation";
import { Point } from "../../mikroorm/GeographyType";
import { NominatimApiService } from "../../services/NominatimApiService";

@Controller("/geocoding")
@Scope(ProviderScope.SINGLETON)
export class GeocodingController {
  @Em() em: EntityManager;
  @Inject() nominatimApi: NominatimApiService;

  @PostVerb("/reverse")
  @Authenticate("jwt", { session: false })
  @Security("jwt")
  @Returns(200, ReverseGeocodingResultDto)
  async reverseGeocoding(@BodyParams() data: ReverseGeocodingQueryDto) {
    const result: any = await this.nominatimApi.reverseGeoCode(data);
    if (result) {
      // If the place is not mirrored in DB, we cache it now
      const nominatimLocationRepository = this.em.getRepository(NominatimLocation);
      const existingLocation = await nominatimLocationRepository.findOne({ placeId: result.place_id });
      if (!existingLocation) {
        const nominatimLocation = new NominatimLocation({
          placeId: result.place_id,
          location: new Point(parseFloat(result.lat), parseFloat(result.lon)),
          displayName: result.display_name
        });
        await nominatimLocationRepository.persistAndFlush(nominatimLocation);
      }
      // TODO: udpate the nominatimLocation data if needed ?
    }
    return result;
  }

  @Get("/get/:placeId")
  @Authenticate("jwt", { session: false })
  @Security("jwt")
  @Returns(200, NominatimLocation)
  async get(@PathParams("placeId") placeId: number) {
    return this.em.getRepository(NominatimLocation).findOneOrFail({ placeId });
  }
}
