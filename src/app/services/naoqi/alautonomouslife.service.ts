import { Injectable } from "@angular/core";

import { ALModuleService } from "./almodule.service";
import { IALAutonomousLifeService } from "./interfaces/IALAutonomousLifeService";
import { QiService } from "./qi.service";

/**
 * The service implementation of the ALAutonomousLife NAOqi class.
 * @author Guillaume Quittet
 * @implements
 */
@Injectable()
export class ALAutonomousLifeService extends ALModuleService implements IALAutonomousLifeService {

  /**
   * @override
   */
  focusedActivity(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAutonomousLife => ALAutonomousLife.focusedActivity().then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  getState(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAutonomousLife => ALAutonomousLife.getState().then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  setState(state: string): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAutonomousLife => ALAutonomousLife.setState(state).then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  stopAll(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAutonomousLife => ALAutonomousLife.stopAll().then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  stopFocus(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAutonomousLife => ALAutonomousLife.stopFocus().then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  switchFocus(activityName: string): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAutonomousLife => ALAutonomousLife.switchFocus(activityName).then(result => resolve(result), error => reject(error))));
  }
}