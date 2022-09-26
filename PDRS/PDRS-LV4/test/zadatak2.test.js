const assert = require("chai").assert;
/** Import simple App class */
const App = require("./../zadatak2");

let frequency = [7000, 5000, 1000];
let colors = ["red", "green", "blue", "yellow"];
let keyCombinations = ["fn+del", "fn+arrowup", "fn+arrowdown", "fn+ins"];

let testApp = new App(72, "red", 5000);

describe("Keyboard Class unit test: ", function () {
  describe("creating Keyboard object: ", function () {
    it("invalid parameters...", function () {
      let innerTestApp = new App(150, "red", 3000);
      assert.equal(innerTestApp.lightValue, undefined);
    });
    it("valid parameters...", function () {
      assert.exists(testApp.lightValue);
    });
  });
  describe("handling action : ", function () {
    it("fn+arrowup + light value is valid...", function () {
      assert.isNumber(testApp.handleAction("fn+arrowup"));
    });
    it("fn+arrowup + light value is invalid...", function () {
      let innerTestApp = new App(96, "red", 5000);
      assert.isString(innerTestApp.handleAction("fn+arrowup"));
    });
    it("fn+arrowdown + light value is valid...", function () {
      assert.isNumber(testApp.handleAction("fn+arrowdown"));
    });
    it("fn+arrowdown + light value is invalid...", function () {
      let innerTestApp = new App(4, "red", 5000);
      assert.isString(innerTestApp.handleAction("fn+arrowdown"));
    });
    it("fn+del + color is red...", function () {
      assert.isNumber(testApp.handleAction("fn+del"));
    });
    it("fn+del + color is last in array...", function () {
      let innerTestApp = new App(4, "yellow", 5000);
      assert.isString(innerTestApp.handleAction("fn+del"));
    });
    it("fn+ins...", function () {
      assert.isNumber(testApp.handleAction("fn+ins"));
    });
    it("invalid key combination...", function () {
      assert.throws(() => {
        testApp.handleAction("he he");
      }, Error);
    });
  });
  describe("updating color : ", function () {
    it("color is valid...", function () {
      assert.isNumber(testApp.updateColors("purple"));
    });
    it("color is invalid...", function () {
      assert.throws(() => {
        testApp.updateColors(101251);
      }, Error);
    });
  });
});
