import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { Theme } from '../../../app/objects/Theme';
import { SettingsService } from '../../../app/services/settings/settings.service';


@Component({
  selector: 'list-item-language-chooser',
  templateUrl: 'list-item-language-chooser.html'
})
export class ListItemLanguageChooserComponent {

  isIOS: boolean;

  currentLanguage: string;
  languages: string[];

  // Unsubscribe
  private _subscription: Subscription;

  // UI
  // Theme
  selectOptions: Object = { cssClass: '' };

  constructor(platform: Platform, translate: TranslateService, public settingsService: SettingsService) {
    this._subscription = new Subscription();
    this._subscription.add(this.settingsService.theme.subscribe((theme: Theme) => this.selectOptions['cssClass'] = theme.class));
    this.isIOS = platform.is('ios');
    this.currentLanguage = translate.currentLang;
    this.languages = translate.getLangs();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
