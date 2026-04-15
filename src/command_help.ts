import { getCommands } from "./command_register.js";
export function commandHelp() {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:\n");
    const commands = getCommands();
    for (const [name, cmd] of Object.entries(commands)) {
        console.log(name, ":", cmd.description);
}
}