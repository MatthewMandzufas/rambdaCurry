import _ from './_';

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
                currentValue == _ ? accumulator : accumulator - 1,
            workingArity
        );

        if (remainingArity > 0) {
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
