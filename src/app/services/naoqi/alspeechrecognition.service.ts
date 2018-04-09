import { Injectable } from "@angular/core";

import { ALModuleService } from "./almodule.service";
import { IALSpeechRecognition } from "./interfaces/IALSpeechRecognition";
import { QiService } from "./qi.service";

@Injectable()
export class ALSpeechRecognitionService extends ALModuleService implements IALSpeechRecognition {

  getAvailableLanguages(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALSpeechRecognition => ALSpeechRecognition.getAvailableLanguages().then(result => resolve(result), error => reject(error))));
  }
  getLanguage(): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALSpeechRecognition => ALSpeechRecognition.getLanguage().then(result => resolve(result), error => reject(error))));
  }
  setLanguage(language: string): Promise<any> {
    return new Promise((resolve, reject) => QiService.call(ALSpeechRecognition => ALSpeechRecognition.setLanguage(language).then(result => resolve(result), error => reject(error))));
  }
}