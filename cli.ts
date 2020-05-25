import { Point, GameState } from "./game-core";

const base = require('./fp-util');
const core = require('./game-core');

// I define functions here that only matter for
// input/output & interfacing with the terminal.

// 1. we start by creating some game state
// which requires only constants for the
// directional vectors

// Mutable State
// 1.1 we invoke the function to create the state here
let State: GameState = core.initializeState();

// Matrix Operations
// 1.2 now that we have some state to render
// we need a function to display the board...
// But, we don't yet have any Matrix functions.
// Let's fix that:
const Matrix = {
	make: (table: any): any => base.rep(base.rep('.')(table.cols))(table.rows),
	set: (val: any) => (pos: Point) => base.adjust(pos.y)(base.adjust(pos.x)(base.k(val))),
	addSnake: (state: GameState): any => base.pipe(...base.mapF(Matrix.set('X'))(state.snake)),
	addApple: (state: GameState) => Matrix.set('o')(state.apple), // 3.03 next is addApple()
	// addCrash: ...
	toString: (xsxs: any[][]) => xsxs.map(xs => xs.join(' ')).join('\r\n'),
	fromState: (state: GameState): any[][] => base.pipe(
		Matrix.make, // Matrix.make(state.table)
		Matrix.addSnake(state),
		Matrix.addApple(state)
		// Matrix.addCrash(state)
	)(state)
}
// 3.04 Beautiful! The snake now starts out visually at a length of 1,
// which is the desired behavior (and render result). The default placement
// of the apple allows the snake to hit it, and the snake "eats" the apple
// as desired/expected, which causes the apple to reappear elsewhere and
// the snake to "grow" in length by 1 segment.

// Key Events
// readline...
// process...
// ...

// Game Loop
const show = () => 
	console.log('\x1Bc' + Matrix.toString(Matrix.fromState(State)));

// 2.21 Now that next() has been defined, we can call it in the
// definition of step(), the only place it is called:
// Note: What I call "core" here is called "Snake" in the
// original code base
const step = () => State = core.next(State); // mutation! assignment!

// 2.22 It seems evident that, upon running the code, that
// nextHead() is to be called in a bunch of places, and, that no snake
// will be rendered until nextHead() is called, even if an initial snake
// state of {x: 2, y: 2} is established independently of nextHead().
// Therefore, I will next build out the functions that require nextHead(),
// starting with willEat(), followed by pointEq(), followed by willCrash():

// Main
// 1.3 now that the show() function seems
// to be implemented, let's try calling it:
export const main = () =>
	setInterval(() => { step(); show() }, 100);