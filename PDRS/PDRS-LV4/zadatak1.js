// class CoffeMachine {
//   constructor(coffeAmount, waterAmmount, powerStatus) {
//     if (
//       typeof coffeAmount === "number" &&
//       typeof waterAmmount === "number" &&
//       typeof powerStatus === "boolean"
//     ) {
//       this.coffeAmount = coffeAmount;
//       this.waterAmmount = waterAmmount;
//       this.powerStatus = powerStatus;
//     }
//   }

//   turnMachineOn() {
//     if (this.powerStatus === false) {
//       this.powerStatus = true;
//       return this.powerStatus;
//     }
//     // console.log("Machine is already turned on !");
//     // return this.powerStatus;
//     return "Machine is already turned on !";
//   }
//   turnMachineOff() {
//     if (this.powerStatus === true) {
//       this.powerStatus = false;
//       return this.powerStatus;
//     }
//     // console.log("Machine is already turned off !");
//     // return this.powerStatus;
//     return "Machine is already turned off !";
//   }
//   refill(coffe, water) {
//     if (Number.isInteger(coffe) && Number.isInteger(water)) {
//       this.coffeAmount += coffe; // instead of just '='
//       this.waterAmmount += water; // same...
//       // console.log("Machine refilled !");
//       return 200;
//     }
//     throw new Error("Illegal type");
//   }
//   makeCoffe() {
//     if (this.coffeAmount > 5 && this.waterAmmount > 15) {
//       this.coffeAmount -= 5;
//       this.waterAmmount -= 15;
//     } else {
//       return "Machine is out of coffie or water...";
//     }
//   }
// }
// module.exports = CoffeMachine;
