import { Injectable } from '@angular/core';
import { ALModuleService } from './almodule.service';
import { QiService } from './qi.service';


/**
 * The service implementation of the ALSystem NAOqi class.
 * @author Guillaume Quittet
 */
@Injectable()
export class ALSystemService extends ALModuleService {

  /**
   * Get the name of the robot.
   * @returns {Promise<any>} Return the name of the robot.
   */
  getName(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALSystem => ALSystem.robotName().then(result => resolve(result), error => reject(error))));
  }

  /**
   * Get the NAOqi version used by the robot.
   * @returns {Promise<any>} The NAOqi version used by the robot.
   */
  getSystemVersion(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALSystem => ALSystem.systemVersion().then(result => resolve(result), error => reject(error))));
  }

  /**
   * Return the timezone used by the robot.
   * @returns {Promise<any>} The timezone used by the robot.
   */
  getTimezone(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALSystem => ALSystem.timezone().then(result => resolve(result), error => reject(error))));
  }

  /**
     * Reboot the robot.
     * @returns {Promise<any>} The promise with the result of the reboot.
     */
  reboot(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALSystem => ALSystem.reboot().then(result => resolve(result), error => reject(error))));
  }

  /**
   * Set the name of the robot.
   * @param name The new name of the robot.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  setName(name: string): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALSystem => ALSystem.setRobotName(name).then(result => resolve(result), error => reject(error))));
  }

  /**
   * Shutdown the robot.
   * @returns {Promise<any>} The promise with the result of the reboot.
   */
  shutdown(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALSystem => ALSystem.shutdown().then(result => resolve(result), error => reject(error))));
  }
}
