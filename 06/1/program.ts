import * as fs from "fs";
import { performance } from "perf_hooks";

type Column = {
    start: number,
    end: number
};

type Calculation = {
    values: number[],
    operation: string
}

function getColumns(lines: string[]): Column[]
{
    const cells = lines[lines.length - 1].split("");

    let start = -1;
    const columns = new Array<Column>();
    for (let i = 0; i < cells.length; i++)
    {
        if (cells[i] !== " ") {
            if (start !== -1) {
                columns.push({start, end: i - 1})
            }
            start = i;
        }
    }
    let lineLength = -1;
    lines.forEach((line) => {
        lineLength = Math.max(lineLength, line.length);
    });
    
    columns.push({start, end: lineLength})

    return columns;
}

function getCalculations(lines: string[], columns: Column[]): Calculation[] 
{
    const calculations = new Array<Calculation>();

    columns.forEach((column) => {
        const values = new Array<number>();
        for (let i = 0; i < lines.length - 1; i++) {
            const value = lines[i].substring(column.start, column.end);
            if (value) {
                values.push(parseInt(value));
            }
        }

        const operation = lines[lines.length - 1].substring(column.start, column.start + 1);

        calculations.push({
            values, operation
        })
     });

    return calculations;
}

function processCalc(acc: number, calc: Calculation): number {
    switch (calc.operation) {
        case "+":
            return acc + calc.values.reduce((acc: number, value: number): number => { return acc + value}, 0);
        case "*":
            return acc + calc.values.reduce((acc: number, value: number): number => { return acc * value}, 1);
        default:
            throw Error("Unhandled operation");
    }
}

const start = performance.now();

const lines = fs.readFileSync("./data.txt", "utf8").trim().split("\n");

const columns = getColumns(lines);
const calculations = getCalculations(lines, columns);

console.log(calculations.reduce(processCalc, 0))

const durationMs = performance.now() - start;
console.log(`Execution time: ${durationMs.toFixed(3)}ms`);

