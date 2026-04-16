import { createInterface, type Interface } from "readline";
import { getCommands } from "./command_register.js";
import { PokeAPI } from "./pokeapi.js";


export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    readline: Interface;
    commands: Record <string, CLICommand>;
    pokeapi: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
};

export function initState(): State {
    const readline = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "> "
    });
    const commands = getCommands();
    const pokeapi = new PokeAPI();
    return {readline: readline, commands: commands, pokeapi: pokeapi, nextLocationsURL: null, prevLocationsURL: null};
}