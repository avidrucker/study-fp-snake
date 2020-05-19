// I define functions here that only matter for
// input/output & interfacing with the terminal.

// 1. we start by creating some game state
// which requires only constants for the
// directional vectors

type Vector = { x: number, y: number };

// Constants
const NORTH: Vector = { x: 0, y:-1 };
const SOUTH: Vector = { x: 0, y: 1 };
const EAST: Vector  = { x: 1, y: 0 };
const WEST: Vector  = { x:-1, y: 0 };

type GameState = {
	cols: number,
	rows: number,
	moves: Vector[],
	snake: Point[],
	apple: Point
};

type Point = { x: number, y: number };

// 1.1 we define the game state object here
const initializeState = (): GameState => ({
	cols: 20,
	rows: 14,
	moves: [EAST],
	snake: [],
	apple: {x: 16, y: 2}
});

// 1.1 we invoke the function to create the state here
let State: GameState = initializeState();