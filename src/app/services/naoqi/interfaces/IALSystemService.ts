/**
 * The interface of the ALSystem service.
 * @author Guillaume Quittet
 * @interface
 */
export interface IALSystemService {

  /**
   * Get the name of the robot.
   * @returns {Promise<any>} Return the name of the robot.
   */
  getName(): Promise<any>;

  /**
   * Get the NAOqi version used by the robot.
   * @returns {Promise<any>} The NAOqi version used by the robot.
   */
  getSystemVersion(): Promise<any>;

  /**
   * Return the timezone used by the robot.
   * @returns {Promise<any>} The timezone used by the robot.
   */
  getTimezone(): Promise<any>;

  /**
   * Reboot the robot.
   * @returns {Promise<any>} The promise with the result of the reboot.
   */
  reboot(): Promise<any>;

  /**
   * Set the name of the robot.
   * @param name The new name of the robot.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  setName(name: string): Promise<any>;

  /**
   * Shutdown the robot.
   * @returns {Promise<any>} The promise with the result of the reboot.
   */
  shutdown(): Promise<any>;

}
