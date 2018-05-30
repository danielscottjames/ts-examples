const myConst = 7;
// myConst = 8;
// Compiler Error: Cannot assign to 'myConst' because it is a constant or a read - only property.


// TRY THIS: in Chrome's console, create a const, and try to modify it
// Runtime Error: Uncaught TypeError: Assignment to constant variable.


const myConstObject = {
    a: 7
};
myConstObject.a = 8; // Totally allowed
// myConstObject = { a: 7 };