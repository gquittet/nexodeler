import { Injectable } from "@angular/core";
import { ALModuleService } from "./almodule.service";
import { QiService } from "./qi.service";


/**
 * The service implementation of the ALAudioDevice NAOqi class.
 * @author Guillaume Quittet
 */
@Injectable()
export class ALAudioDeviceService extends ALModuleService {

  /**
   * Get the global output volume of the system.
   * @returns {Promise<any>} The global output volume of the system.
   */
  getOutputVolume(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAudioDevice => ALAudioDevice.getOutputVolume().then(result => resolve(result), error => reject(error))));
  }

  /**
   * Get the mute state of the  output sound of the system.
   * @returns {Promise<any>} The mute state of the output sound.
   */
  isAudioOutMuted(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAudioDevice => ALAudioDevice.isAudioOutMuted().then(result => resolve(result), error => reject(error))));
  }

  /**
   * Mute or unmute the output sound.
   * @param mute A boolean that mute or not the output sound.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  muteAudioOut(mute: boolean): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAudioDevice => ALAudioDevice.muteAudioOut(mute).then(result => resolve(result), error => reject(error))));
  }

  /**
   * Read a sound file. File format must be a wav file (48000Hz/16bits/4 channels).
   * @param fileName The absolute path of the file with its name.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  setFileAsInput(fileName: string): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAudioDevice => ALAudioDevice.setFileAsInput(fileName).then(result => resolve(result), error => reject(error))));
  }

  /**
   * Set the output volume of the system.
   * @param volume The new output volume of the system.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  setOutputVolume(volume: number): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAudioDevice => ALAudioDevice.setOutputVolume(volume).then(result => resolve(result), error => reject(error))));
  }

  /**
   * Start the recording and put the content into a file
   * @param fileName The absolute path of the file with its name.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  startMicrophonesRecording(fileName: string): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAudioDevice => ALAudioDevice.startMicrophonesRecording(fileName).then(result => resolve(result), error => reject(error))));
  }

  /**
   * Stop the current record.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  stopMicrophonesRecording(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALAudioDevice => ALAudioDevice.stopMicrophonesRecording().then(result => resolve(result), error => reject(error))));
  }
}