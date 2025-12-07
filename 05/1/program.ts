import * as fs from "fs";
import { performance } from "perf_hooks";

const start = performance.now();

const lines = fs.readFileSync("./data.txt", "utf8").trim().split("\n");

let processingRange = true;
const ranges: Array<{ start: number; end: number }> = [];
const items: number[] = [];

lines.forEach((line) => { 
    if (line === "") {
        processingRange = false;
        return;
    }

    if (processingRange) { 
        const [startStr, endStr] = line.split("-");
        ranges.push({ start: parseInt(startStr, 10), end: parseInt(endStr, 10) });
    } else {
        items.push(parseInt(line, 10));
    }
});

let count = 0;
items.forEach((line) => {
    for (const range of ranges) {
        if (line >= range.start && line <= range.end) {
            count++;
            break;
        }
    }
});

console.log(count);

const durationMs = performance.now() - start;
console.log(`Execution time: ${durationMs.toFixed(3)}ms`);
