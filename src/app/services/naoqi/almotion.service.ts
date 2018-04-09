import { IALMotionService } from "./interfaces/IALMotionService";
import { ALModuleService } from "./almodule.service";
import { QiService } from "./qi.service";

export class ALMotionService extends ALModuleService implements IALMotionService {

  closeHand(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  openHand(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  getStiffnesses(names: string[]): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALMotion => ALMotion.getStiffnesses(names).then(result => resolve(result), error => reject(error))));
  }

  rest(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALMotion => ALMotion.rest().then(result => resolve(result), error => reject(error))));
  }

  robotIsWakeUp(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALMotion => ALMotion.robotIsWakeUp().then(result => resolve(result), error => reject(error))));
  }

  setStiffnesses(names: string[], stiffnessList: number[]): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALMotion => ALMotion.stiffnessInterpolation(names, stiffnessList).then(result => resolve(result), error => reject(error))));
  }

  stiffnessInterpolation(names: string[], stiffnessList: number[], timeList: number[]): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALMotion => ALMotion.stiffnessInterpolation(names, stiffnessList, timeList).then(result => resolve(result), error => reject(error))));
  }

  wakeUp(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALMotion => ALMotion.wakeUp().then(result => resolve(result), error => reject(error))));
  }

}