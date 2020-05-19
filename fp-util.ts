// I define here general utility "base" functions
// to be used and/or extended elsewhere as needed.

// const k = (x: string) => (y: any): string => x;
const k = (x: any) => (y: any) => x;

// this function appears to map a function over a list of x values
const mapF = (f: any) => (xs: any[]) => xs.map(f);

type Bar = (
  (data: string) => void
);

// todo: resolve error:
// TypeError: f is not a function
// attempt 1: https://stackoverflow.com/questions/12734660/a-typed-array-of-functions
const pipe = (...fns: Array<Bar>) =>
	(x: any) => [...fns].reduce((acc, f: Bar) => f(acc), x); // : (data: string) => void
// const pipe = (...fns: any[]) =>
//   fns.reduce((prevFn, nextFn) => (value: any) => nextFn(prevFn(value)));

// function rangeTest(size: number, startAt: number = 0) {
// 	return [...Array(size).keys()].map(i => i + startAt);
// }

// const rangeTest2 = (size: number) => (startAt: number) =>
// 	rangeTest(size, startAt);

// todo: resolve bug:
// There appears to be a syntax error, or some other error at "Array(m - n)"
// which results in a `RangeError: Invalid array length`
// Also, is this typed correctly as `: number[]` ?
const range = (n: number) => (m: number) => 
	Array.apply(null, Array(m - n)).map((_, i) => n + i); // what does "_" mean here?

const rep = (c: any) => (n: number) => mapF(k(c))(range(0)(n));

// adjust, dropFirst, dropLast, id, merge, mod, objOf, prop, rnd, spec
module.exports = { k, mapF, pipe, range, rep }