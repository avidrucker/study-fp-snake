// I define here the core snake game logic, that
// only concerns itself with how the game works,
// not with presentation, nor with input/output.

const base = require('./fp-util');

// Types
export type Vector = { x: number, y: number };
export type Point = { x: number, y: number };
export type GameState = {
    cols: number,
    rows: number,
	moves: Vector[],
	snake: Point[],
	apple: Point
};

// Constants
const NORTH: Vector = { x: 0, y:-1 };
const SOUTH: Vector = { x: 0, y: 1 };
const EAST: Vector  = { x: 1, y: 0 };
const WEST: Vector  = { x:-1, y: 0 };

// Point Operations
// 2.24 We can now define pointEq()
const pointEq = (p1: Point) => (p2: Point) =>
    p1.x == p2.x && p1.y == p2.y;

// Booleans
// 2.23 We define willEat(), which calls pointEq() and nextHead()
// and also seems to require an apple to exist in the game state
const willEat = (state: GameState) =>
    pointEq(nextHead(state))(state.apple)

// 2.25 We can now define willCrash()
const willCrash = (state: GameState) =>
    state.snake.find(pointEq(nextHead(state)));

// 3.07 validMove() is next:
const validMove = (move: Vector) => (state: GameState) =>
    state.moves[0].x + move.x != 0 || state.moves[0].y + move.y != 0;

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

// Next Values Based on State
// 3.01 nextMoves() is next:
const nextMoves = (state: GameState) =>
    state.moves.length > 1 ? base.dropFirst(state.moves) : state.moves;

// 2.28 nextApple() is next:
const nextApple = (state: GameState) => willEat(state) ? rndPos(state) : state.apple;

// 2.15 Let's next look at what initializes a snake onto the board in a
// particular position. nextHead() is the function which is responsible in
// the original snake.js for initializing a new snake at row 2 column 2.
// So, let's go ahead and create nextHead().

// next values based on state
// todo: update nextHead() to be able to incorporate merged movement
const nextHead = (state: GameState) => state.snake.length === 0
    ? { x: 2, y: 2}
    : {
        x: base.mod(state.cols)(state.snake[0].x) + state.moves[0].x,
        y: base.mod(state.rows)(state.snake[0].y) + state.moves[0].y
    };
// 3.03 Pretty cool! There is animation now.
// Some thoughts: It appears that currently, right from the start,
// the snake attains a length of 2, which is not correct.
// This may simply be a rendering error, or that the snake is
// actually increased in length upon game start.
// That all said, next I believe I can add the apple and snake
// eating logic which doesn't require any user input, and leave
// the user input for last. So, apple logic is next.

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
// const nextSnake = (state: GameState) => []; // commented out at 2.26

// 2.26 Now that we have defined willCrash() and willEat()
// we can define nextSnake() for real:
const nextSnake = (state: GameState) => willCrash(state)
    ? []
    : (willEat(state)
        ? [nextHead(state)].concat(state.snake)
        : [nextHead(state)].concat(base.dropLast(state.snake))
    )

// Randomness
// 2.29 rndPos() is next:
const rndPos = (table: any) => ({
    x: base.rnd(0)(table.cols - 1),
    y: base.rnd(0)(table.rows - 1)
});

// Initial State
// 1.1 we define the game state object here
const initializeState = (): GameState => ({
    cols: 20,
    rows: 14,
	moves: [EAST],
	snake: [],
	apple: {x: 16, y: 2}
});

// 2.18 Where is nextSnake() called? Inside of next(), which calls spec() :
const next: GameState = base.spec({
    rows: base.prop('rows'),
    cols: base.prop('cols'),
    moves: nextMoves,
    snake: nextSnake,
    apple: nextApple
});

// 3.06 enqueue() is next:
const enqueue = (state: GameState, move: Vector) => validMove(move)(state)
    ? base.merge(state)({ moves: state.moves.concat([move]) })
    : state;

module.exports = { EAST, NORTH, SOUTH, WEST, initializeState, enqueue, next }