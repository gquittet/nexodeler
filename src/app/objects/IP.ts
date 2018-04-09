import { IIP } from "./interfaces/IIP";

export class IP implements IIP {

  constructor(private content: Array<string>) {
    if (content.length > 4) {
      throw "Invalid IP format.";
    }
  }

  private isBetween(n, a, b) {
    return (parseInt(n) >= a) && (parseInt(n) <= b);
  }

  isValid() {
    const part = this.content;
    if (part[0] && part[1] && part[2] && part[3]) {
      return this.isBetween(part[0], 0, 255) && this.isBetween(part[1], 0, 255) && this.isBetween(part[2], 0, 255) && this.isBetween(part[3], 0, 255);
    }
    return false;
  }

  toString() {
    return this.content[0] + '.' + this.content[1] + '.' + this.content[2] + '.' + this.content[3];
  }
}