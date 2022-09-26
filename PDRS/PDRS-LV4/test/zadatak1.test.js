// const assert = require("chai").assert;
// /** Import simple App class */
// const App = require("./../zadatak1");

// let testApp = new App(50, 50, false);

// describe("Coffe machine Class unit test: ", function () {
//   describe("creating CoffeMachine object: ", function () {
//     it("invalid parameters...", function () {
//       let innerTestApp = new App("mauna", 50, false);
//       assert.equal(innerTestApp.powerStatus, undefined);
//     });
//     it("valid parameters...", function () {
//       assert.exists(testApp.powerStatus);
//     });
//   });
//   describe("turning machine on: ", function () {
//     it("machine is already on...", function () {
//       let innerTestApp = new App(50, 50, true);
//       assert.isString(innerTestApp.turnMachineOn());
//     });
//     it("machine is off...", function () {
//       let innerTestApp = new App(50, 50, false);
//       assert.isBoolean(innerTestApp.turnMachineOn());
//     });
//   });
//   describe("turning machine off: ", function () {
//     it("machine is already off...", function () {
//       let innerTestApp = new App(50, 50, false);
//       assert.isString(innerTestApp.turnMachineOff());
//     });
//     it("machine is on...", function () {
//       let innerTestApp = new App(50, 50, true);
//       assert.isBoolean(innerTestApp.turnMachineOff());
//     });
//   });
//   describe("refilling machine: ", function () {
//     it("integer values...", function () {
//       assert.isNumber(testApp.refill(10, 10));
//     });
//     it("invalid values", function () {
//       assert.throws(() => {
//         testApp.refill(10, "mauna");
//       }, Error);
//     });
//   });
//   describe("making coffe: ", function () {
//     it("available...", function () {
//       let innerTestApp = new App(50, 50, true);
//       let startValue = innerTestApp.coffeAmount;
//       innerTestApp.makeCoffe();
//       assert.equal(innerTestApp.coffeAmount, startValue - 5);
//     });
//     it("not available...", function () {
//       let innerTestApp = new App(5, 50, true);
//       assert.isString(innerTestApp.makeCoffe());
//     });
//   });
// });
