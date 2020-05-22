// I define here the core snake game logic, that
// only concerns itself with how the game works,
// not with presentation, nor with input/output.

const base = require('./fp-util');

export type Vector = { x: number, y: number };
export type Point = { x: number, y: number };
export type Table = { cols: number, rows: number };

// Constants
const NORTH: Vector = { x: 0, y:-1 };
const SOUTH: Vector = { x: 0, y: 1 };
const EAST: Vector  = { x: 1, y: 0 };
const WEST: Vector  = { x:-1, y: 0 };

export type GameState = {
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

// 2. We now are ready to add the snake to the game.

// 2.1 In order to figure out where best to start, let's look
// at where the snake is stored/added (in/to the state).
// Looking at the original cli.js, I can see that the
// fromState() function takes in via pipe() the Matrix.addSnake()
// function result with the state passed in as a parameter.
// So, addSnake() is likely on the add list. I stub this now
// inside of the Matrix function (table map) object.

// 2.11 In order to addSnake() we need to create the base set()
// because it is called inside of addSnake()

// 2.12 In order to set() we need to create the base adjust()
// because it is called inside of set()

// 2.13 adjust() depends on mapi(), so we define mapi() next

// 2.14 Now that the above functions have been defined, perhaps we
// may now add  Matrix.addSnake(state) to the fromState() pipe() call.
// Let's try doing so and see what happens...
// ...
// No errors occur, and the board renders, but still, no snake to be seen.
// What is necessary in order for us to get a snake on the board?

// 2.15 Let's next look at what initializes a snake onto the board in a
// particular position. nextHead() is the function which is responsible in
// the original snake.js for initializing a new snake at row 2 column 2.
// So, let's go ahead and create nextHead().

// next values based on state
const nextHead = (state: GameState) => state.snake.length === 0
    ? { x: 2, y: 2}
    : {
        x: mod(state.table.cols)(state.snake[0].x),
        y: mod(state.table.rows)(state.snake[0].y)
    };

// 2.16 Since nextHead() calls mod(), we define mod() next

// enqueue, next,
module.exports = { EAST, NORTH, SOUTH, WEST, initializeState }