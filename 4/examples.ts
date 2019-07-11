/* #region  Schedule a new task */
setTimeout(() => {
    console.log("In Timeout");
}, 100);
console.log("After setTimeout");
/* #endregion */

/* #region  No Preemption */
setTimeout(() => {
    console.log("In Timeout");
}, 100);
console.log("After setTimeout");
if (Math.random() >= 0) { // (random() to trick TypeScripts control flow analysis)
    while (true);
}

// Try this, run an infinite loop in a browser tab

/* #endregion */

/* #region  Common Mistake */
//(Node throws error, run in Browser)

const log = () => console.log("In Timeout");
// @ts-ignore
setTimeout(log(), 100);
console.log("After setTimeout");

/* #endregion */

/* #region  Other source of async tasks */
import * as fs from 'fs';
// Other common sources: file system, network requests, Mouse/Keyboard events, requestAnimationFrame, etc...

fs.readFile('hello.txt', (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log(result.toString());
    }
});

setTimeout(() => console.log("In timeout"), 0);

console.log("After readFile");

/* #endregion */

/* #region  Question 1 - Promises */
// Which order do they log?

const myPromise = new Promise<number>((resolve) => {
    console.log("#1: In Promise constructor callback.")
    resolve(42);
});
console.log("#2: Before myPromise.then");
myPromise.then((result) => console.log(`#3: Promise result: ${result}`));
console.log("#4: After myPromise.then");

/* #endregion */

/* #region  Question 2 */
// Which order do they log?

Promise.resolve(17).then((result) => console.log(`#1: Promise result: ${result}`));
console.log("#2: After myPromise.then");

/* #endregion */

/* #region  Question 3 */
// Which order do they log?

setTimeout(() => {
    console.log("#1: In Timeout");
}, 0);
console.log("#2: After timeout");
Promise.resolve().then(() => console.log("#3: In promise.then"));
console.log("#4: After promise.then()");

/* #endregion */

/* #region  promisify */
// Callbacks suck, so they invented promisify (only in Node)
import * as util from 'util';
var promisify = util.promisify;
import * as fs from 'fs';
var readFile = promisify(fs.readFile);

const promiseResult = readFile('./hello.txt');
promiseResult
    .then((result) => console.log(result.toString()))
    .catch(e => {
        console.log(e);
    });

/* #endregion */

/* #region  async/await */
// Promises suck so they invented async/await
import * as util from 'util';
var promisify = util.promisify;
import * as fs from 'fs';
var readFile = promisify(fs.readFile);

(async () => {
    try {
        const result = await readFile('./hello.txt');
        console.log(result.toString());
    } catch (e) {
        console.log(e);
    }
})();

/* #endregion */

/* #region  Question 4 */
// Which order do they log?

(async () => {
    await Promise.resolve().then(() => console.log('#1: Promise.then'));
    console.log('#2: after await');
})();

/* #endregion */