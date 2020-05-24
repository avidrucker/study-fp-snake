// I define here general utility "base" functions
// to be used and/or extended elsewhere as needed.

const adjust = (n: number) => (f: any) => (xs: any[]) =>
	mapi((x: any) => (i: number) => i === n ? f(x) : x)(xs);

// 2.27 We are ready to now define dropLast():
const dropLast = (xs: any[]) =>
	xs.slice(0, xs.length - 1);

// const k = (x: string) => (y: any): string => x;
const k = (x: any) => (y: any) => x;

// This function appears to map a function over a list of x values...
// Map is curried here to hoist function calls which enables map
// to apply a set of functions, rather than just one function.
const mapF = (f: any) => (xs: any[]) => xs.map(f);

const mapi = (f: any) => (xs: any[]) => xs.map((x: any, i: number) => f(x)(i));

const mod = (x: number) => (y: number) => ((y % x) + x) % x; // http://bit.ly/2oF4mQ7

// 2.19 spec() is composed with objOf(), so we build it next:
const objOf = (key: string) => (val: any) => ({ [key]: val});

export type Bar = (
  (data: string) => void
);

// resolve f is not a function bug: attempt 1: https://stackoverflow.com/questions/12734660/a-typed-array-of-functions
const pipe = (...fns: Array<Bar>) =>
	(x: any) => [...fns].reduce((acc, f: Bar) => f(acc), x); // : (data: string) => void
// const pipe = (...fns: any[]) =>
//   fns.reduce((prevFn, nextFn) => (value: any) => nextFn(prevFn(value)));

// 2.20 the call to spec() takes in calls to prop(), so we build it next:
const prop = (key: string) => (o: any) => o[key];

const range = (n: number) => (m: number) => 
	Array.apply(null, Array(m - n)).map((_, i) => n + i); // what does "_" mean here?

const rep = (c: any) => (n: number) => mapF(k(c))(range(0)(n));

const spec = (o: any) => (x: any) => Object.keys(o)
	.map((k: string) => objOf(k)(o[k](x)))
	.reduce((acc, o) => Object.assign(acc, o))

// dropFirst, id, merge, rnd
module.exports = { adjust, dropLast, k, mapF, mapi, mod, objOf, pipe, prop, range, rep, spec }