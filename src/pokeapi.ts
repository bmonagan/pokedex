import { json } from "node:stream/consumers";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private static readonly baseLocationURL = "https://pokeapi.co/api/v2/location-area/"

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? PokeAPI.baseLocationURL;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.status} ${response.statusText}`);
    }

    const locations: ShallowLocations = await response.json();
    return locations;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    // implement this
  }
}

export type ShallowLocations = {
  count: number
  next: null | string
  previous: null | string
  results: location[]

};

export type Location = {
  // add properties here
};