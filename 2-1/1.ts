declare var global: any;

(() => {
    // Basic Types
    const a: string = "a string";
    const b: number = 7;
    const c: boolean = true;


    // Object Types
    const obj: {
        name: string,
        age: number
    } = {
        name: "Godzilla",
        age: 4593
    }


    // Array Types
    const myArray: number[] = [1, 2, 3];

    // Tuple Types (Tuples ARE arrays)
    const myTwoTuple: [string, number] = ["Godzilla", 4593];

    // Tuples help with type inference
    const myName/*: string*/ = myTwoTuple[0];

    // Common Error, the following is a One Tuple type, not an array
    const myOneTuple: [string] = ["one", "two"];


    // Function types
    const basicFunc: () => void = () => {};
    const predicate: (a: number, b: number) => boolean = function(a: number, b: number): boolean {
        return a+b == 0;
    }


    // Interfaces
    interface Person {
        name: string;
        age: number;
    }

    function doSomethingWithPerson(p: Person) {
        return `${p.name} is ${p.age}`
    }


    // string index signatures
    const plainObject: {
        [key: string]: number
    } = {
        'anyString': 7,
        // ...
    };




    // Lesser known:

    // Index type -- extract types for specific properties
    type personNameType = Person["name"];

    // Mapped type -- generate properties
    type mappedType = {
        [k in keyof Person]: boolean
    }
})();

(() => {
    // What about literals?

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



    // Read Unions and Intersections at this point




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
})();

(() => {
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
})();


(() => {
    // Generics

    function filter<T>(arr: T[], pred: (a: T) => boolean): T[] {
        let r: T[] = [];
        arr.forEach(item => {
            if (pred(item)) {
                r.push(item);
            }
        });

        return r;
    }


    interface Turtle {
        big: boolean;
        color: string
        numLegs: number;
        swim: () => void;
    }
    interface Potato {
        big: boolean;
        color: string;
        isPotato: true;
    }

    // Using `extends` to narrow possible generic types
    function makeBigGeneric<P extends Potato>(p: P): P {
        p.big = true;
        return p;
    }

    function makeBigNotGeneric(p: Potato) {
        p.big = true;
        return p;
    }

    const myPoturtle = {} as Potato&Turtle;
    const r1 = makeBigGeneric(myPoturtle);
    const r2 = makeBigNotGeneric(myPoturtle);


    // Type Safety when using global config object (see getconfig.ts)
    interface ConfigKeys {
        'size': number;
        'color': string;
    };
    function getConfig<K extends keyof ConfigKeys>(key: K): ConfigKeys[K] {
        return global.config[key];
    }

    const size = getConfig('size');
})();


(() => {
    // Type Guards and Discrimination
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
})();

(() => {
    // Nullability -- often with a union with |undefined or |null
    // More about this with strictNullChecks

    const stringOrNothing: string|undefined = undefined as string|undefined;
    if (stringOrNothing) {
        stringOrNothing; // is string
    }

    // Optional parameters, with ?
    function doSomething(a: number, b?: boolean) {
    }

    // Default optional parameters;
    function doSomething2(a: number, b = true) {
    }

    // In interfaces, with ?
    interface Shape {
        corners: number;
        color?: string;
    }
})();