/* #region  Zone.js Basic */
import 'zone.js';

const rootZone = Zone.current;
console.log(0, rootZone.name); // <root>

const zone1 = rootZone.fork({ name: "Zone 1" });

console.log(1, Zone.current.name); // <root>

zone1.run(() => {
    console.log(2, Zone.current.name); // Zone 1
    console.log(3, Zone.current.parent.name); // <root>

    setTimeout(() => {
        console.log(4, Zone.current.name); // Zone 1
    }, 1);
});
/* #endregion */

/* #region  Implementing your own Zone */
import 'zone.js';
// Creating a ZoneSpec
class MySpec implements ZoneSpec {
    name: string = "MySpec"

    constructor(private shouldSwallowTasks = false) {

    }

    onScheduleTask(parentZoneDelegate: ZoneDelegate, currentZone: Zone, targetZone: Zone, task: Task): Task {
        console.log(`Got a ${task.type}`);

        // If you don't pass it along, you swallow this task. You're now responsible for executing the task.
        if (!this.shouldSwallowTasks) {
            parentZoneDelegate.scheduleTask(targetZone, task);
        }
        return task;
    };
}

rootZone.fork(new MySpec(true)).run(() => {
    setTimeout(() => {
        console.log("Will never log");
    }, 0); // Got a ?
    setTimeout(() => {
        console.log("Will never log");
    }, 1); // Got a ?
    Promise.resolve().then(() => {
        console.log("Will never log");
    }); // Got a ?
});
/* #endregion */

/* #region  Zone doesn't work with async/await */
import 'zone.js';
// Doesn't work with async/await <https://github.com/angular/zone.js/issues/715>
const zone = Zone.current.fork({
    name: 'test-zone',
});
zone.run(async () => {
    console.log(Zone.current.name);
    await Promise.resolve();

    // When target is set to es2017 or above, this fails to work (for now)
    console.log(Zone.current.name);
});
/* #endregion */