import { callbackify, inspect } from "node:util";
import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapB } from "./command_map.js";
import { CLICommand } from "./state.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description : "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Display and moves to the next map",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays and moves to the previous areas map if it exists",
      callback: commandMapB,
    },
    explore: {
      name: "explore",
      description: "Displays the pokemon in a named location",
      callback: commandExplore
    },
    catch: {
      name: "catch",
      description: "Attempts to catch a named pokemon",
      callback: commandCatch
    },
    inspect: {
      name: "inspect",
      description: "Shows the information of a pokemon that you have caught",
      callback: commandInspect
    },
    pokedex: {
      name: "pokedex",
      description: "Shows all the pokemon you have currently caught",
      callback: commandPokedex
    },
    // can add more commands here
  };
}