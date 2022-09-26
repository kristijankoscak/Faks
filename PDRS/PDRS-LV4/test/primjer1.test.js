// const assert = require("chai").assert;
// /** Import simple App class */
// const App = require("./../primjer1");
// let quotes = [
//   "The only thing that overcomes hard luck is hard work.",
//   "A good home must be made, not bought.",
//   "Nostalgia isn't what it used to be."
// ];
// /** Init App class object */
// let testApp = new App(quotes);
// console.log(testApp.addQuote("Ozenjen sam kao momak zivim"));
// describe("Random Generator Class unit test: ", function () {
//   describe("newQuote() method:", function () {
//     it("newQuote() mora vratiti recenicu znakovnog tipa + postoje recenice ulisti", function () {
//       assert.isString(testApp.newQuote());
//     });
//     it("newQuote() vraca definiranu poruku ukoliko nema recenica u listi", function () {
//       /** Creating new empty list */
//       let emptyList = [];
//       /** Init new test object that is inside it-scope */
//       let innerTestApp = new App(emptyList);
//       assert.equal(
//         innerTestApp.newQuote(),
//         "Quote list is empty, please add quote"
//       );
//     });
//   });
//   describe("addQuote() method:", function () {
//     it("addQuote() mora vratiti status 200 ako je poruka spremljena", function () {
//       let testStatus = testApp.addQuote("Ozenjen sam kao momak zivim");
//       assert.isNumber(testStatus);
//       assert.equal(testStatus, 200);
//     });
//     it("addQuote() vraća grešku ukoliko prosljeđeni parametar nije znakovnitip", function () {
//       assert.throws(() => {
//         testApp.addQuote(1234123);
//       }, Error);
//     });
//   });
//   describe("removeQuote() method:", function () {
//     it("removeQuote() mora vratiti status true ako rečenica postoji iobrisana iz liste", function () {
//       let testStatus = testApp.removeQuote(
//         "Nostalgia isn't what it used to be."
//       );
//       assert.isBoolean(testStatus);
//       assert.equal(testStatus, true);
//     });
//     it("removeQuote() mora vratiti status false ako je rečenica ne postojiu listi", function () {
//       let testStatus = testApp.removeQuote("To je bilo tamo.. mdaa");
//       assert.isBoolean(testStatus);
//       assert.equal(testStatus, false);
//     });
//     it("removeQuote() vraća grešku ukoliko prosljeđeni parametar nijeznakovni tip", function () {
//       assert.throws(() => {
//         testApp.removeQuote(1234123);
//       }, Error);
//     });
//   });
// });
