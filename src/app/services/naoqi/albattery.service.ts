import { Injectable } from '@angular/core';
import { ALModuleService } from './almodule.service';
import { QiService } from './qi.service';


/**
 * The service implementation of the ALBattery NAOqi class.
 * @author Guillaume Quittet
 */
@Injectable()
export class ALBatteryService extends ALModuleService {

  /**
   * Return the battery charge in percent.
   * @returns {Promise<any>} The battery charge in percent.
   */
  getLevel(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALBattery => ALBattery.getBatteryCharge().then(result => resolve(result), error => reject(error))));
  }

  /**
   * Enable or disable power monitoring.
   * @param enable Choose True to enable the power monitoring and its notifications.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  setPowerMonitoring(enable: boolean): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALBattery => ALBattery.enablePowerMonitoring().then(result => resolve(result), error => reject(error))));
  }
}
