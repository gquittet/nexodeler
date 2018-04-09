import { Injectable } from '@angular/core';

import { ALModuleService } from './almodule.service';
import { IALBatteryService } from './interfaces/IALBatteryService';
import { QiService } from './qi.service';

@Injectable()
export class ALBatteryService extends ALModuleService implements IALBatteryService {

  getLevel(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALBattery => ALBattery.getBatteryCharge().then(result => resolve(result), error => reject(error))));
  }

  setPowerMonitoring(enable: boolean): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALBattery => ALBattery.enablePowerMonitoring().then(result => resolve(result), error => reject(error))));
  }
}
