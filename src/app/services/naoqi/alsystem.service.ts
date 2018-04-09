import { Injectable } from '@angular/core';

import { ALModuleService } from './almodule.service';
import { IALSystemService } from './interfaces/IALSystemService';
import { QiService } from './qi.service';

@Injectable()
export class ALSystemService extends ALModuleService implements IALSystemService {

  getName(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALSystem => ALSystem.robotName().then(result => resolve(result), error => reject(error))));
  }

  getSystemVersion() {
    return new Promise((resolve, reject) => QiService.call(ALSystem => ALSystem.systemVersion().then(result => resolve(result), error => reject(error))));
  }

  getTimezone(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALSystem => ALSystem.timezone().then(result => resolve(result), error => reject(error))));
  }

  reboot() {
    return new Promise((resolve, reject) => QiService.call(ALSystem => ALSystem.reboot().then(result => resolve(result), error => reject(error))));
  }

  setName(name: string): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALSystem => ALSystem.setRobotName(name).then(result => resolve(result), error => reject(error))));
  }

  shutdown() {
    return new Promise((resolve, reject) => QiService.call(ALSystem => ALSystem.shutdown().then(result => resolve(result), error => reject(error))));
  }
}
