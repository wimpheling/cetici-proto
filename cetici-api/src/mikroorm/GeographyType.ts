import { Type } from "@mikro-orm/core";
import { Property } from "@tsed/schema";

export class Point {
  @Property()
  latitude: number;
  @Property()
  longitude: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

export function convertToJSValue(value: string | undefined): Point | undefined {
  const m = value?.match(/point\((-?\d+(\.\d+)?) (-?\d+(\.\d+)?)\)/i);

  if (!m) {
    return undefined;
  }

  return new Point(+m[1], +m[3]);
}

export class PointType extends Type<Point | undefined, string | undefined> {
  convertToDatabaseValue(value: Point | undefined): string | undefined {
    if (!value) {
      return value;
    }

    return `point(${value.longitude} ${value.latitude})`;
  }

  convertToJSValue(value: string | undefined): Point | undefined {
    return convertToJSValue(value);
  }

  convertToJSValueSQL(key: string) {
    return `ST_AsText(${key})`;
  }

  convertToDatabaseValueSQL(key: string) {
    return `ST_PointFromText(${key})`;
  }

  getColumnType(): string {
    return "GEOGRAPHY(point)";
  }
}
