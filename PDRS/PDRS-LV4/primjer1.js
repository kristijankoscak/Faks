// class RandomGenerator {
//   constructor(quotes) {
//     this.quotes = quotes;
//   }
//   newQuote() {
//     let quotes = this.quotes;
//     if (quotes.length > 0) {
//       let randNumber = Math.floor(Math.random() * quotes.length);
//       return quotes[randNumber];
//     } else {
//       return "Quote list is empty, please add quote";
//     }
//   }
//   removeQuote(quote) {
//     let quotes = this.quotes;
//     if (typeof quote === "string" || quote instanceof String) {
//       if (quotes.includes(quote)) {
//         return true;
//       } else {
//         return false;
//       }
//     } else {
//       throw new Error("Wrong type - argument is not a string");
//     }
//   }
//   addQuote(quote) {
//     let quotes = this.quotes;
//     if (typeof quote === "string" || quote instanceof String) {
//       quotes.push(quote);
//       return 200;
//     } else {
//       throw new Error("Wrong type - argument is not a string");
//     }
//   }
// }
// module.exports = RandomGenerator;
