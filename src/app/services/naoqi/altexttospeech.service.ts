import { Injectable } from "@angular/core";

import { ALModuleService } from "./almodule.service";
import { IALTextToSpeechService } from "./interfaces/IALTextToSpeechService";
import { QiService } from "./qi.service";

/**
 * The service implementation of the ALTextToSpeech NAOqi class.
 * @author Guillaume Quittet
 * @implements
 */
@Injectable()
export class ALTextToSpeechService extends ALModuleService implements IALTextToSpeechService {

  /**
   * @override
   */
  getAvailableLanguages(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALTextToSpeech => ALTextToSpeech.getAvailableLanguages().then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  getLanguage(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALTextToSpeech => ALTextToSpeech.getLanguage().then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  getVolume(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALTextToSpeech => ALTextToSpeech.getVolume().then(result => resolve(result * 100), error => reject(error))));
  }

  /**
   * @override
   */
  say(text: string): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALTextToSpeech => ALTextToSpeech.say(text).then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  setLanguage(language: string): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALTextToSpeech => ALTextToSpeech.setLanguage(language).then(result => resolve(result), error => reject(error))));
  }

  /**
   * @override
   */
  setVolume(volume: number): Promise<any> {
    if (volume > 100 || volume < 0)
      throw "[Error]: The volume must be between [0, 100]."
    return new Promise((resolve, reject) => QiService.call(ALTextToSpeech => ALTextToSpeech.setVolume(volume / 100).then(result => resolve(result), error => reject(error))));
  }
}