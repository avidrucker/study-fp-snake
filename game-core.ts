// I define here the core snake game logic, that
// only concerns itself with how the game works,
// not with presentation, nor with input/output.

const base = require('./fp-util');

type Vector = { x: number, y: number };
type Point = { x: number, y: number };
type Table = { cols: number, rows: number };

// Constants
const NORTH: Vector = { x: 0, y:-1 };
const SOUTH: Vector = { x: 0, y: 1 };
const EAST: Vector  = { x: 1, y: 0 };
const WEST: Vector  = { x:-1, y: 0 };

type GameState = {
	table: Table,
	moves: Vector[],
	snake: Point[],
	apple: Point
};

// 1.1 we define the game state object here
const initializeState = (): GameState => ({
	table: { cols: 20, rows: 14 },
	moves: [EAST],
	snake: [],
	apple: {x: 16, y: 2}
});

// enqueue, next,
module.exports = { EAST, NORTH, SOUTH, WEST, initializeState }