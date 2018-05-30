class MyClass {
    // Implied `private firstName;`
    private lastName;

    constructor(private firstName, lastName) {
        // Implied `this.myName = myName;`
        this.lastName = lastName.toUpperCase();
    }

    public whoAmI() {
        // Example of Template String Literals
        return `${this.firstName} ${this.lastName}`;
    }
}

const myObject = new MyClass("Daniel", "James");
const myName = myObject.whoAmI();

console.log(myName); // Daniel JAMES