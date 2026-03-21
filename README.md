# Toy Robot Simulator

A simple Node.js + TypeScript CLI app that simulates a toy robot moving on a 5x5 table.

## Requirements

- Node.js 18+

## Install

```bash
npm install
```

## Run

```bash
node app.ts
```

Then type commands in the terminal:

- `PLACE X,Y,F`
- `MOVE`
- `LEFT`
- `RIGHT`
- `REPORT`

Examples:

```text
PLACE 0,0,NORTH
MOVE
REPORT
Output: 0,1,NORTH
```

## Test

```bash
npm test
```
