export interface IALAutonomousLifeService {

  /**
   * Get the name of the focused activity.
   * @return {Promise<any>} The name of the focused activity.
   */
  focusedActivity(): Promise<any>;

  /**
   * Get the current state of autonomous life.
   * @return {Promise<any>} The current state of autonomous life.
   */
  getState(): Promise<any>;

  /**
   * Lets the developer manually set limited state changes in AutonomousLife.
   * @param state The new state that will be apply.
   * @return {Promise<any>} A promise with the result of this action.
   */
  setState(state: string): Promise<any>;

  /**
   * Stop all the activities.
   * @return {Promise<any>} A promise with the result of this action.
   */
  stopAll(): Promise<any>;

  /**
   * Stop the focused activity.
   * @return {Promise<any>} A promise with the result of this action.
   */
  stopFocus(): Promise<any>;

  /**
   * Switch the focus to another activity.
   * @param activityName The name of the activity to switch to.
   * @return {Promise<any>} A promise with the result of this action.
   */
  switchFocus(activityName: string): Promise<any>;

}



