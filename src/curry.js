function functionOfArity(func, arity, providedArguments) {
    if (arity == 4) {
        return (a, b, c, d) => {
            return func(providedArguments, a, b, c, d);
        };
    } else if (arity == 3) {
        return (a, b, c) => {
            return func(providedArguments, a, b, c);
        };
    } else if (arity == 2) {
        return (a, b) => {
            return func(providedArguments, a, b);
        };
    } else if (arity == 1) {
        return (a) => {
            return func(providedArguments, a);
        };
    }
}
function curry(func) {
    const numberOfRequiredArguments = func.length;
    function curriedFunction(providedArguments = [], ...args) {
        providedArguments = [...providedArguments, ...args];
        providedArguments = providedArguments.filter((argument) => {
            return argument !== undefined;
        });
        const currentNumberOfArguments = providedArguments.length;
        const remainingArguments =
            numberOfRequiredArguments - currentNumberOfArguments;
        if (remainingArguments == 0) {
            return func(...providedArguments);
        }
        return functionOfArity(
            curriedFunction,
            remainingArguments,
            providedArguments
        );
    }
    return functionOfArity(curriedFunction, numberOfRequiredArguments);
}
export default curry;
