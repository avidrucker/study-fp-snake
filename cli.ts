const base = require('./fp-util');

// function hasKey<O>(obj: O, key: keyof any): key is keyof O {
//   return key in obj
// }

// https://dev.to/kingdaro/indexing-objects-in-typescript-1cgi
function hasOwnProperty<O extends object, K extends PropertyKey>(
  obj: O,
  key: K,
): obj is O & Record<K, unknown> {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

Object.getOwnPropertyNames(base).map((p: any) => {
	if(hasOwnProperty(global, p)) {
		global[p] = base[p]
	}
});

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
	table: Table,
	moves: Vector[],
	snake: Point[],
	apple: Point
};

type Point = { x: number, y: number };

// 1.1 we define the game state object here
const initializeState = (): GameState => ({
	table: { cols: 20, rows: 14 },
	moves: [EAST],
	snake: [],
	apple: {x: 16, y: 2}
});

// 1.1 we invoke the function to create the state here
let State: GameState = initializeState();

// 1.2 now that we have some state to render
// we need a function to display the board...
// But, we don't yet have any Matrix functions.
// Let's fix that:

// this appears to be called "asConstant" or "the constant function" ... what is it for?
// is this relevant? https://www.maplesoft.com/support/help/Maple/view.aspx?path=MathApps/ConstantFunction
type Table = { cols: number, rows: number };

const Matrix = {
	make: (table: Table): Table => base.rep(base.rep('.')(table.cols))(table.rows),
	toString: (xsxs: any[][]) => xsxs.map(xs => xs.join(' ')).join('\r\n'),
	fromState: (state: GameState): any[][] => base.pipe(
		Matrix.make(state.table) // Matrix.make
	)(state)
} 

const show = () => 
	console.log('\x1Bc' + Matrix.toString(Matrix.fromState(State)));

// 1.3 now that the show() function seems
// to be implemented, let's try calling it:
export const main = () =>
	setInterval(() => { show()}, 100);