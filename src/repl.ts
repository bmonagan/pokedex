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