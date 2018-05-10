export interface IALRobotPosture {

  /**
   * Get all the postures of the robots.
   * @returns {Promise<any>} A promise with an array that contains the postures of the robot.
   */
  getPosturesList(): Promise<any>;

  /**
   * Returns the name of the current predefined postures.
   * @returns {Promise<any>} The name of the current posture.
   */
  getPosture(): Promise<any>;

  /**
   * Set the posture of the robot.
   * @param postureName The name of the new posture.
   * @param speed The speed of the change [0.0, 1.0].
   * @returns {Promise<any>} A promise with the result of this action.
   */
  goToPosture(postureName: string, speed: number): Promise<any>;

  /**
   * Stop the current move.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  stopMove(): Promise<any>;
}