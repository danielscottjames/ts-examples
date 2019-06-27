/* #region  truthy/falsey */
const myTruthyValue = 'truthy';
if (myTruthyValue) {
    console.log('truthy');
}

const myFalsyValue = 0;
console.log(0 || 10);

// @ts-ignore
console.log(1 == '1');

// @ts-ignore
console.log(1 === '1');
/* #endregion */

/* #region quiz */
if (NaN) console.log('truthy');
console.log(NaN == NaN);
// @ts-ignore
console.log('3.2' < 4);
console.log(.1 + .2 == .3);
if (0) console.log('truthy');
if (-1) console.log('truthy');
console.log(null == undefined);
// @ts-ignore
console.log('1' == [1]);
console.log({} == {});
// @ts-ignore
console.log(2 == true);
// @ts-ignore
console.log(1 == true);
// @ts-ignore
console.log(2 == {toString: () => '2'});
/* #endregion */