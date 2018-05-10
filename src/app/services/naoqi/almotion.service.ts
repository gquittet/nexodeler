import { Injectable } from "@angular/core";
import { ALModuleService } from "./almodule.service";
import { IALMotionService } from "./interfaces/IALMotionService";
import { QiService } from "./qi.service";


/**
 * The service implementation of the ALMotion NAOqi class.
 * @author Guillaume Quittet
 * @implements
 */
@Injectable()
export class ALMotionService extends ALModuleService implements IALMotionService {

  /**
   * @override
   */
  closeHand(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  /**
   * @override
   */
  openHand(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  /**
   * @override
   */
  getStiffnesses(names: string[]): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALMotion => ALMotion.getStiffnesses(names).then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  moveTo(x: number, y: number, theta: number): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALMotion => ALMotion.moveTo(x, y, theta).then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  rest(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALMotion => ALMotion.rest().then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  rotate(theta: number) {
    return new Promise((resolve, reject) => QiService.call(ALMotion => ALMotion.moveTo(0, 0, theta).then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  robotIsWakeUp(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALMotion => ALMotion.robotIsWakeUp().then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  stopMove(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALMotion => ALMotion.stopMove().then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  setStiffnesses(names: string[], stiffnessList: number[]): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALMotion => ALMotion.stiffnessInterpolation(names, stiffnessList).then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  stiffnessInterpolation(names: string[], stiffnessList: number[], timeList: number[]): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALMotion => ALMotion.stiffnessInterpolation(names, stiffnessList, timeList).then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  wakeUp(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALMotion => ALMotion.wakeUp().then(result => resolve(result), error => reject(error))));
  }

}