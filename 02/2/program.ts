import * as fs from "fs";
import { performance } from "perf_hooks";

const start = performance.now();

function chunkString(str: string, size: number): string[] {
  const chunks = [];
  for (let i = 0; i < str.length; i += size) {
    chunks.push(str.slice(i, i + size));
  }
  return chunks;
}

function chunkRepeats(str: string, i: number): boolean {
    if(str.length % i !== 0) {
        return false;
    }
    const parts = chunkString(str, i);

    for(let j = 1; j < parts.length; j++) {
        if(parts[j] !== parts[0]) {
            return false;
        }
    }

    return true;
}


function isInvalid(value: number): boolean {
    const str = value.toString();
    const len = str.length;

    for (let i = Math.floor(len / 2); i >= 1; i--) {
        if (chunkRepeats(str, i)) {
            return true;
        }
    }

    return false;
}

function getMinMax(part: string): { min: number, max: number }{
    const parts = part.split("-").map(Number);
    return { min: Math.min(...parts), max: Math.max(...parts) };
}

const parts = fs.readFileSync("./data.txt", "utf8").trim().split(",");
let sum = 0;

parts.forEach(part => {
    console.log(part);
    const range = getMinMax(part);
    for (let i = range.min; i <= range.max; i++) {
        if (isInvalid(i)) {
            sum = sum + i;
        }
    }
});
    
console.log(`Sum of invalid numbers: ${sum}`);

const durationMs = performance.now() - start;
console.log(`Execution time: ${durationMs.toFixed(3)}ms`);


