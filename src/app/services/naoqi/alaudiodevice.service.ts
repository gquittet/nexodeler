import { Injectable } from "@angular/core";

import { ALModuleService } from "./almodule.service";
import { QiService } from "./qi.service";
import { IALAudioDeviceService } from "./interfaces/IALAudioDeviceService";

/**
 * The service implementation of the ALAudioDevice NAOqi class.
 * @author Guillaume Quittet
 * @implements
 */
@Injectable()
export class ALAudioDeviceService extends ALModuleService implements IALAudioDeviceService {

  /**
   * @override
   */
  getOutputVolume(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAudioDevice => ALAudioDevice.getOutputVolume().then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  isAudioOutMuted(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAudioDevice => ALAudioDevice.isAudioOutMuted().then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  muteAudioOut(mute: boolean): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAudioDevice => ALAudioDevice.muteAudioOut(mute).then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  setFileAsInput(fileName: string): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAudioDevice => ALAudioDevice.setFileAsInput(fileName).then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  setOutputVolume(volume: number): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAudioDevice => ALAudioDevice.setOutputVolume(volume).then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  startMicrophonesRecording(fileName: string): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAudioDevice => ALAudioDevice.startMicrophonesRecording(fileName).then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  stopMicrophonesRecording(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAudioDevice => ALAudioDevice.stopMicrophonesRecording().then(result => resolve(result), error => reject(error))));
  }
}