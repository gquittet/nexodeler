import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertRadioButton } from '../../../app/objects/ionic/AlertRadioButton';
import { ALTextToSpeechService } from '../../../app/services/naoqi/altexttospeech.service';


@Component({
  selector: 'list-item-languages-available',
  templateUrl: 'list-item-languages-available.component.html'
})
export class ListItemLanguagesAvailableComponent {

  alert: AlertRadioButton;
  private _languagesInterval;

  private _alertTitle: string;
  private _okText: string;
  private _cancelText: string;

  languages: string[];
  currentLanguage: string;

  constructor(translate: TranslateService, public alTextToSpeech: ALTextToSpeechService) {
    translate.get('OK').subscribe((res: string) => this._okText = res);
    translate.get('VERBS.CANCEL').subscribe((res: string) => this._cancelText = res);
    translate.get('LANGUAGES').subscribe((res: string) => this._alertTitle = res);
  }

  ngOnInit(): void {
    this.getLanguages();
    this._languagesInterval = setInterval(() => this.getLanguages(), 3000);
  }

  private getLanguages(): void {
    this.alTextToSpeech.getAvailableLanguages().then(languages => this.languages = languages).catch(error => console.error(error));
    this.alTextToSpeech.getLanguage().then(language => {
      this.currentLanguage = language;
    }).catch(error => console.error(error));
  }

  ngOnDestroy(): void {
    clearInterval(this._languagesInterval);
  }
}
