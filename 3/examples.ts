/* #region Closures */
const counter = (() => {
    let count = 0;
    return () => {
        return count++;
    }
})(); // IIFE = Immediately Invoked Function Expression
console.log(counter(), counter());




// Create a "constructor" with closures
const newLogger = (prefix: string) => {
    let counter = 0; // acts as a private variable inside this closure

    return {
        log: (message) => console.log(`${counter++} - ${prefix}::${message}`)
    }
}; 
const myLogger = newLogger('myLogger');
myLogger.log("here");
myLogger.log("here");
/* #endregion */

/* #region  What is `this` */
function whatIsThis() {
    return this.toString();
}

console.log(whatIsThis()); // -> this is [object global]



const testObj = {
    toString() {
        return "testObj";
    },
    run1: () => { // What if we use a regular function?
        console.log(this.toString());
        return whatIsThis();
    },
    run2: whatIsThis,
}
console.log(testObj.run1(), testObj.run2()) // -> ??



// You can use `apply` to call a function with any `this`
// You can use `bind` to create a new function where `this` is always what you defined. (Also `call`)
console.log(whatIsThis.apply(7)); // -> this is 7

const bound = whatIsThis.bind("bound");
console.log(bound()); // -> this is bound





declare type Block = {size: number};
const blocks = [{size: 7}] as Block[];

const withEachBlock = (fn: (this: Block) => void) => {
    for (var i = 0; i < blocks.length; i++) {
        fn.call(blocks[i]);
    }
}

withEachBlock(function() {
    console.log(this.size);
});

/* #endregion */

/* #region `new` */
const Logger = function(prefix: string) {
    this.prefix = prefix; // public, bound to `this`, not dependent on closure.
    
    let counter = 0; // private
    this.log = function(message: string) {
        console.log(`${counter++} - ${this.prefix}::${message}`);
    }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new
const makeNew = (fn: Function, ...args: any[]) => {
    const newObj = {};
    Logger.bind(newObj)(...args);
    return newObj as any;
}

const myGhettoLogger = makeNew(Logger, 'myGhettoLogger');
myGhettoLogger.log('Testing');
console.log(myGhettoLogger instanceof Logger); // => false



const myLogger2 = new Logger('myLogger2');
myLogger2.log('Creating with `new`');
console.log(myLogger2 instanceof Logger); // => true


// So this approach to OOO is pretty good, but what's a pretty big flaw?
// Hint:
{
    const myLogger3 = new Logger('myLogger3');
    console.log(myLogger2.log == myLogger3.log); // => ??
}
/* #endregion */

/* #region  prototype and class */
const ProtoLogger = function(prefix: string) {
    this.prefix = prefix;
    this.counter = 0; // Harder to make private fields with prototypes, use getter/setter functions, symbols, or class statement.
}
ProtoLogger.prototype.log = function(message: string) {
    console.log(`${this.counter++} - ${this.prefix}::${message}`);
}

const protoLogger1 = new ProtoLogger('protoLogger1');
const protoLogger2 = new ProtoLogger('protoLogger2');
protoLogger1.log('Testing');
protoLogger2.log('Testing');

// All true
console.log(protoLogger1.log == protoLogger2.log); // => true
console.log(protoLogger2.log == ProtoLogger.prototype.log); // => true
console.log(protoLogger2.__proto__.log == ProtoLogger.prototype.log); // => true


// Can modify prototype to affect all objects:
ProtoLogger.prototype.log = () => console.log('Modified');
protoLogger1.log('Testing');






// Set compile target to ES5 and see how the syntatic sugar works here
class ClassLogger {
    // Compile and notice that `private` is only enforced by TypeScript.
    private counter = 0;

    constructor(public readonly prefix: string) {
    }

    log(message: string) { // What if we used an arrow function here?
        console.log(`${this.counter++} - ${this.prefix}::${message}`);
    }
}

const classLogger = new ClassLogger('classLogger');
classLogger.log('Test');
/* #endregion */

/* #region  var/let/hoisting */
function thisIsATrickQuestion() {
    console.log(a); // => ?
    var a = "Hello World";
}
thisIsATrickQuestion();



const a = [];
(function () {
   for (var i = 0; i < 5; ++i) {
     a.push(() => console.log(i));
   }
}());

a.forEach(fn => fn()); // => 5 5 5 5 5 
/* #endregion */
