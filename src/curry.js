function functionOfArity(fn, arity) {
    if (arity == 4) {
        return (a, b, c, d) => {
            return fn(a, b, c, d);
        };
    } else if (arity == 3) {
        return (a, b, c) => {
            return fn(a, b, c);
        };
    } else if (arity == 2) {
        return (a, b) => {
            return fn(a, b);
        };
    } else if (arity == 1) {
        return (a) => {
            return fn(a);
        };
    } else {
        return fn();
    }
}

function curry(func) {
    let providedArguments = [];
    const numberOfRequiredArguments = func.length;

    function curriedFunction(...args) {
        providedArguments = [...providedArguments, ...args];
        providedArguments = providedArguments.filter((argument) => {
            return argument !== undefined;
        });
        const currentNumberOfArguments = providedArguments.length;
        const allArgumentsProvided =
            currentNumberOfArguments === numberOfRequiredArguments;
        console.log('Called with args: ' + args);
        console.log('Total Provided Args: ' + providedArguments);
        console.log('All arguments provided?: ' + allArgumentsProvided);
        console.log(
            'Number of required: ' +
                (numberOfRequiredArguments - currentNumberOfArguments)
        );
        if (allArgumentsProvided) {
            return func(...providedArguments);
        }
        return functionOfArity(
            curriedFunction,
            numberOfRequiredArguments - currentNumberOfArguments
        );
    }
    return functionOfArity(curriedFunction, numberOfRequiredArguments);
}
// function curry(fn, arity = fn.length) {
//     return function curried(...args) {
//         if (args.length >= arity) {
//             return fn(...args);
//         } else {
//             return (...moreArgs) => curried(...args, ...moreArgs);
//         }
//     };
// }
export default curry;
