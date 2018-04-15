import { IIP } from "./interfaces/IIP";

export class IP implements IIP {

  /**
   * Create an IP address object.
   * @param content The different parts of the IP address.
   * @constructor
   */
  constructor(private content: Array<string>) {
    if (content.length > 4) {
      throw "Invalid IP format.";
    }
  }

  /**
   * Return true if the number is between two other numbers.
   * @param n The number to test.
   * @param a The lower number.
   * @param b The higher number.
   * @returns {boolean} Return if the number is between two numbers.
   */
  private isBetween(n, a, b): boolean {
    return (parseInt(n) >= a) && (parseInt(n) <= b);
  }

  /**
   * Test if an IP address is valid.
   * @returns {boolean} True if the IP address is valid else False.
   */
  isValid(): boolean {
    const part = this.content;
    if (part[0] && part[1] && part[2] && part[3]) {
      return this.isBetween(part[0], 0, 255) && this.isBetween(part[1], 0, 255) && this.isBetween(part[2], 0, 255) && this.isBetween(part[3], 0, 255);
    }
    return false;
  }

  /**
   * Return the string representation of the IP address.
   * @returns {string} The string representation of the IP address.
   */
  toString(): string {
    return this.content[0] + '.' + this.content[1] + '.' + this.content[2] + '.' + this.content[3];
  }
}