import 'zone.js';

const LOG = (num: number, message: any, ...other: any[]) => {
    console.log.call(undefined, num, message, ...other)
}

const rootZone = Zone.current;
LOG(0, rootZone.name); // <root>

const zone1 = rootZone.fork({name: "Zone 1"});

LOG(1, Zone.current.name); // <root>

zone1.run(() => {
    LOG(2, Zone.current.name); // Zone 1
    LOG(3, Zone.current.parent.name); // <root>

    setTimeout(() => {
        LOG(4, Zone.current.name); // Zone 1
    }, 1);
});





// Creating a ZoneSpec
class MySpec implements ZoneSpec {
    name: string = "MySpec"

    constructor(private shouldSwallowTasks = false) {

    }

    properties?: { [key: string]: any; } | undefined;
    onFork?: ((parentZoneDelegate: ZoneDelegate, currentZone: Zone, targetZone: Zone, zoneSpec: ZoneSpec) => Zone) | undefined;
    onIntercept?: ((parentZoneDelegate: ZoneDelegate, currentZone: Zone, targetZone: Zone, delegate: Function, source: string) => Function) | undefined;
    onInvoke?: ((parentZoneDelegate: ZoneDelegate, currentZone: Zone, targetZone: Zone, delegate: Function, applyThis: any, applyArgs: any[], source: string) => any) | undefined;
    onHandleError?: ((parentZoneDelegate: ZoneDelegate, currentZone: Zone, targetZone: Zone, error: any) => boolean) | undefined;
    onScheduleTask(parentZoneDelegate: ZoneDelegate, currentZone: Zone, targetZone: Zone, task: Task): Task {
        console.log(`Got a ${task.type}`);

        // If you don't pass it along, you swallow this task. You're now responsible for executing the task.
        if (!this.shouldSwallowTasks) {
            parentZoneDelegate.scheduleTask(targetZone, task);
        }
        return task;
    };
    onInvokeTask?: ((parentZoneDelegate: ZoneDelegate, currentZone: Zone, targetZone: Zone, task: Task, applyThis: any, applyArgs: any) => any) | undefined;
    onCancelTask?: ((parentZoneDelegate: ZoneDelegate, currentZone: Zone, targetZone: Zone, task: Task) => any) | undefined;
    onHasTask?: ((parentZoneDelegate: ZoneDelegate, currentZone: Zone, targetZone: Zone, hasTaskState: HasTaskState) => void) | undefined;
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





// Doesn't work with async/await <https://github.com/angular/zone.js/issues/715>
const zone = Zone.current.fork({
    name: 'test-zone',
  });
  zone.run(async () => {
    LOG(5, Zone.current.name);
    await Promise.resolve();

    // When target is set to es2017 or above, this fails to work (for now)
    LOG(6, Zone.current.name);
  });