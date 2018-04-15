import { Injectable } from '@angular/core';

import { ALModuleService } from './almodule.service';
import { IALSystemService } from './interfaces/IALSystemService';
import { QiService } from './qi.service';

/**
 * The service implementation of the ALSystem NAOqi class.
 * @author Guillaume Quittet
 * @implements
 */
@Injectable()
export class ALSystemService extends ALModuleService implements IALSystemService {

  /**
   * @override
   */
  getName(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALSystem => ALSystem.robotName().then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  getSystemVersion(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALSystem => ALSystem.systemVersion().then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  getTimezone(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALSystem => ALSystem.timezone().then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  reboot(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALSystem => ALSystem.reboot().then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  setName(name: string): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALSystem => ALSystem.setRobotName(name).then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  shutdown(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALSystem => ALSystem.shutdown().then(result => resolve(result), error => reject(error))));
  }
}
