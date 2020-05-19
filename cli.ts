// I define functions here that only matter for
// input/output & interfacing with the terminal.

// 1. we start by creating some game state
// which requires only constants for the
// directional vectors

// Constants
const NORTH = { x: 0, y:-1 };
const SOUTH = { x: 0, y: 1 };
const EAST  = { x: 1, y: 0 };
const WEST  = { x:-1, y: 0 };

const initializeState = () => ({
	cols: 20,
	rows: 14,
	moves: [EAST],
	snake: [],
	apple: {x: 16, y: 2}
});