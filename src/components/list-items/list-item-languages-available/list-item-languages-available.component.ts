import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { Theme } from '../../../app/objects/Theme';
import { ALTextToSpeechService } from '../../../app/services/naoqi/altexttospeech.service';
import { SettingsService } from '../../../app/services/settings/settings.service';


@Component({
  selector: 'list-item-languages-available',
  templateUrl: 'list-item-languages-available.component.html'
})
export class ListItemLanguagesAvailableComponent {

  isIOS: boolean;

  private _languagesInterval;

  languages: string[];
  currentLanguage: string;

  // Subscription
  private _subscription: Subscription;

  // UI
  // Theme
  selectOptions: Object = { cssClass: '' };

  constructor(platform: Platform, public alTextToSpeech: ALTextToSpeechService, _settingsService: SettingsService) {
    this._subscription = _settingsService.theme.subscribe((theme: Theme) => this.selectOptions['cssClass'] = theme.class);
    this.isIOS = platform.is('ios');
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
    this._subscription.unsubscribe();
  }
}
