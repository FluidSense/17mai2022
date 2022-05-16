// Types
export type Place = {
  name: string;
  lat: number;
  long: number;
  url?: string;
  displayName: string;
};

export type PlaceDTO = {
  name: string;
  lat: string;
  long: string;
  url: string;
  description: string;
  displayName: string;
};

// Constructors
export function placeFromDTO({
  name,
  lat,
  long,
  url,
  description,
  displayName,
}: PlaceDTO): Place {
  return {
    name,
    lat: Number(lat),
    long: Number(long),
    url: !!url ? url : undefined,
    displayName: displayName || description,
  };
}
// Helpers
export const isPlace = (obj: any): obj is Place =>
  !!obj.name && !!obj.lat && !!obj.long;

export const getPlaceFromPlaceName = (
  places: Place[],
  placeName: string
): Place | undefined => places.find((place) => place.name == placeName);
