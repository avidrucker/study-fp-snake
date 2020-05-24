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
	// moves: Vector[],
	snake: Point[],
	// apple: Point
};

// 1.1 we define the game state object here
const initializeState = (): GameState => ({
	table: { cols: 20, rows: 14 },
	// moves: [EAST],
	snake: [],
	// apple: {x: 16, y: 2}
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
        x: base.mod(state.table.cols)(state.snake[0].x),
        y: base.mod(state.table.rows)(state.snake[0].y)
    };

// 2.16 Since nextHead() calls mod(), we define mod() next

// 2.17 We have defined nextHead() and mod() but since nextHead()
// is not being called yet, we can explore in the original code
// base to determine where we will be using it (ie. search for
// explicit references/calls to nextHead()) ... There are a few
// calls; in willEat(), in willCrash(), and in nextSnake(). Since
// my goal is firstly to render the snake, I will create
// nextSnake() first, though since I also see that nextSnake is
// composed of willEat() and willCrash() (as well as nextHead(),
// concat(), and dropLast()), I may as well define those as well.
// I see that willEat() and willCrash() are composed of pointEq()
// and find(), so we have our work cut out for us:
// Next to define:
// nextSnake()
// - willCrash(), find(), pointEq(),
// - willEat(), concat(), dropLast()
// This is a lot, so ...

// ... First, let's only worry about where nextSnake() is called
// before we use the fully fleshed out function.
const nextSnake = (state: GameState) => [];

// 2.18 Where is nextSnake() called? Inside of next(), which calls spec() :
const next: GameState = base.spec({
    table: {
        rows: base.prop('rows'),
        cols: base.prop('cols')
    },
    // moves: nextMoves,
    snake: nextSnake //,
    // apple: nextApple
});

// const nextSnake = (state: GameState) => willCrash(state)
//     ? []
//     : (willEat(state)
//         ? [nextHead(state)].concat(state.snake)
//         : [nextHead(state)].concat(dropLast(state.snake))
//     )

// enqueue,
module.exports = { EAST, NORTH, SOUTH, WEST, initializeState, next }