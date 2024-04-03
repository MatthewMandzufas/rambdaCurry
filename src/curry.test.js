import curry from './curry';
import _ from './_';

describe('Curry', () => {
    it('curries a single value', () => {
        const mockedFunctionToCurry = jest.fn(function (a, b, c, d) {
            return (a + b * c) / d;
        });
        const f = curry(mockedFunctionToCurry);
        const g = f(12);

        expect(mockedFunctionToCurry.length).toEqual(4);
        expect(typeof g).toBe('function');
        expect(g(3, 6, 2)).toBe(15);
        expect(mockedFunctionToCurry).toHaveBeenCalledWith(12, 3, 6, 2);
    });
    it('curries multiple values', () => {
        const mockedFunctionToCurry = jest.fn(function (a, b, c, d) {
            return (a + b * c) / d;
        });
        const f = curry(mockedFunctionToCurry);
        const g = f(12, 3);
        expect(g(6, 2)).toBe(15);
        expect(mockedFunctionToCurry).toHaveBeenCalledWith(12, 3, 6, 2);
    });
    it('allows further currying of a curried function', () => {
        const mockedFunctionToCurry = jest.fn(function (a, b, c, d) {
            return (a + b * c) / d;
        });
        const f = curry(mockedFunctionToCurry);
        const g = f(12);
        expect(g(3, 6, 2)).toEqual(15);

        const h = g(3);

        expect(h(6, 2)).toEqual(15);
        expect(g(3, 6)(2)).toEqual(15);
    });
    it('properly reports the length of the curried function', () => {
        const mockedFunctionToCurry = jest.fn(function (a, b, c, d) {
            return (a + b * c) / d;
        });
        const f = curry(mockedFunctionToCurry);
        expect(f.length).toEqual(4);

        const g = f(12);
        expect(g.length).toEqual(3);

        const h = g(3);
        expect(h.length).toEqual(2);

        expect(typeof g(3, 6)).toEqual('function');
        expect(g(3, 6).length).toEqual(1);
    });
    it('preserves context', () => {
        const context = { x: 10 };
        const f = function (a, b) {
            return a + b * this.x;
        };
        const g = curry(f);

        expect(g.call(context, 2, 4)).toEqual(42);
        expect(g.call(context, 2).call(context, 4)).toEqual(42);
    });
    it('supports _ placeholder', () => {
        const f = function (a, b, c) {
            return [a, b, c];
        };
        const g = curry(f);

        function eq(actualValue, expectedValue) {
            return expect(actualValue).toEqual(expectedValue);
        }

        eq(g(1)(2)(3), [1, 2, 3]);
        eq(g(1)(2, 3), [1, 2, 3]);
        eq(g(1, 2)(3), [1, 2, 3]);
        eq(g(1, 2, 3), [1, 2, 3]);

        eq(g(_, 2, 3)(1), [1, 2, 3]);
        eq(g(1, _, 3)(2), [1, 2, 3]);
        eq(g(1, 2, _)(3), [1, 2, 3]);

        eq(g(1, _, _)(2)(3), [1, 2, 3]);
        eq(g(_, 2, _)(1)(3), [1, 2, 3]);
        eq(g(_, _, 3)(1)(2), [1, 2, 3]);

        eq(g(1, _, _)(2, 3), [1, 2, 3]);
        eq(g(_, 2, _)(1, 3), [1, 2, 3]);
        eq(g(_, _, 3)(1, 2), [1, 2, 3]);

        eq(g(1, _, _)(_, 3)(2), [1, 2, 3]);
        eq(g(_, 2, _)(_, 3)(1), [1, 2, 3]);
        eq(g(_, _, 3)(_, 2)(1), [1, 2, 3]);

        eq(g(_, _, _)(_, _)(_)(1, 2, 3), [1, 2, 3]);
        eq(g(_, _, _)(1, _, _)(_, _)(2, _)(_)(3), [1, 2, 3]);
    });
    it('forwards extra arguments', () => {
        const f = function (a, b, c) {
            void c;
            return Array.prototype.slice.call(arguments);
        };
        const g = curry(f);

        function eq(actualValue, expectedValue) {
            return expect(actualValue).toEqual(expectedValue);
        }

        eq(g(1, 2, 3), [1, 2, 3]);
        eq(g(1, 2, 3, 4), [1, 2, 3, 4]);
        eq(g(1, 2)(3, 4), [1, 2, 3, 4]);
        eq(g(1)(2, 3, 4), [1, 2, 3, 4]);
        eq(g(1)(2)(3, 4), [1, 2, 3, 4]);
    });
    it('handles arguments beyond function arity when called with placeholder', () => {
        const f = function (a, b, c) {
            return [a, b, c];
        };
        const g = curry(f);

        function eq(actualValue, expectedValue) {
            return expect(actualValue).toEqual(expectedValue);
        }

        eq(g(1)(_, _, _)(2, _, _)(3)(4), [1, 2, 3]);
        eq(g(_, 2, 3, 4)(1), [1, 2, 3]);
        eq(g(1, 2, 3, _)(4), [1, 2, 3]);
        eq(g(1)(_, 3, 4)(2), [1, 2, 3]);
        eq(g(_)(_, 2, 3, 4)(1), [1, 2, 3]);
        eq(g(_)(_, 2, _, 4, 5)(_, 3, 4)(1), [1, 2, 3]);
        eq(g(_, _, _)(1, _, _)(_, _)(2, _)(_)(3), [1, 2, 3]);
        eq(g(_)(_, 2, _, 4, 5)(1, 3), [1, 2, 3]);
    });
});
