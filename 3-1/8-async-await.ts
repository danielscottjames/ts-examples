(async () => {
    const myPromise = new Promise<number>((resolve, reject) => {
        setTimeout(() => {
            resolve(6);
        }, 1000);
    });

    myPromise.then(r => {
        console.log(r);
    }).catch(e => {
        console.log(e.message);
    });

    console.log("here! (before promise resolves)");

    // Same as
    try {
        console.log(await myPromise);
    } catch (e) {
        console.log(e.message);
    }

    console.log("here! (after promise resolves)");

})();