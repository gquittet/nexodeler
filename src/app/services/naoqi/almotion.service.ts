import { Injectable } from "@angular/core";
import { ALModuleService } from "./almodule.service";
import { QiService } from "./qi.service";


/**
 * The service implementation of the ALMotion NAOqi class.
 * @author Guillaume Quittet
 */
@Injectable()
export class ALMotionService extends ALModuleService {

  /**
   * Close the hands of the robot.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  closeHand(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  /**
   * Gets stiffness of a joint or group of joints.
   * @param {string[]} names The names of a group of joints.
   * @returns {Promise<any>} One or more stiffnesses [0.0, 1.0].
   */
  getStiffnesses(names: string[]): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALMotion => ALMotion.getStiffnesses(names).then(result => resolve(result), error => reject(error))));
  }

  /**
   * Makes the robot move to the given position.
   * @param x Distance in meters along the x axis.
   * @param y Distance in meters along the y axis.
   * @param theta Rotation around the Z axis in radians [-3.1415 to 3.1415].
   * @returns {Promise<any>} A promise with the result of this action.
   */
  moveTo(x: number, y: number, theta: number): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALMotion => ALMotion.moveTo(x, y, theta).then(result => resolve(result), error => reject(error))));
  }

  /**
   * Open the hands of the robot.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  openHand(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  /**
   * Set the motors of the robot to the rest state.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  rest(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALMotion => ALMotion.rest().then(result => resolve(result), error => reject(error))));
  }

  /**
   * Get if the robot is wake up or not.
   * @returns {Promise<any>} True if the robot is awake.
   */
  robotIsWakeUp(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALMotion => ALMotion.robotIsWakeUp().then(result => resolve(result), error => reject(error))));
  }

  /**
   * Rotate the robot.
   * @param theta Rotation in radians [-3.1415 to 3.1415].
   * @returns {Promise<any>} A promise with the result of this action.
   */
  rotate(theta: number): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALMotion => ALMotion.moveTo(0, 0, theta).then(result => resolve(result), error => reject(error))));
  }

  /**
   * Sets the stiffness of one or more joints.
   * @param {string[]} names The names of a group of joints.
   * @param {number[]} stiffnessList One or more stiffnesses [0.0, 1.0].
   * @returns {Promise<any>} A promise with the result of this action.
   */
  setStiffnesses(names: string[], stiffnessList: number[]): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALMotion => ALMotion.stiffnessInterpolation(names, stiffnessList).then(result => resolve(result), error => reject(error))));
  }

  /**
   * Interpolates one or multiple joints to a targeted stiffness or along timed trajectories of stiffness.
   * @param {string[]} names The names of a group of joints.
   * @param {number[]} stiffnessList One or more stiffnesses [0.0, 1.0].
   * @param {number[]} timeList List of differents times (in second).
   * @returns {Promise<any>} A promise with the result of this action.
   */
  stiffnessInterpolation(names: string[], stiffnessList: number[], timeList: number[]): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALMotion => ALMotion.stiffnessInterpolation(names, stiffnessList, timeList).then(result => resolve(result), error => reject(error))));
  }

  /**
   * Stop the current move of the robot.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  stopMove(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALMotion => ALMotion.stopMove().then(result => resolve(result), error => reject(error))));
  }

  /**
   * Wake up the robot.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  wakeUp(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALMotion => ALMotion.wakeUp().then(result => resolve(result), error => reject(error))));
  }

}