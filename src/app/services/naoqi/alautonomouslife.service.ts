import { Injectable } from "@angular/core";

import { ALModuleService } from "./almodule.service";
import { IALAutonomousLifeService } from "./interfaces/IALAutonomousLifeService";
import { QiService } from "./qi.service";

@Injectable()
export class ALAutonomousLifeService extends ALModuleService implements IALAutonomousLifeService {

  focusedActivity(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAutonomousLife => ALAutonomousLife.focusedActivity().then(result => resolve(result), error => reject(error))));
  }

  getState(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAutonomousLife => ALAutonomousLife.getState().then(result => resolve(result), error => reject(error))));
  }

  setState(state: string): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAutonomousLife => ALAutonomousLife.setState(state).then(result => resolve(result), error => reject(error))));
  }

  stopAll(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAutonomousLife => ALAutonomousLife.stopAll().then(result => resolve(result), error => reject(error))));
  }

  stopFocus(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAutonomousLife => ALAutonomousLife.stopFocus().then(result => resolve(result), error => reject(error))));
  }

  switchFocus(activityName: string): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAutonomousLife => ALAutonomousLife.switchFocus(activityName).then(result => resolve(result), error => reject(error))));
  }

}