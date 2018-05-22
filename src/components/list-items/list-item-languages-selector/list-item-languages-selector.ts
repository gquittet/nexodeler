import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from 'ionic-angular';
import { Theme } from '../../../app/objects/Theme';
import { SettingsService } from '../../../app/services/settings/settings.service';


@Component({
  selector: 'list-item-languages-selector',
  templateUrl: 'list-item-languages-selector.html'
})
export class ListItemLanguagesSelectorComponent {

  isIOS: boolean;

  currentLanguage: string;
  languages: string[];

  // Subscription
  private _takeWhile: boolean = true;

  // UI
  // Theme
  selectOptions: Object = { cssClass: '' };

  constructor(platform: Platform, translate: TranslateService, public settingsService: SettingsService) {
    this.settingsService.theme.takeWhile(() => this._takeWhile).subscribe((theme: Theme) => this.selectOptions['cssClass'] = theme.class);
    this.isIOS = platform.is('ios');
    this.currentLanguage = translate.currentLang;
    this.languages = translate.getLangs().sort((a, b) => a.localeCompare(b));
  }

  ngOnDestroy(): void {
    this._takeWhile = false;
  }
}
