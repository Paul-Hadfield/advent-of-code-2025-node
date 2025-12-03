import * as fs from "fs";
import { performance } from "perf_hooks";

const start = performance.now();

const MAX_POSITION = 99;

type ReturnType = {
    newPosition: number;
    zeroSeenTimes: number;
}
export function turnRight(startingPosition: number, clicks: number): ReturnType {
    
    const finalTurn = clicks % (MAX_POSITION + 1);
    const fullTurns = Math.floor(clicks / (MAX_POSITION + 1));
    const newValue = finalTurn === 0 ? startingPosition : startingPosition + finalTurn;

    if (newValue <= MAX_POSITION) {
        return {
            newPosition: newValue,
            zeroSeenTimes: fullTurns + (newValue === 0 ? 1 : 0)
        };
    }

    const newPosition = newValue - (MAX_POSITION + 1);
    return {
        newPosition: newPosition,
        zeroSeenTimes: fullTurns + 1
    }
}

export function turnLeft(startingPosition: number, clicks: number): ReturnType {

    const finalTurn = clicks % (MAX_POSITION + 1);
    const fullTurns = Math.floor(clicks / (MAX_POSITION + 1));
    
    const newValue = startingPosition - finalTurn;
    
    if (newValue >= 0) {
        return {
            newPosition: newValue,
            zeroSeenTimes: fullTurns + (newValue === 0 ? 1 : 0)
        };
    }

    const newPosition = MAX_POSITION + newValue + 1;
    return {
        newPosition,
        zeroSeenTimes: fullTurns + (startingPosition === 0 ? 0 : 1)
    }
}

export function parseInstruction(instruction: string): { direction: 'R' | 'L', clicks: number } {
    const direction = instruction.charAt(0) as 'R' | 'L';
    const clicks = parseInt(instruction.slice(1), 10);

    return { direction, clicks };
}   

export function turn(startingPosition: number, instruction: string): ReturnType {
    const parsed = parseInstruction(instruction);
    if (parsed.clicks === 0) {
        return {
            newPosition: startingPosition,
            zeroSeenTimes: 0
        };    
    }

    return (parsed.direction === 'R') ?
        turnRight(startingPosition, parsed.clicks) :
        turnLeft(startingPosition, parsed.clicks);
}

const lines = fs.readFileSync("./data.txt", "utf8").trim().split("\n");

let value = 50;
let password = 0;

lines.forEach(line => {
    const result = turn(value, line);
    value = result.newPosition;
    password = password + result.zeroSeenTimes;
});

console.log(`Password is ${password}`);

const durationMs = performance.now() - start;
console.log(`Execution time: ${durationMs.toFixed(3)}ms`);