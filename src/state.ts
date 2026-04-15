import { createInterface, type Interface } from "readline";
import { getCommands } from "./command_register.js";
import { PokeAPI } from "./pokeapi.js";


export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export type State = {
    readline: Interface;
    commands: Record <string, CLICommand>;
    pokeapi: PokeAPI;
    nextLocationsURL: string;
    prevLocationsURL: string;
};

export function initState(): State {
    const readline = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "> "
    });
    const commands = getCommands();
    return {readline: readline, commands: commands};
}