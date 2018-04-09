import { Injectable } from "@angular/core";

import { ALModuleService } from "./almodule.service";
import { QiService } from "./qi.service";
import { IALAudioDeviceService } from "./interfaces/IALAudioDeviceService";

@Injectable()
export class ALAudioDeviceService extends ALModuleService implements IALAudioDeviceService {

  getOutputVolume(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAudioDevice => ALAudioDevice.getOutputVolume().then(result => resolve(result), error => reject(error))));
  }

  isAudioOutMuted(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAudioDevice => ALAudioDevice.isAudioOutMuted().then(result => resolve(result), error => reject(error))));
  }

  muteAudioOut(mute: boolean): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAudioDevice => ALAudioDevice.muteAudioOut(mute).then(result => resolve(result), error => reject(error))));
  }

  setFileAsInput(fileName: string): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAudioDevice => ALAudioDevice.setFileAsInput(fileName).then(result => resolve(result), error => reject(error))));
  }

  setOutputVolume(volume: number): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAudioDevice => ALAudioDevice.setOutputVolume(volume).then(result => resolve(result), error => reject(error))));
  }

  startMicrophonesRecording(fileName: string): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAudioDevice => ALAudioDevice.startMicrophonesRecording(fileName).then(result => resolve(result), error => reject(error))));
  }

  stopMicrophonesRecording(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAudioDevice => ALAudioDevice.stopMicrophonesRecording().then(result => resolve(result), error => reject(error))));
  }
}