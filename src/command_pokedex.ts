import { State } from "./state.js";

export async function commandPokedex(state:State): Promise<void> {
    const pokedex = state.pokedex;
    console.log("Your Pokedex:");
    for (const [name] of Object.entries(pokedex)) {
        console.log(`- ${name}`);
    }
}