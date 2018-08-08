// Conditional Types - Added TS 2.8

// Looks like a ternay operator
// type example = T extends U ? X : Y;
// The type above means when T is assignable to U the type is X, otherwise the type is Y.


type TypeName<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
    "object";

type T0 = TypeName<string>;  // "string"
type T1 = TypeName<"a">;  // "string"
type T2 = TypeName<true>;  // "boolean"
type T3 = TypeName<() => void>;  // "function"
type T4 = TypeName<string[]>;  // "object"

// Sometimes the resolution is deferred
declare function f<T extends boolean>(x: T): T extends true ? string : number;

let x = f(Math.random() < 0.5) // Type is ???
let x2 = f(true) // Type is ???


interface Foo {
    propA: boolean;
    propB: boolean;
}

declare function f<T>(x: T): T extends Foo ? string : number;

function foo<U>(x: U) {
    let a = f(x); // Types is ???

    // This assignment is allowed though!
    let b: string | number = a;
}




// Distributive
type T10 = TypeName<string | (() => void)>;  // "string" | "function"
type T11 = TypeName<string> | TypeName<(() => void)>;  // "string" | "function"

// Remove types from T that are assignable to U
type Diff<T, U> = T extends U ? never : T;

type d1 = Diff<'a' | 'b', 'b'>;
type d2 = ('a' extends 'b' ? never : 'a') | ('b' extends 'b' ? never : 'b')
type d3 = never | 'b';

// Remove null and undefined from T
type NonNullable<T> = Diff<T, null | undefined>;

type numOrNull = number | null;
type num = NonNullable<numOrNull>






// Inference
type ReturnType<T> = (T extends (...args: any[]) => infer R) ? R: any;


type myPromise  = Promise<number>;
type UnwrapPromise<G> = G extends Promise<infer U> ? U : never;
type unwrapped = UnwrapPromise<myPromise>;


// Predefined conditional types
// TypeScript 2.8 adds several predefined conditional types to lib.d.ts:

// Exclude<T, U> – Exclude from T those types that are assignable to U.
// Extract<T, U> – Extract from T those types that are assignable to U.
// NonNullable<T> – Exclude null and undefined from T.
// ReturnType<T> – Obtain the return type of a function type.
// InstanceType<T> – Obtain the instance type of a constructor function type.