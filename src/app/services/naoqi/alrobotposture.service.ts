import { ALModuleService } from "./almodule.service";
import { IALRobotPosture } from "./interfaces/IALRobotPosture";
import { QiService } from "./qi.service";

export class ALRobotPosture extends ALModuleService implements IALRobotPosture {

  /**
   * @override
   */
  getPosturesList(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALRobotPosture => ALRobotPosture.getPostureList().then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  getPosture(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALRobotPosture => ALRobotPosture.getPosture().then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  goToPosture(postureName: string, speed: number): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALRobotPosture => ALRobotPosture.goToPosture(postureName, speed).then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  stopMove(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALRobotPosture => ALRobotPosture.stopMove().then(result => resolve(result), error => reject(error))));
  }
}