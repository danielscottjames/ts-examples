function whatIsThis() {
    console.log("this is ", this.toString());
}

whatIsThis(); // -> this is [object global]
// Would be Window in a browser.
// Would be undefined and throw an error in `use strict` mode;

const testObj = {
    toString() {
        return "testObj";
    },
    run1: whatIsThis,
    run2: () => {
        whatIsThis();
    }
}
testObj.run1(); // -> this is ???
testObj.run2(); // -> this is ???



// You can use `apply` to call a function with any `this`
// You can use `bind` to create a new function where `this` is always what you defined.
whatIsThis.apply(7); // -> this is 7
const bound = whatIsThis.bind("bound");
bound(); // -> this is bound




// Fat arrow functions always have the same `this`
const person = new (class {
    constructor(private name: string) {
    }

    normalHello() {
        console.log("My name is ", this.name);
    }

    fatHello = () => {
        console.log("My name is ", this.name);
    }
})("Jonas");

person.normalHello(); // -> My name is Jonas
person.fatHello(); // -> My name is Jonas
person.normalHello.bind({name: "Sam"})(); // My name is ???
person.fatHello.bind({name: "Sam"})(); // My name is ???


// Create your own basic `bind` with `apply`
function myBind(fn: Function, _this: any) {
    return function () {
        return fn.apply(_this);
    }
};

myBind(person.normalHello, {name: "Chris"})(); // -> My name is Chris