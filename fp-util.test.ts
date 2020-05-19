import { assert, expect } from "chai";
const base = require('./fp-util');

describe('FP-UTIL', () => {
	describe('rep() function', () => {
		it('creates repeating symbol arrays', () => {
			expect(base.rep('c')(2)[0]).equals(['c','c'][0]);
			expect(base.rep('c')(2)[1]).equals(['c','c'][1]);
		})
	});

	describe('range() function', () => {
		it('creates a range from X to Y', () => {
			expect(JSON.stringify(base.range(0)(5))).equals('[0,1,2,3,4]')
			expect(JSON.stringify(base.range(2)(5))).equals('[2,3,4]')
		})
	})
})