import * as fs from "fs";
import { performance } from "perf_hooks";

const start = performance.now();

const MAX_POSITION = 99;

export function turnRight(startingPosition: number, clicks: number): number {
    
    const finalTurn = clicks % (MAX_POSITION + 1);

    const newValue = startingPosition + finalTurn;
    if (newValue < MAX_POSITION) {
        return newValue;
    }

    return newValue - MAX_POSITION - 1;
}

export function turnLeft(startingPosition: number, clicks: number): number {

    const finalTurn = clicks % (MAX_POSITION + 1);

    const newValue = startingPosition - finalTurn;
    if (newValue >= 0) {
        return newValue;
    }

    return MAX_POSITION + newValue + 1;
}

export function parseInstruction(instruction: string): { direction: 'R' | 'L', clicks: number } {
    const direction = instruction.charAt(0) as 'R' | 'L';
    const clicks = parseInt(instruction.slice(1), 10);

    return { direction, clicks };
}   

export function turn(startingPosition: number, instruction: string): number {
    const parsed = parseInstruction(instruction);
    console.log(`Turning from ${startingPosition} to the ${parsed.direction} by ${parsed.clicks} clicks.`);
    return (parsed.direction === 'R') ?
        turnRight(startingPosition, parsed.clicks) :
        turnLeft(startingPosition, parsed.clicks);
}

const lines = fs.readFileSync("./data.txt", "utf8").trim().split("\n");

let value = 50;
let password = 0;

lines.forEach(line => {
    value = turn(value, line);
    if (value === 0) { password++; }
});

console.log(`Password is ${password}`);

const durationMs = performance.now() - start;
console.log(`Execution time: ${durationMs.toFixed(3)}ms`);
