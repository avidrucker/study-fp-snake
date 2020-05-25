// I define here general utility "base" functions
// to be used and/or extended elsewhere as needed.

const adjust = (n: number) => (f: any) => (xs: any[]) =>
	mapi((x: any) => (i: number) => i === n ? f(x) : x)(xs);

// 3.02 dropFirst() is next:
const dropFirst = (xs: any[]) => xs.slice(1);

// 2.27 We are ready to now define dropLast():
const dropLast = (xs: any[]) =>
	xs.slice(0, xs.length - 1);

// 3.11 next is id()
const id = (x: any) => x;

// const k = (x: string) => (y: any): string => x;
const k = (x: any) => (y: any) => x;

// Note: This is simply called `map()` in the original code
// This function appears to map a function over a list of x values...
// Map is curried here to hoist function calls which enables map
// to apply a set of functions, rather than just one function.
const mapF = (f: any) => (xs: any[]) => xs.map(f);

// question: what does this function do? why is it named `mapi`?
const mapi = (f: any) => (xs: any[]) => xs.map((x: any, i: number) => f(x)(i));

// 3.08 merge() is next
const merge = (o1: any) => (o2: any) => Object.assign({}, o1, o2);
// 3.09 Yay! The game appears to work now...
// ... So, what is the id() function for exactly? It appears
// to be used for the crash logic. Which also seems somewhat
// extraneous... but what the heck, why not add it at this point?
// Yes, I am aware that the game is fully playable at this point,
// and that extra unneeded complexity is simply that. However,
// I am curious at to how this will all fit together - so, let's
// add that crash logic!

// modulo arithmetic
const mod = (x: number) => (y: number) => ((y % x) + x) % x; // http://bit.ly/2oF4mQ7

// 2.19 spec() is composed with objOf(), so we build it next:
const objOf = (key: string) => (val: any) => ({ [key]: val});

// todo: rename this to be (an) appropriately named (function type)
export type Bar = (
  (data: string) => void
);

// question: what does this function do?
const pipe = (...fns: Array<Bar>) =>
	(x: any) => [...fns].reduce((acc, f: Bar) => f(acc), x); // : (data: string) => void

// question: what does this function do?
// 2.20 the call to spec() takes in calls to prop(), so we build it next:
const prop = (key: string) => (o: any) => o[key];

const range = (n: number) => (m: number) => 
	Array.apply(null, Array(m - n)).map((_, i) => n + i); // what does "_" mean here?

// repeat (this fulfills the role of a for loop which creates arrays w/ content)
const rep = (c: any) => (n: number) => mapF(k(c))(range(0)(n));

// creates a random number between a min and max (q: is this inclusive or exclusive???)
// 2.30 rnd() is next:
const rnd = (min: number) => (max: number) =>
	Math.floor(Math.random() * max) + min;
// Yay! We now have a game which renders a 1 length long snake!!!
// While this is a major milestone, the snake does not yet "move".
// This seems like the next logical step... Though it could also
// be persistence, that prevents the snake from "flashing" in and
// out of existance (the game could be restarting, or the snake
// could be crashing). So, for now, we will next go with implementing
// the movement logic to move the snake as per the initial direction

// question: what does this function do?
const spec = (o: any) => (x: any) => Object.keys(o)
	.map((k: string) => objOf(k)(o[k](x)))
	.reduce((acc, o) => Object.assign(acc, o))

module.exports = { adjust, dropFirst, dropLast, id, k, mapF, mapi, merge, mod, objOf, pipe, prop, range, rep, rnd, spec }