import { createInterface } from "node:readline";

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
    console.log("Activating....");
    console.log("Ready.");
    rl.prompt(); // show prompt first

    rl.on("line", (line) => {
        const tokens = cleanInput(line);

        if (tokens.length === 0){
            rl.prompt();
            rl.close();
            return;
        }

        if (line === "exit") {
            rl.close();
            return;
        }
        console.log(`Your command was: ${tokens[0]}`);

        rl.prompt(); // show prompt again for next input
    });

    rl.on("close", () => {
        console.log("goodbye");
    });
}