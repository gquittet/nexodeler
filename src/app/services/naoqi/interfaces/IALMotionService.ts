/**
 * The interface of the ALMotion service.
 * @author Guillaume Quittet
 * @interface
 */
export interface IALMotionService {

  /**
   * Close the hands of the robot.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  closeHand(): Promise<any>;

  /**
   * Gets stiffness of a joint or group of joints.
   * @param {string[]} names The names of a group of joints.
   * @returns {Promise<any>} One or more stiffnesses [0.0, 1.0].
   */
  getStiffnesses(names: string[]): Promise<any>;

  /**
   * Makes the robot move to the given position.
   * @param x Distance in meters along the x axis.
   * @param y Distance in meters along the y axis.
   * @param theta Rotation around the Z axis in radians [-3.1415 to 3.1415].
   * @returns {Promise<any>} A promise with the result of this action.
   */
  moveTo(x: number, y: number, theta: number): Promise<any>;

  /**
   * Open the hands of the robot.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  openHand(): Promise<any>;

  /**
   * Set the motors of the robot to the rest state.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  rest(): Promise<any>;

  /**
   * Get if the robot is wake up or not.
   * @returns {Promise<any>} True if the robot is awake.
   */
  robotIsWakeUp(): Promise<any>;

  /**
   * Rotate the robot.
   * @param theta Rotation in radians [-3.1415 to 3.1415].
   * @returns {Promise<any>} A promise with the result of this action.
   */
  rotate(theta: number): Promise<any>;

  /**
   * Sets the stiffness of one or more joints.
   * @param {string[]} names The names of a group of joints.
   * @param {number[]} stiffnessList One or more stiffnesses [0.0, 1.0].
   * @returns {Promise<any>} A promise with the result of this action.
   */
  setStiffnesses(names: string[], stiffnessList: number[]): Promise<any>;

  /**
   * Interpolates one or multiple joints to a targeted stiffness or along timed trajectories of stiffness.
   * @param {string[]} names The names of a group of joints.
   * @param {number[]} stiffnessList One or more stiffnesses [0.0, 1.0].
   * @param {number[]} timeList List of differents times (in second).
   * @returns {Promise<any>} A promise with the result of this action.
   */
  stiffnessInterpolation(names: string[], stiffnessList: number[], timeList: number[]): Promise<any>;

  /**
   * Stop the current move of the robot.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  stopMove(): Promise<any>;

  /**
   * Wake up the robot.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  wakeUp(): Promise<any>;
}