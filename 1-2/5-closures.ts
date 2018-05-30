function createLogger(target) {

    // The returned function "closes" over all variables in scope,
    // in this case, target is still accessible whenever this function is called.
    return function (message) {
        console.log(`${target}::${message}`);
    }
}

const myLog = createLogger("DEBUG");
myLog("Testing"); // DEBUG::Testing



/**
 * What
 *
 * This creates a function,
 * that returns a function,
 * that creates and returns a function,
 * that monotonically returns a higher number.
 */
const createCreateCounter = function() {
    let currentCount = 0;

    return function createCounter() {
        return function getCount() {
            return currentCount++;
        }
    }
}
const createCounter = createCreateCounter();

const myCounter1 = createCounter();
const myCounter2 = createCounter();
console.log(myCounter1()); // 0
console.log(myCounter2()); // 1
console.log(myCounter1()); // 2


const createCounter2 = createCreateCounter();
const myCounter3 = createCounter2();
console.log(myCounter3()); // ??