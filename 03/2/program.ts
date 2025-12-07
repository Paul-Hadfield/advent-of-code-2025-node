import * as fs from "fs";
import { performance } from "perf_hooks";

const start = performance.now();
function getPosition(cells: Number[], value: number): number {
    for (let i = 0; i < cells.length; i++) {
        if (cells[i] === value) {
            return i;
        }
    }

    throw new Error("Value not found");
}

function processBank(cells: number[], len: number) : number {

    const part = Math.max(...cells.slice(0, cells.length - len));
    if (len === 0) {
        return part;
    }

    const position = getPosition(cells, part);
    const remainingCells = cells.splice(position + 1);
    return Number(part.toString() + processBank(remainingCells, len -1).toString());
}


const banks = fs.readFileSync("./data.txt", "utf8").trim().split("\n");

const totalVolts = banks.reduce((runningTotalVolts: number, bank: string) => {
    const value = processBank(bank.split("").map(value => Number(value)), 11);
    return runningTotalVolts + value;
}, 0);
console.log(totalVolts);

const durationMs = performance.now() - start;
console.log(`Execution time: ${durationMs.toFixed(3)}ms`);

