export interface IALMotionService {

  /**
   * Close the hands of the robot.
   * @return {Promise<any>} A promise with the result of this action.
   */
  closeHand(): Promise<any>;

  /**
   * Gets stiffness of a joint or group of joints.
   * @param {string[]} names The names of a group of joints.
   * @return {Promise<any>} One or more stiffnesses [0.0, 1.0].
   */
  getStiffnesses(names: string[]): Promise<any>;

  /**
   * Open the hands of the robot.
   * @return {Promise<any>} A promise with the result of this action.
   */
  openHand(): Promise<any>;

  /**
   * Set the motors of the robot to the rest state.
   * @return {Promise<any>} A promise with the result of this action.
   */
  rest(): Promise<any>;

  /**
   * Get if the robot is wake up or not.
   * @return {Promise<any>} True if the robot is awake.
   */
  robotIsWakeUp(): Promise<any>;

  /**
   * Sets the stiffness of one or more joints.
   * @param {string[]} names The names of a group of joints.
   * @param {number[]} stiffnessList One or more stiffnesses [0.0, 1.0].
   * @return {Promise<any>} A promise with the result of this action.
   */
  setStiffnesses(names: string[], stiffnessList: number[]): Promise<any>;

  /**
   * Interpolates one or multiple joints to a targeted stiffness or along timed trajectories of stiffness.
   * @param {string[]} names The names of a group of joints.
   * @param {number[]} stiffnessList One or more stiffnesses [0.0, 1.0].
   * @param {number[]} timeList List of differents times (in second).
   * @return {Promise<any>} A promise with the result of this action.
   */
  stiffnessInterpolation(names: string[], stiffnessList: number[], timeList: number[]): Promise<any>;

  /**
   * Wake up the robot.
   * @return {Promise<any>} A promise with the result of this action.
   */
  wakeUp(): Promise<any>;


}