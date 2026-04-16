import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private static readonly baseLocationURL = "https://pokeapi.co/api/v2/location-area/";
  private cache: Cache;

  constructor(cacheIntervalMs: number = 60_000) {
    this.cache = new Cache(cacheIntervalMs);
  }

  async fetchLocations(pageURL?: string | null): Promise<ShallowLocations> {
    const url = pageURL ?? PokeAPI.baseLocationURL;
    const cachedLocations = this.cache.get<ShallowLocations>(url);
    if (cachedLocations) {
      return cachedLocations;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.status} ${response.statusText}`);
    }

    const locations: ShallowLocations = await response.json();
    this.cache.add(url, locations);
    return locations;
  }
    //TODO: IMPLEMENT
//   async fetchLocation(locationName: string): Promise<Location> {
//     // implement this
//   }
}

export type ShallowLocations = {
  count: number
  next: null | string
  previous: null | string
  results: Location[]

};

export type Location = {
  name: string
  url: string
};