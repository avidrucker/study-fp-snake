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
const k = (x: number) => (y: number) => x;

// this function appears to map a function over a list of x values
const map = (f: any) => (xs: any[]) => xs.map(f);
const pipe = (...fns: any[]) => (x: any) => [...fns].reduce((acc, f) => f(acc), x);
const range = (n: number) => (m: number) => 
	Array.apply(null, Array(m - n)).map((_, i) => n + i); // what does "_" mean here?
const rep = (c: any) => (n: any) => map(k(c))(range(0)(n));

type Table = { cols: number, rows: number };

const Matrix = {
	make: (table: Table) => rep(rep('.')(table.cols))(table.rows),
	toString: (xsxs: [][]) => xsxs.map(xs => xs.join(' ')).join('\r\n'),
	fromState: (state: GameState) => pipe(
		Matrix.make(state.table)
	)(state)
} 

const show = () => console.log('\x1Bc' + Matrix.toString(Matrix.fromState(State)));

// 1.3 now that the show() function seems
// to be implemented, let's try calling it:
export const main = () =>
	setInterval(() => { show()}, 100);