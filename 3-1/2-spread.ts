// Spread operator

function takesManyArguments(...args: any[]) {
    // args is an array
    args.forEach(a => {
        console.log(a);
    });
}

// But you don't pass in an array!
takesManyArguments("a", "b");

// Spread out a list when giving arguments
takesManyArguments(...["a", "b"]);




// Destructure tuples
function makePoint(): [number, number] {
    return [1, 5]
}

const [x, y] = makePoint();
// Essentially
// const r = makePoint;
// const x = r[0];
// const y = r[1];





// Partial Destructure
const myList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const [head, ...rest] = myList;





// Also works for properties on Objects
const myObj = {
    x,
    y
};
const myObj2 = {
    x: x,
    y: y
}

function makePoint2() {
    return {
        x: 1,
        y: 3
    }
}

const {x: x2, x: y2} = makePoint2()
// const r = makePoint2();
// x2 = r.x;
// y2 = r.y;