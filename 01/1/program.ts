import * as fs from "fs";
import { performance } from "perf_hooks";

const start = performance.now();

const MAX_POSITION = 99;

export function turnRight(startingPosition: number, clicks: number): number {
    const newValue = startingPosition + clicks;
    if (newValue < MAX_POSITION) {
        return newValue;
    }

    const updatedPosition = newValue - MAX_POSITION - 1;
    if (updatedPosition > MAX_POSITION) {
        throw new Error('Something went wrong');
    }

    return updatedPosition;
}

export function turnLeft(startingPosition: number, clicks: number): number {
    const newValue = startingPosition - clicks;
    if (newValue >= 0) {
        return newValue;
    }

    const updatedPosition = MAX_POSITION + newValue + 1;
    if (updatedPosition < 0){
        throw new Error('Something went wrong');
    }

    return updatedPosition; 
}

export function parseInstruction(instruction: string): { direction: 'R' | 'L', clicks: number } {
    const direction = instruction.charAt(0) as 'R' | 'L';
    const clicks = parseInt(instruction.slice(1), 10);

    return { direction, clicks };
}   

export function turn(startingPosition: number, instruction: string): number {
    const parsed = parseInstruction(instruction);

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
