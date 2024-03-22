function curry(func) {
    return function (a) {
        return function (b, c, d) {
            return func(a, b, c, d);
        };
    };
}
export default curry;
