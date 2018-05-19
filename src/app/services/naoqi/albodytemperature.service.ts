import { Injectable } from "@angular/core";
import { ALModuleService } from "./almodule.service";
import { QiService } from "./qi.service";


/**
 * The service implementation of the ALBodyTemperature NAOqi class.
 * @author Guillaume Quittet
 */
@Injectable()
export class ALBodyTemperatureService extends ALModuleService {

  /**
   * Return true if the temperature notifications are enabled.
   * @returns {Promise<any>} The notifications status.
   */
  areNotificationsEnabled(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALBodyTemperature => ALBodyTemperature.areNotificationsEnabled().then(result => resolve(result), error => reject(error))));
  }

  /**
   * Get the temperature diagnosis.
   * @returns {Promise<any>} The temperature diagnosis.
   */
  getTemperatureDiagnosis(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALBodyTemperature => ALBodyTemperature.getTemperatureDiagnosis().then(result => resolve(result), error => reject(error))));
  }

  /**
   * Enable the notifications about the temperature.
   * @param enable A boolean that enable or not the notifications of the temperature.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  setNotificationsEnabled(enable: boolean): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALBodyTemperature => ALBodyTemperature.setEnableNotifications(enable).then(result => resolve(result), error => reject(error))));
  }
}