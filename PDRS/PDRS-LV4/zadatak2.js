/*
  Potrebno je implementirati funkcionalnosti mehanicke RGB
  tipkovnice. Tipkovnica ima sljedece vrijednosti:
    -trenutna vrijednost frekvencije i boje
    -polje dostupnih boja 
    -vrijednost osvijetljenja tipa broj (0-100),
    -polje frekvencija titranja tipa broj [1000,5000,10000],
    -polje stringova koje predstavlja kombinaciju tipaka, koje
     rade odredene funkcionalnosti na tipkovnici...
     (
       fn+del - vrti boje svijetla u krug (nasumicno), nakon zamjene
       vraca 200, kad zavrsi krug vraca poruku.

       fn+arrowup/arrowdown - pojacava/smanjuje svjetlinu za 5,
        ako je nije u mogucnosti upozorava korisnika, u suprotnom
        vraca 200
       fn+insert -  vraca nasumicno jedan element iz
                    polja frekvencija titranja....
     )
     Ukoliko se preda kriva kombinacija, vraca gresku.
     Takoder, omoguciti nadogradnju trenutnih boja koja vraca 200
     ako je uspjeno,a u suprotnom gresku.
*/

class Keyboard {
  constructor(lightValue, currentColor, currentFrequency) {
    this.frequency = [7000, 5000, 1000];
    this.colors = ["red", "green", "blue", "yellow"];
    this.keyCombinations = ["fn+del", "fn+arrowup", "fn+arrowdown", "fn+ins"];
    if (
      lightValue >= 0 &&
      lightValue <= 100 &&
      this.colors.includes(currentColor) &&
      this.frequency.includes(currentFrequency)
    ) {
      this.lightValue = lightValue;
      this.currentFrequency = currentFrequency;
      this.currentColor = currentColor;
    }
  }
  handleAction(keyCombination) {
    let result;
    switch (keyCombination) {
      case "fn+arrowup":
        result = this.increaseLight();
        break;
      case "fn+arrowdown":
        result = this.decreaseLight();
        break;
      case "fn+del":
        result = this.nextColor();
        break;
      case "fn+ins":
        result = this.nextFrequency();
        break;
      default:
        throw new Error("Illegal key combination.");
    }
    return result;
  }
  increaseLight() {
    if (this.lightValue + 5 <= 100) {
      this.lightValue += 5;
      return 200;
    }
    return "Unable to increase lighting.";
  }
  decreaseLight() {
    if (this.lightValue - 5 >= 0) {
      this.lightValue -= 5;
      return 200;
    }
    return "Unable to decrease lighting.";
  }
  nextColor() {
    let index = this.colors.indexOf(this.currentColor);
    if (index + 1 <= this.colors.length - 1) {
      index++;
      this.currentColor = this.colors[index];
      return 200;
    } else {
      return "Loop finished, starting again.";
    }
  }
  nextFrequency() {
    let randNumber = Math.floor(
      Math.random() * Math.floor(this.frequency.length)
    );
    this.currentFrequency = this.frequency[randNumber];
    return this.currentFrequency;
  }

  updateColors(color) {
    if (typeof color === "string") {
      this.colors.push(color);
      return 200;
    }
    throw new Error("Illegal color value.");
  }
}
module.exports = Keyboard;
