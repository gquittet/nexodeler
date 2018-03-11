export interface IIP {

  /**
   * Verify if the IP address is valid.
   * @return {boolean} True or False if the IP address is valid or not.
   */
  isValid();

  /**
   * Return a string representation of an IP address.
   * @return {string} A string representation of an IP address.
   */
  toString();
}