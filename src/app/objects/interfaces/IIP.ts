/**
 * The interface of the IP object.
 * @author Guillaume Quittet
 * @interface
 */
export interface IIP {

  /**
   * Verify if the IP address is valid.
   * @returns {boolean} True or False if the IP address is valid or not.
   */
  isValid();

  /**
   * Return a string representation of an IP address.
   * @returns {string} A string representation of an IP address.
   */
  toString();
}