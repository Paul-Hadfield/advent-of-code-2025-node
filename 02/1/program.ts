import * as fs from "fs";
import { performance } from "perf_hooks";

const start = performance.now();

function isInvalid(value: number): boolean {
    const str = value.toString();
    const len = str.length;
    if (len % 2 !== 0)
        return false; {
    }

    const leftPart = str.slice(0, len / 2);
    const rightPart = str.slice(len / 2);
    return leftPart === rightPart;
}

function getMinMax(part: string): { min: number, max: number }{
    const parts = part.split("-").map(Number);
    return { min: Math.min(...parts), max: Math.max(...parts) };
}

const parts = fs.readFileSync("./example.txt", "utf8").trim().split(",");
let sum = 0;

parts.forEach(part => {
    console.log(part);
    const range = getMinMax(part);
    for (let i = range.min; i <= range.max; i++) {
        if(isInvalid(i)) {
            sum = sum + i;
        }
    }
});
    
console.log(`Sum of invalid numbers: ${sum}`);

const durationMs = performance.now() - start;
console.log(`Execution time: ${durationMs.toFixed(3)}ms`);

