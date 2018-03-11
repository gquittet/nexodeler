import { Injectable } from '@angular/core';

import { ALService } from './al.service';
import { IALSystemService } from './interfaces/IALSystemService';

@Injectable()
export class ALSystemService extends ALService implements IALSystemService {

  constructor() {
    super();
  }

  getName(): Promise<any> {
    return new Promise(resolve => this.qi.call(ALSystem => ALSystem.robotName().then(name => resolve(name))));
  }

  setName(name: string): Promise<any> {
    return new Promise(resolve => this.qi.call(ALSystem => ALSystem.setRobotName(name).then(result => resolve(result))));
  }

  reboot() {
    return new Promise(resolve => this.qi.call(ALSystem => ALSystem.reboot().then(result => resolve(result))));
  }

  shutdown() {
    return new Promise(resolve => this.qi.call(ALSystem => ALSystem.shutdown().then(result => resolve(result))));
  }

  systemVersion() {
    return new Promise(resolve => this.qi.call(ALSystem => ALSystem.systemVersion().then(version => resolve(version))));
  }
}
