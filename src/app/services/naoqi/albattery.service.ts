import { Injectable } from '@angular/core';

import { ALService } from './al.service';
import { IALBatteryService } from './interfaces/IALBatteryService';

@Injectable()
export class ALBatteryService extends ALService implements IALBatteryService {

  constructor() {
    super();
  }

  getLevel(): Promise<any> {
      return new Promise(resolve => this.qi.call(ALBattery => ALBattery.getBatteryCharge().then(percentage => resolve(percentage))));
  }

  setPowerMonitoring(enable: boolean): Promise<any> {
    return new Promise(resolve => this.qi.call(ALBattery => ALBattery.enablePowerMonitoring(enable).then(result => resolve(result))));    
  }
}
