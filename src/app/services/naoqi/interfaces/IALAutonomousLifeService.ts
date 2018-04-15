/**
 * The interface of the ALAutonomousLife service.
 * @author Guillaume Quittet
 * @interface
 */
export interface IALAutonomousLifeService {

  /**
   * Get the name of the focused activity.
   * @returns {Promise<any>} The name of the focused activity.
   */
  focusedActivity(): Promise<any>;

  /**
   * Get the current state of autonomous life.
   * @returns {Promise<any>} The current state of autonomous life.
   */
  getState(): Promise<any>;

  /**
   * Lets the developer manually set limited state changes in AutonomousLife.
   * @param state The new state that will be apply.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  setState(state: string): Promise<any>;

  /**
   * Stop all the activities.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  stopAll(): Promise<any>;

  /**
   * Stop the focused activity.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  stopFocus(): Promise<any>;

  /**
   * Switch the focus to another activity.
   * @param activityName The name of the activity to switch to.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  switchFocus(activityName: string): Promise<any>;

}



