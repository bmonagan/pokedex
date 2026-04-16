import { State } from "./state.js";
import { Location, Location_endpoint, Pokemon } from "./pokeapi.js";    
export async function commandExplore(state: State, areaName: string) {
    const location: Location_endpoint = await state.pokeapi.fetchLocation(areaName);
    if (location.pokemon_encounters.length < 1){
        console.log("No pokemon were found in this area.");
    }
    else {
        const names = location.pokemon_encounters.map((e) => e.pokemon.name);
        for (const name in names) {
            console.log(name);
        }
    }
}