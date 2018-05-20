import { Injectable } from "@angular/core";
import { ALModuleService } from "./almodule.service";
import { QiService } from "./qi.service";


/**
 * The service implementation of the ALAutonomousLife NAOqi class.
 * @author Guillaume Quittet
 */
@Injectable()
export class ALAutonomousLifeService extends ALModuleService {

  /**
   * Get the name of the focused activity.
   * @returns {Promise<any>} The name of the focused activity.
   */
  focusedActivity(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAutonomousLife => ALAutonomousLife.focusedActivity().then(result => resolve(result), error => reject(error))));
  }

  /**
   * Get the current state of autonomous life.
   * @returns {Promise<any>} The current state of autonomous life.
   */
  getState(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAutonomousLife => ALAutonomousLife.getState().then(result => resolve(result), error => reject(error))));
  }

  /**
   * Lets the developer manually set limited state changes in AutonomousLife.
   * @param state The new state that will be apply.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  setState(state: string): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAutonomousLife => ALAutonomousLife.setState(state).then(result => resolve(result), error => reject(error))));
  }

  /**
   * Stop all the activities.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  stopAll(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAutonomousLife => ALAutonomousLife.stopAll().then(result => resolve(result), error => reject(error))));
  }

  /**
   * Stop the focused activity.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  stopFocus(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAutonomousLife => ALAutonomousLife.stopFocus().then(result => resolve(result), error => reject(error))));
  }

  /**
   * Switch the focus to another activity.
   * @param activityName The name of the activity to switch to.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  switchFocus(activityName: string): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAutonomousLife => ALAutonomousLife.switchFocus(activityName).then(result => resolve(result), error => reject(error))));
  }
}