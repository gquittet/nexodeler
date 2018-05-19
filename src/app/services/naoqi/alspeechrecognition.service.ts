import { Injectable } from "@angular/core";
import { ALModuleService } from "./almodule.service";
import { QiService } from "./qi.service";


/**
 * The service implementation of the ALSpeechRecognition NAOqi class.
 * @author Guillaume Quittet
 */
@Injectable()
export class ALSpeechRecognitionService extends ALModuleService {

  /**
   * Return all the languages available by the robot.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  getAvailableLanguages(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALSpeechRecognition => ALSpeechRecognition.getAvailableLanguages().then(result => resolve(result), error => reject(error))));
  }

  /**
   * Return the current language used by the robot.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  getLanguage(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALSpeechRecognition => ALSpeechRecognition.getLanguage().then(result => resolve(result), error => reject(error))));
  }

  /**
   * Set the current language used by the robot.
   * @param language The language name (example: 'English')
   * @returns {Promise<any>} A promise with the result of this action.
   */
  setLanguage(language: string): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALSpeechRecognition => ALSpeechRecognition.setLanguage(language).then(result => resolve(result), error => reject(error))));
  }
}