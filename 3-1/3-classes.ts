class MyClass {
    // Implied `private firstName;`
    private lastName;

    constructor(private firstName, lastName) {
        // Implied `this.myName = myName;`
        this.lastName = lastName.toUpperCase();
    }

    public whoAmI() {
        return `${this.firstName} ${this.lastName}`;
    }
}

const myObject = new MyClass("Daniel", "James");
console.log(myObject.whoAmI()); // -> Daniel JAMES




// Classes used to not be as easy...
function MyOldStyleClass(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName.toUpperCase();
}
MyOldStyleClass.prototype.whoAmI = function() {
    return `${this.firstName} ${this.lastName}`;
}
const myObject2 = new MyOldStyleClass("Daniel", "James");
console.log(myObject2.whoAmI()); // -> Daniel JAMES