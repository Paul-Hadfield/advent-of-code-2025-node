import * as fs from "fs";
import { performance } from "perf_hooks";

function isReachable(x: number, y: number, cellsMap: Map<string, "@" | ".">) {
    let blockedNeighbors = 0;
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue; // Skip the cell itself
            const neighborKey = `${x + dx},${y + dy}`;
            if (cellsMap.get(neighborKey) === "@") {
                blockedNeighbors++;
            }
        }
    }

    return blockedNeighbors < 4;
}

const start = performance.now();

const lines = fs.readFileSync("./data.txt", "utf8").trim().split("\n");

type Cell = {
    x: number;
    y: number;
    type: "@" | ".";
}

const cellsArray = new Array<Cell>();
const cellsMap = new Map<string, "@" | ".">();

lines.forEach((line, y) => { 
    line.split("").forEach((char, x) => { 
        cellsArray.push({ x, y, type: char === "@" ? "@" : "." });
        cellsMap.set(`${x},${y}`, char === "@" ? "@" : ".");
    });
});

let runningTotal = 0;
cellsArray.forEach(cell => {
    if (cell.type === "@") {
        if(isReachable(cell.x, cell.y, cellsMap)) {
            runningTotal++;
        }   
    }
});
    
console.log(runningTotal);

const durationMs = performance.now() - start;
console.log(`Execution time: ${durationMs.toFixed(3)}ms`);

