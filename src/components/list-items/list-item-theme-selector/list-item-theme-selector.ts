import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Theme } from '../../../app/objects/Theme';
import { SettingsService } from '../../../app/services/settings/settings.service';


@Component({
  selector: 'list-item-theme-selector',
  templateUrl: 'list-item-theme-selector.html'
})
export class ListItemThemeSelectorComponent {

  currentThemeClass: string;
  themes: Theme[];
  private _themesSubscription: Subscription;
  selectOptions: Object = { cssClass: '' };

  constructor(private _settingsService: SettingsService) { }

  ngOnInit(): void {
    this._settingsService.themes.then((themes: Theme[]) => this.themes = themes);
    this._themesSubscription = this._settingsService.theme.subscribe((theme: Theme) => {
      this.currentThemeClass = theme.class;
      this.selectOptions['cssClass'] = theme.class;
    });
  }

  changeTheme(): void {
    for (let theme of this.themes) {
      if (theme.class == this.currentThemeClass) {
        this._settingsService.changeTheme(theme);
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this._themesSubscription.unsubscribe();
  }
}
