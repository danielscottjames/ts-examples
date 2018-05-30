class LoggerFactory {
    private messageNumber = 0;

    getPrefix() {
        return `${this.messageNumber++}::`;
    }

    createLoggerFunction(scope) {
        return function (message) {
            // WARNING:: In a regular function, `this` refers to the calling scope
            // Why does it do that, because ¯\_(ツ)_/¯
            // Therefore, `this.getFactoryName()` could throw an error! :O
            // Notice that TypeScript correctly infers the type of `this` as `any`
            console.log(`${this.getPrefix()}::${scope}::${message}`);
        }
    }

    createLoggerFatFunction(scope) {
        return (message) => {
            // `this` refers to the scope in which this closure was defined.
            // NOTE: Look at the compiled output (pre-ES6) and notice
            //       how this closure gets compiled.
            // Notice that TypeScript is able to correctly infer the type of `this`
            console.log(`${this.getPrefix()}::${scope}::${message}`);
        }
    }
}

const factory = new LoggerFactory();
const normalLogger = factory.createLoggerFunction("Normal");
const fatLogger = factory.createLoggerFatFunction("Fat");

const messages = ["I", "am", "fat?"];
// messages.forEach(normalLogger);
// Uncaught TypeError: this.getFactoryName is not a function


// You can bind a `this` value to a function
messages.forEach(normalLogger.bind(factory))

// Or you can just use fat arrow functions
messages.forEach(fatLogger);