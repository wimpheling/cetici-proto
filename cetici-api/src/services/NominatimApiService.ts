import { ReverseGeocodingQueryDto } from "../dtos/ReverseGeocodingQueryDto";
import got from "got";
import { Injectable } from "@tsed/di";

@Injectable()
export class NominatimApiService {
  async reverseGeoCode(data: ReverseGeocodingQueryDto) {
    return got(`https://nominatim.openstreetmap.org/reverse?lat=${data.latitude}&lon=${data.longitude}&format=json`).json();
  }
}
