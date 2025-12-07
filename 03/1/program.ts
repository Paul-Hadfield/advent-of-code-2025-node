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

function processBank(runningTotalVolts: number, bank: string) : number {

    const cells = bank.split("").map(value => Number(value));

    const firstPart = Math.max(...cells.slice(0, cells.length - 1));
    const position = getPosition(cells, firstPart);
    const secondPart = Math.max(...cells.splice(position + 1));
    const bankVoltage = (firstPart * 10) + secondPart;
    console.log(`Bank: ${bank} - Voltage: ${bankVoltage}`);
    return runningTotalVolts + bankVoltage;
}


const banks = fs.readFileSync("./data.txt", "utf8").trim().split("\n");

const totalVolts = banks.reduce(processBank, 0);
console.log(totalVolts);

const durationMs = performance.now() - start;
console.log(`Execution time: ${durationMs.toFixed(3)}ms`);

