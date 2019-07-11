let x = 0;

async function test() {
    const result = await 2;
    x += result;
    console.log(x);
}

test();
x += 1;
console.log(x);