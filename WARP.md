# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview
Advent of Code 2025 solutions implemented in Node.js with TypeScript. This repository contains daily puzzle solutions organized by day and part number.

## Project Structure
```
/
├── [DD]/              # Day number (e.g., 01, 02, 03)
│   └── [P]/          # Part number (1 or 2)
│       └── program.ts # Solution implementation
└── package.json       # Node.js ES module configuration
```

## Development Commands

### Running Solutions
```bash
# Run a specific day's solution
node --loader ts-node/esm [DD]/[P]/program.ts

# Alternative: run with tsx (if installed)
npx tsx [DD]/[P]/program.ts
```

### TypeScript
This project uses ES modules (`"type": "module"` in package.json). All TypeScript files should use ES module syntax (`import`/`export`).

## Architecture Notes

### File Organization
- Each day gets its own directory (e.g., `01/`, `02/`)
- Each part of a puzzle gets a subdirectory within the day (e.g., `01/1/`, `01/2/`)
- Solution code lives in `program.ts` files
- Input files typically named `input.txt` (add to `.gitignore` per Advent of Code guidelines)

### Common Patterns
- Read input from file using Node.js `fs` module
- Parse input according to puzzle requirements
- Implement solution logic
- Output answer to console

### Typical Solution Structure
```typescript
import { readFileSync } from 'fs';

const input = readFileSync('./input.txt', 'utf-8');
// Parse and solve
console.log(answer);
```

## TypeScript Configuration
No `tsconfig.json` is currently present. If adding one, ensure it's configured for ES modules:
```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "node",
    "target": "ESNext"
  }
}
```
