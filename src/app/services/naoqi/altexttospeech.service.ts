import { Injectable } from "@angular/core";
import { ALModuleService } from "./almodule.service";
import { QiService } from "./qi.service";


/**
 * The service implementation of the ALTextToSpeech NAOqi class.
 * @author Guillaume Quittet
 */
@Injectable()
export class ALTextToSpeechService extends ALModuleService {

  /**
   * Return all the languages available by the robot.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  getAvailableLanguages(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALTextToSpeech => ALTextToSpeech.getAvailableLanguages().then(result => resolve(result), error => reject(error))));
  }

  /**
   * Return the current language used by the robot.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  getLanguage(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALTextToSpeech => ALTextToSpeech.getLanguage().then(result => resolve(result), error => reject(error))));
  }

  /**
   * Return the current volume used by the robot between [0, 1].
   * @returns {Promise<any>} A promise with the result of this action.
   */
  getVolume(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALTextToSpeech => ALTextToSpeech.getVolume().then(result => resolve(result * 100), error => reject(error))));
  }

  /**
   * Says a string of characters.
   * @param text The text to say.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  say(text: string): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALTextToSpeech => ALTextToSpeech.say(text).then(result => resolve(result), error => reject(error))));
  }

  /**
   * Set the current language used by the robot.
   * @param language The language name (example: 'English')
   * @returns {Promise<any>} A promise with the result of this action.
   */
  setLanguage(language: string): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALTextToSpeech => ALTextToSpeech.setLanguage(language).then(result => resolve(result), error => reject(error))));
  }

  /**
   * Set the output volume of the robot.
   * @param volume The volume of the robot.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  setVolume(volume: number): Promise<any> {
    if (volume > 100 || volume < 0)
      throw "[Error]: The volume must be between [0, 100]."
    return new Promise((resolve, reject) => QiService.call(ALTextToSpeech => ALTextToSpeech.setVolume(volume / 100).then(result => resolve(result), error => reject(error))));
  }

  /**
   * This method stops the current and all the pending tasks immediately.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  stopAll(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALTextToSpeech => ALTextToSpeech.stopAll().then(result => resolve(result), error => reject(error))));
  }
}