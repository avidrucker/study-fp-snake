import { Table, Point, GameState } from "./game-core";

const base = require('./fp-util');
const core = require('./game-core');

// I define functions here that only matter for
// input/output & interfacing with the terminal.

// 1. we start by creating some game state
// which requires only constants for the
// directional vectors

// 1.1 we invoke the function to create the state here
let State: GameState = core.initializeState();

// 1.2 now that we have some state to render
// we need a function to display the board...
// But, we don't yet have any Matrix functions.
// Let's fix that:

// this appears to be called "asConstant" or "the constant function" ... what is it for?
// is this relevant? https://www.maplesoft.com/support/help/Maple/view.aspx?path=MathApps/ConstantFunction

const Matrix = {
	make: (table: Table): Table => base.rep(base.rep('.')(table.cols))(table.rows),
	set: (val: any) => (pos: Point) => base.adjust(pos.y)(base.adjust(pos.x)(base.k(val))),
	addSnake: (state: GameState): any => base.pipe(...base.mapF(Matrix.set('X'))(state.snake)),
	toString: (xsxs: any[][]) => xsxs.map(xs => xs.join(' ')).join('\r\n'),
	fromState: (state: GameState): any[][] => base.pipe(() =>
		Matrix.make(state.table), // Matrix.make(state.table)
		Matrix.addSnake(state)
	)(state)
} // TIL: When piping [functions], if there is only one function being passed,
// keep in mind that a callback may be necessary `() => {}` to support the
// sequence to be hoisted (in the current case above, we are creating an empty
// function to start a simulated sequence)

const show = () => 
	console.log('\x1Bc' + Matrix.toString(Matrix.fromState(State)));

// 1.3 now that the show() function seems
// to be implemented, let's try calling it:
export const main = () =>
	setInterval(() => { show()}, 100);