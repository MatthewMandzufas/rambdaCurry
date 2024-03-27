import curry from './curry';
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
        const ctx = { x: 10 };
        const f = function (a, b) {
            return a + b * this.x;
        };
        const g = curry(f);

        expect(g.call(ctx, 2, 4)).toEqual(42);
        expect(g.call(ctx, 2).call(ctx, 4)).toEqual(42);
    });
});
