import { createInterface } from "node:readline";
import { getCommands } from "./command_register.js";

export function cleanInput(input: string): string[] {
    let arr: string[] = input.split(" ");
    let cleaned_arr: string[] = [];
    for (let part of arr){
        if (part.length >= 1){
            let cleaned_part = part.toLowerCase();
            cleaned_arr.push(cleaned_part);
        }
    }
    return cleaned_arr;
}

export function startREPL(){
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "> "
    });
    console.log("Pokedex started.");
    rl.prompt(); 

    rl.on("line", (line) => {
        const tokens = cleanInput(line);
        const commandName = tokens[0]; // first word is the command
        
        const commands = getCommands();
        const cmd = commands[commandName];
        
        if (cmd) {
            cmd.callback(commands);
        } else {
            console.log("unknown command:", commandName);
        }
        
        rl.prompt();
    });

    rl.on("close", () => {
        console.log("goodbye");
    });
}