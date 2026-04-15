import { getCommands } from "./cli_commands.js";
export function commandHelp() {
    console.log("Welcome to the Pokedex");
    console.log("Usage:");
    console.log("\n");
    const commands = getCommands();
    for (const [name, cmd] of Object.entries(commands)) {
        console.log(name, ":", cmd.description);
}
}