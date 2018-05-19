import { Injectable } from "@angular/core";
import { ALModuleService } from "./almodule.service";
import { QiService } from "./qi.service";

/**
 * The service implementation of the ALRobotPosture NAOqi class.
 * @author Guillaume Quittet
 */
@Injectable()
export class ALRobotPosture extends ALModuleService {

  /**
   * Get all the postures of the robots.
   * @returns {Promise<any>} A promise with an array that contains the postures of the robot.
   */
  getPosturesList(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALRobotPosture => ALRobotPosture.getPostureList().then(result => resolve(result), error => reject(error))));
  }

  /**
   * Returns the name of the current predefined postures.
   * @returns {Promise<any>} The name of the current posture.
   */
  getPosture(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALRobotPosture => ALRobotPosture.getPosture().then(result => resolve(result), error => reject(error))));
  }

  /**
   * Set the posture of the robot.
   * @param postureName The name of the new posture.
   * @param speed The speed of the change [0.0, 1.0].
   * @returns {Promise<any>} A promise with the result of this action.
   */
  goToPosture(postureName: string, speed: number): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALRobotPosture => ALRobotPosture.goToPosture(postureName, speed).then(result => resolve(result), error => reject(error))));
  }

  /**
   * Stop the current move.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  stopMove(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALRobotPosture => ALRobotPosture.stopMove().then(result => resolve(result), error => reject(error))));
  }
}