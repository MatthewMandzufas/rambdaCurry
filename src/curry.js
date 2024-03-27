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
    const currentArguments = [...passedInArguments];
    const argumentsToAdd = [...args];
    // TODO: Side effects?

    const filteredArray = currentArguments.map((arg) =>
        arg === _
            ? argumentsToAdd.length == 0
                ? arg
                : argumentsToAdd.shift()
            : arg
    );

    argumentsToAdd.forEach((arg) => {
        filteredArray.push(arg);
    });

    return filteredArray;
}

function curry(func) {
    const arityOfCurriedFunc = func.length;

    function curriedFunction(...passedInArguments) {
        let numberOfProvidedArgumentsExcludingPlaceholders = 0;
        for (let passedInArgument of passedInArguments) {
            if (passedInArgument !== _) {
                numberOfProvidedArgumentsExcludingPlaceholders++;
            }
        }

        const isRemainingArguments =
            arityOfCurriedFunc -
                numberOfProvidedArgumentsExcludingPlaceholders >
            0;

        if (isRemainingArguments) {
            return functionOfArity((...args) => {
                return curriedFunction.call(
                    this,
                    ...replacePlaceholders(passedInArguments, args)
                );
            }, arityOfCurriedFunc - numberOfProvidedArgumentsExcludingPlaceholders);
        } else {
            return func.call(this, ...passedInArguments);
        }
    }
    return functionOfArity.call(this, curriedFunction, arityOfCurriedFunc);
}
export default curry;
