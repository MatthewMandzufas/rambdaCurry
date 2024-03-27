function functionOfArity(func, arity) {
    switch (arity) {
        case 4:
            return function (a, b, c, d) {
                return func.apply(this, arguments);
            };
        case 3:
            return function (a, b, c) {
                return func.apply(this, arguments);
            };
        case 2:
            return function (a, b) {
                return func.apply(this, arguments);
            };
        case 1:
            return function (a) {
                return func.apply(this, arguments);
            };
        default:
            break;
    }
}
function curry(func) {
    const arityOfCurriedFunc = func.length;

    function curriedFunction(...passedInArguments) {
        const isRemainingArguments =
            arityOfCurriedFunc - passedInArguments.length > 0;

        if (isRemainingArguments) {
            return functionOfArity(
                (...args) =>
                    curriedFunction.call(this, ...passedInArguments, ...args),
                arityOfCurriedFunc - passedInArguments.length
            );
        } else {
            return func.call(this, ...passedInArguments);
        }
    }
    return functionOfArity.call(this, curriedFunction, arityOfCurriedFunc);
}
export default curry;
