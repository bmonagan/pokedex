import { State } from "./state.js"
import { PokeAPI } from "./pokeapi.js"
import { StatementSync } from "node:sqlite"

export async function commandMap(state: State) {
    const locations = await state.pokeapi.fetchLocations(state.nextLocationsURL);
    for (let location of locations.results) {
        console.log(location.name);
    }
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;

}