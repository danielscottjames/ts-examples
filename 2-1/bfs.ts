declare interface Dep<G> {
    value: G,
    children: Dep<G>[]
}

const bfs = <G>(start: Dep<G>, value: G) => {
    const queue: Dep<G>[] = [start, ...start.children];
    const visited = new Set<Dep<G>>();

    while (queue.length > 0) {
        let next = queue.shift()!; // Is it safe to use the `!` not-null assertion operator here?
        if (visited.has(next)) {
            continue;
        }

        visited.add(next);
        // console.log(`visiting ${next.value}`);
        if (next.value == value) {
            return true;
        }
        queue.push(...next.children);
    }

    return false;
}

class NumberNode {
    constructor(public value: number, public children: NumberNode[] = []) {}
}

const d7 = new NumberNode(7);
const d6 = new NumberNode(6);
const d5 = new NumberNode(5);
const d4 = new NumberNode(4);
const d3 = new NumberNode(3, [d6, d7]);
const d2 = new NumberNode(2, [d4, d5]);
const d1 = new NumberNode(1, [d2, d3]);
console.log(bfs(d1, 7));





// What is the runtime complexity of our dfs function?
for (let i = 100; i < 500; i++) {
    let start = new NumberNode(0);
    for (var j = 1; j <= i*100; j++) {
        const next = new NumberNode(j);
        start.children.push(next);
    }
    
    let startT = new Date().getTime();
    bfs(start, -1);
    let end = new Date().getTime() - startT;
    console.log(`${j}\t${end}`);
}






// console.log(typeof []); // What is the type of an Array?