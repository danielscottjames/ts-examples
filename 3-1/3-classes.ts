class MyClass {
    // Implied `private firstName;`
    private lastName: string;

    constructor(private firstName: string, lastName: string) {
        // Implied `this.firstName = firstName;`
        this.lastName = lastName.toUpperCase();
    }

    public whoAmI() {
        return `${this.firstName} ${this.lastName}`;
    }
}

const myObject = new MyClass("Daniel", "James");
console.log(myObject.whoAmI()); // -> Daniel JAMES




// Classes used to not be as easy...
// Try compiling this with tsconfig target of <= ES5
// and notice that the above class gets transpiled down to essentially this
function MyOldStyleClass(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName.toUpperCase();
}
MyOldStyleClass.prototype.whoAmI = function() {
    return `${this.firstName} ${this.lastName}`;
}

const myObject2 = new MyOldStyleClass("Daniel", "James");
console.log(myObject2.whoAmI()); // -> Daniel JAMES






// Type Narrowing
const myAnyClass = new MyClass("a", "b") as any;
if (myAnyClass instanceof MyClass) {
    // Notice that instanceof is a runtime check
    // Also notice that MyClass is a value (It's a special function)
    myAnyClass.whoAmI();
}






// Constructor Type
function classFactory<C>(classConstructor: (new (...args: any[]) => C), ...args: any[]): C {
    return new classConstructor(...args);
}

if (classFactory(MyClass, "a", "b") instanceof MyClass) {
    console.log("true!");
}

// Where is this used? All over in our injector code! -- Also decorators
// Anyone remember p# functions?
export function p1<T, A>(
    klass: new (
        p1: A,
    ) => T,
    a: ((...p1: any[]) => T)
) {
    // Do injector stuff
}

// Class Decorator (This is TypeScript, NOT JavaScript)
function ClassDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
    return class extends constructor {
        toString() {
            return "I've been decorated!";
        }
    }
}

@ClassDecorator
class AClass {
}

console.log((new AClass()).toString());







// Inheritance
class MyChildClass extends MyClass {
    constructor(firstName: string, lastName: string, private age: number) {
        super(firstName, lastName);
    }

    public whoAmI() {
        return `${super.whoAmI()} and I am ${this.age} years old.`;
    }
}