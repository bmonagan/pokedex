import { State } from "./state.js";
import type { caughtPokemon } from "./caught_pokemon.js";
export async function commandCatch(state: State, pokemonName: string): Promise<void> {
    const response = await fetch(state.pokeapi.pokemonEndpointURL + pokemonName);
    if (!response.ok) {
        console.log("Pokemon not found..");
    }
    else {
        const pokemon:caughtPokemon = await response.json();
        console.log(`Throwing a Pokeball at ${pokemonName}`);
        if (await isCaught(pokemon.base_experience)) { 
            console.log(`${pokemonName} was caught!`);
            state.pokedex.set(pokemon.name, pokemon);
        }
        else {
            console.log(`${pokemonName} escaped!`);
        }

    }
}

async function isCaught(base_experience: number): Promise<boolean> {
    const catch_chance = base_experience/300;
    const user_roll = Math.random();
    return user_roll > catch_chance;
}