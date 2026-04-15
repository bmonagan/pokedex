import { State } from "./state.js";
export async function commandHelp(state: State) {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:\n");
    const commands = state.commands;
    for (const [name, cmd] of Object.entries(commands)) {
        console.log(`${name}:`, cmd.description);
}
}