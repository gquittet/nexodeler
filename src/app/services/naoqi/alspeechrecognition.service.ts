import { Injectable } from "@angular/core";

import { ALModuleService } from "./almodule.service";
import { IALSpeechRecognition } from "./interfaces/IALSpeechRecognition";
import { QiService } from "./qi.service";

/**
 * The service implementation of the ALSpeechRecognition NAOqi class.
 * @author Guillaume Quittet
 * @implements
 */
@Injectable()
export class ALSpeechRecognitionService extends ALModuleService implements IALSpeechRecognition {

  /**
   * @override
   */
  getAvailableLanguages(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALSpeechRecognition => ALSpeechRecognition.getAvailableLanguages().then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  getLanguage(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALSpeechRecognition => ALSpeechRecognition.getLanguage().then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  setLanguage(language: string): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALSpeechRecognition => ALSpeechRecognition.setLanguage(language).then(result => resolve(result), error => reject(error))));
  }
}