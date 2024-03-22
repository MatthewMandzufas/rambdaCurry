import curry from './curry';
describe('Curry', () => {
    it('curries a single value', () => {
        const mockedFunctionToCurry = jest.fn(function (a, b, c, d) {
            return (a + b * c) / d;
        });
        const f = curry(mockedFunctionToCurry);
        const g = f(12);
        expect(g(3, 6, 2)).toBe(15);
        expect(mockedFunctionToCurry).toHaveBeenCalledWith(12, 3, 6, 2);
    });
});
