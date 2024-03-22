function curry(func) {
    let providedArguments = [];
    const numberOfRequiredArguments = func.length;

    function curriedFunction(...args) {
        providedArguments = [...providedArguments, ...args];
        const currentNumberOfArguments = providedArguments.length;

        const allArgumentsProvided =
            currentNumberOfArguments == numberOfRequiredArguments;

        if (allArgumentsProvided) {
            return func(...providedArguments);
        }
        return curriedFunction;
    }
    return curriedFunction;
}
export default curry;
