import _ from './_';

function functionOfArity(func, arity) {
    Object.defineProperty(func, 'length', {
        value: arity,
        writable: false,
    });
    return func;
}

function replacePlaceholders(passedInArguments, args) {
    const { resultArgs, argsToMerge } = passedInArguments.reduce(
        function ({ resultArgs, argsToMerge }, currentValue) {
            if (currentValue === _ && argsToMerge.length > 0) {
                resultArgs.push(argsToMerge.shift());
            } else {
                resultArgs.push(currentValue);
            }
            return { resultArgs, argsToMerge };
        },
        { resultArgs: [], argsToMerge: args }
    );
    return [...resultArgs, ...argsToMerge];
}

function curry(func) {
    const arityOfCurriedFunc = func.length;

    function curriedFunction(...passedInArguments) {
        const workingArity =
            passedInArguments.length > arityOfCurriedFunc
                ? passedInArguments.length
                : arityOfCurriedFunc;

        const remainingArity = passedInArguments.reduce(
            (accumulator, currentValue) =>
                currentValue === _ ? accumulator : accumulator - 1,
            workingArity
        );

        const containsPlaceholders = passedInArguments.find(
            (currentArgument) => currentArgument === _
        );

        if (remainingArity > 0 || containsPlaceholders) {
            return functionOfArity((...newArgs) => {
                return curriedFunction.call(
                    this,
                    ...replacePlaceholders(passedInArguments, newArgs)
                );
            }, remainingArity);
        } else {
            return func.call(this, ...passedInArguments);
        }
    }
    return functionOfArity.call(this, curriedFunction, arityOfCurriedFunc);
}
export default curry;
