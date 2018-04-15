import { Injectable } from '@angular/core';

import { ALModuleService } from './almodule.service';
import { IALBatteryService } from './interfaces/IALBatteryService';
import { QiService } from './qi.service';

/**
 * The service implementation of the ALBattery NAOqi class.
 * @author Guillaume Quittet
 * @implements
 */
@Injectable()
export class ALBatteryService extends ALModuleService implements IALBatteryService {

  /**
   * @override
   */
  getLevel(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALBattery => ALBattery.getBatteryCharge().then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  setPowerMonitoring(enable: boolean): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALBattery => ALBattery.enablePowerMonitoring().then(result => resolve(result), error => reject(error))));
  }
}
