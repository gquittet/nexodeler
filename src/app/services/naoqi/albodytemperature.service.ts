import { Injectable } from "@angular/core";

import { ALModuleService } from "./almodule.service";
import { IALBodyTemperatureService } from "./interfaces/IALBodyTemperatureService";
import { QiService } from "./qi.service";

@Injectable()
export class ALBodyTemperatureService extends ALModuleService implements IALBodyTemperatureService {

  areNotificationsEnabled(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALBodyTemperature => ALBodyTemperature.areNotificationsEnabled().then(result => resolve(result), error => reject(error))));
  }

  getTemperatureDiagnosis(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALBodyTemperature => ALBodyTemperature.getTemperatureDiagnosis().then(result => resolve(result), error => reject(error))));
  }

  setNotificationsEnabled(enable: boolean): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALBodyTemperature => ALBodyTemperature.setEnableNotifications(enable).then(result => resolve(result), error => reject(error))));
  }
}