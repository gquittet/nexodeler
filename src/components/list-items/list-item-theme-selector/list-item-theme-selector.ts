import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Theme } from '../../../app/objects/Theme';
import { SettingsService } from '../../../app/services/settings/settings.service';


@Component({
  selector: 'list-item-theme-selector',
  templateUrl: 'list-item-theme-selector.html'
})
export class ListItemThemeSelectorComponent {

  isIOS: boolean;

  private _takeWhile: boolean = true;

  currentThemeClass: string;
  themes: Theme[];
  selectOptions: Object = { cssClass: '' };

  constructor(platform: Platform, private _settingsService: SettingsService) {
    this.isIOS = platform.is('ios');
  }

  ngOnInit(): void {
    this._settingsService.themes.then((themes: Theme[]) => this.themes = themes);
    this._settingsService.theme.takeWhile(() => this._takeWhile).subscribe((theme: Theme) => {
      this.currentThemeClass = theme.class;
      this.selectOptions['cssClass'] = theme.class;
    });
  }

  changeTheme(): void {
    this._settingsService.changeTheme(this._settingsService.findThemeByClassName(this.currentThemeClass));
  }

  ngOnDestroy(): void {
    this._takeWhile = false;
  }
}
