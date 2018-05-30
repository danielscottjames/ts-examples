/**
 * Declare a function that takes a number and returns a boolean
 * Note, the return value is inferred and can be left off.
 */
function isEven(item: number): boolean {
    return item % 2 === 0;
}

/**
 * Returns a new array containing the elements of `arrayToFilter`,
 * such that each item in the returned array passes the predicate `f`
 */
function filter(arrayToFilter: any[], predicate: Function) {
    const ret = [];
    for (let i = 0; i < arrayToFilter.length; i++) {
        if (predicate(arrayToFilter[i])) {
            ret.push(arrayToFilter[i]);
        }
    }

    return ret;
}

// We can pass the `isEven` function as an argument, as if it was a variable
const filtered1 = filter([1, 2, 3], isEven);

// Assign an anonymous function to a variable, to use later
const isOdd = function (item: number) {
    return !isEven(item);
};

const filtered2 = filter([1, 2, 3], isOdd);

// We can even just pass in an anonymous function directly as an argument
const filtered3 = filter([1,2,3], function(item) {
    return item < 3;
});

console.log(filtered1); // [ 2 ]
console.log(filtered2); // [ 1, 3 ]
console.log(filtered3); // [ 1, 2 ]