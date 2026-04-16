import { State } from "./state.js";

export async function commandInspect(state: State, pokemonName: string):Promise<void> {
    const pokemon_record = state.pokedex[pokemonName];
    if (pokemon_record) {
        console.log(`Name: ${pokemon_record.name}`);
        console.log(`Height: ${pokemon_record.height}`);
        console.log(`Weight: ${pokemon_record.weight}`);
        console.log("Stats:");
        for (const stat of pokemon_record.stats) {
            console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
        }
        console.log("Types:");
        for (const type of pokemon_record.types) {
            console.log(`  - ${type.type.name}`);
        }
    }
    else {
        console.log("you have not caught that pokemon");
    }
}

