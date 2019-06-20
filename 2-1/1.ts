/* #region  Variables */
let myVariable = 42;
const myConstant = 'Hello';
// var ...?

// TypeScript says this is an error. Does it actually throw an error?
myConstant += ' World';
console.log(myConstant);

const myFunction = (message: string) => { /* Short hand syntax */ /* old function syntax */
    return message.toUpperCase();
}

const myArray = [1,2,3];
const myEmptyStringArray: string[] = []; /* Alternative syntax to declare an Array? */

/* #endregion */

/* #region  JSON (JavaScript Object Notation) */
const myObject = {
    propertyName: 'propertyValue',
    anArray: [
        1, 2, 3, 4, 5
    ],
    nestedObjects: {
        anotherProperty: false
    }
}

console.log(myObject.propertyName);
console.log(myObject['propertyName']);
console.log(JSON.stringify(myObject));
console.log(JSON.parse(`{"message": "Hello World"}`).message);

myObject.propertyName = 'Can I change a property on a `const` object?';
/* #endregion */

/* #region  Interface & Classes */
declare interface Duck {
    walk: (steps: number) => void,
    quack: () => void, 
}

const moveDuck = (duck: Duck) => {
    duck.walk(7);
    duck.quack();
}

const myDuck = {
    walk: (steps: number /* What if steps doesn't take an argument? */) => {
        let message: string[] = [];
        for (let i = 0; i < steps; i++) {
            message.push('waddle')
        }
        console.log(message.join(' '));
    },
    quack: (/* What if quack takes an argument? */) => console.log('quack'),
    // What if you add more properties?
}

moveDuck(myDuck);


/* What does MyDuck look like when transpiled? */

class MyDuck { // What if we do `implements Duck`

    // How could we let someone get this ducks name,
    // but prevent them from changing it?
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    walk() {
        console.log("waddle waddle");
    }
    quack() {
        console.log(`My name is ${this.name}`);
    }
}

moveDuck(new MyDuck('Donald'));
/* #endregion */

/* #region  New ES6+ Features */
const message = "String Interpolation";
console.log(`Use back ticks for ${message}`);





var sum = (a: number, b: number) => a+b;

const result = [1, 2, 3, 4, 5]
 .filter(i => i % 2 == 0)
 .map(i => i*2)
 .reduce(sum);
console.log(result);






var sum = (a: number, b: number) => a+b;

const avg = (...nums: number[]) => nums.reduce(sum)/nums.length;
const lameAverage = function() {
    let sum = 0;
    for (let i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum/arguments.length;
}

console.log(avg(1,2,3));




// What if Point is a tuple?
declare interface Point {
     x: number, y: number
}

const addPoints = ({x: x1, y: y1}: Point, {x: x2, y: y2}: Point) => {
    return {
        x: x1+x2,
        y: y1+y2
    }
}

const {x: xSum} = addPoints({x: 0, y: 0}, {x: 5, y: 10});
console.log(xSum);
/* #endregion */

/* #region  Literals, Unions, Intersections, etc... */
// Literals?
const a: "a string" = "a string";
const b: 7 = 7;
const c: true = true;

// Question -- Why literals?
const setFlag = (flag: 1|0) => {
    // ...
}

const doActionForProduct = (product: 'chart'|'press') => {
    // ...
}

// Fun fact, boolean is true|false (hover over predicate)
const predicate: () => (true | false) = () => {
    return Math.random() > .5;
}

// As the key of (`keyof`) an object
const config = {
    chart: {},
    press: {}
}
const getConfig = (product/*: 'chart'|'press'*/: keyof typeof config) => {
    return config[product];
}

// Unions and Intersections
let aUnion: string | number | boolean = "a string";
aUnion = 7;
aUnion = true;



let bIntersection: {
    name: string
}&{
    age: number
} = {
    name: "Godzilla",
    age: 4593
};




// Unions feel like OOO, Intersections do not. Maybe most obvious use of Intersections:
const myExtendedObject = Object.assign({a: 7}, {b: "Godzilla"});




// (We declare bUnion like this, because TypeScript's Control FLow Analysis knows aUnion is a boolean)
const bUnion = aUnion as string | number | boolean




// Question -- What can you do with a (string | number | boolean)?
// Answer -- not much

// If you only know that you have a string or a number or a boolean, you could
// only perform operations and access properties that they all share.

// For example, you can't use it where you only expect a number
const isEven = (num: number) => {
    return num%2==0;
}

// Error!
isEven(bUnion);


// THEREFORE the properties of the union of types is the intersection of the the properties of each type.
// And this is why some people get confused by the names of union and intersect
interface Turtle {
    big: boolean;
    color: string
    numLegs: number;
    swim: () => void;
    isPotato: false;
}
interface Potato {
    big: boolean;
    color: string;
    isPotato: true;
}

function func1(potatoOrTurtle: Turtle|Potato, poturtle: Turtle&Potato) {
    // Notice that the properties of a union is the intersections of their properties
    type p1 = keyof typeof potatoOrTurtle;

    // Notice that the properties of an intersection is the union of their properties
    type p2 = keyof typeof poturtle;
}





const stringOrNum: string|number = "" as string|number;
if (typeof stringOrNum == "string") {
    stringOrNum // is a string
} else {
    // all options are exhausted, so TS infers a number
    stringOrNum // is a number
}


// Discrimination
const potatoOrTurtle = {} as Potato|Turtle;
if (potatoOrTurtle.isPotato == true) {
    potatoOrTurtle// is a Potato
}

// User defined type guards are functions that return a boolean
function isTurtle(a: any): a is Turtle {
    return true;
}

const seven = 7;
if (isTurtle(seven)) {
    // no error
    seven.swim();
}


// Nullability -- often with a union with |undefined or |null
// More about this with strictNullChecks
const stringOrNothing: string|undefined = undefined as string|undefined;
if (stringOrNothing) {
    stringOrNothing; // is string
}
/* #endregion */