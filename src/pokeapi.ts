import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private static readonly baseLocationURL = "https://pokeapi.co/api/v2/location-area/";
  private static readonly locationEndpointURL = "https://pokeapi.co/api/v2/location-area/";
  public readonly pokemonEndpointURL = "https://pokeapi.co/api/v2/pokemon/";
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
    
  async fetchLocation(locationName: string): Promise<Location_endpoint> {
    const combined_url = PokeAPI.locationEndpointURL + locationName;
    const cachedLocationEndpoint = this.cache.get<Location_endpoint>(combined_url);
    if (cachedLocationEndpoint) {
      return cachedLocationEndpoint;
    }

    const response = await fetch(combined_url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch location endpoint: ${response.status} ${response.statusText}`,
      );
    }

    const locationEndpoint: Location_endpoint = await response.json();
    this.cache.add(combined_url, locationEndpoint);
    return locationEndpoint;
  }
}

export type ShallowLocations = {
  count: number
  next: null | string
  previous: null | string
  results: Location[]

};

export type Location_endpoint = {
  id: number
  name: string
  game_index: number
  encounter_method_rates: EncounterMethodRate[]
  location: Location
  names: Name[]
  pokemon_encounters: PokemonEncounter[]
};

export interface EncounterMethodRate {
  encounter_method: EncounterMethod
  version_details: VersionDetail[]
}

export interface EncounterMethod {
  name: string
  url: string
}

export interface VersionDetail {
  rate: number
  version: Version
}

export interface Version {
  name: string
  url: string
}

export interface Location {
  name: string
  url: string
}

export interface Name {
  name: string
  language: Language
}

export interface Language {
  name: string
  url: string
}

export interface PokemonEncounter {
  pokemon: Pokemon
  version_details: VersionDetail2[]
}

export interface Pokemon {
  name: string
  url: string
}

export interface VersionDetail2 {
  version: Version2
  max_chance: number
  encounter_details: EncounterDetail[]
}

export interface Version2 {
  name: string
  url: string
}

export interface EncounterDetail {
  min_level: number
  max_level: number
  condition_values: any[]
  chance: number
  method: Method
}

export interface Method {
  name: string
  url: string
}
