import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, LoadingController, Platform } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { Theme } from '../../../app/objects/Theme';
import { AlertLoading } from '../../../app/objects/ionic/AlertLoading';
import { SettingsService } from '../../../app/services/settings/settings.service';


@Component({
  selector: 'list-item-theme-selector',
  templateUrl: 'list-item-theme-selector.html'
})
export class ListItemThemeSelectorComponent {

  isIOS: boolean;

  currentThemeClass: string;
  oldThemeClass: string;
  themes: Theme[];
  private _themesSubscription: Subscription;
  selectOptions: Object = { cssClass: '' };

  // UI
  private _loading: AlertLoading;
  // String UI
  private _okText: string;
  private _informationText: string;
  private _errorText: string;
  private _changesApplied: string;
  private _canNotApplyChanges: string;

  constructor(platform: Platform, private _settingsService: SettingsService, translate: TranslateService, loadingCtrl: LoadingController, private _alertCtrl: AlertController) {
    this.isIOS = platform.is('ios');
    this._loading = new AlertLoading(loadingCtrl, translate, this._settingsService);
    translate.get('OK').subscribe((res: string) => this._okText = res);
    translate.get('UI.ALERT.TITLE.INFORMATION.INFORMATION').subscribe((res: string) => this._informationText = res);
    translate.get('ERROR.ERROR').subscribe((res: string) => this._errorText = res);
    translate.get('UI.ALERT.CONTENT.LABEL.THEME.CHANGES_APPLIED').subscribe((res: string) => this._changesApplied = res);
    translate.get('UI.ALERT.CONTENT.LABEL.THEME.CAN_NOT_APPLY_CHANGES').subscribe((res: string) => this._canNotApplyChanges = res);
  }

  ngOnInit(): void {
    this._settingsService.themes.then((themes: Theme[]) => this.themes = themes);
    this._themesSubscription = this._settingsService.theme.subscribe((theme: Theme) => {
      this.currentThemeClass = theme.class;
      this.oldThemeClass = this.currentThemeClass;
      this.selectOptions['cssClass'] = theme.class;
    });
  }

  changeTheme(): void {
    this._loading.show();
    let theme: Theme = this._settingsService.findThemeByClassName(this.currentThemeClass);
    if (theme) {
      this._settingsService.changeTheme(theme).then(() => {
        this.oldThemeClass = this.currentThemeClass;
        this._alertCtrl.create({
          title: this._informationText,
          subTitle: this._changesApplied,
          buttons: [this._okText],
          cssClass: this.currentThemeClass
        }).present();
        this._loading.close();
      }).catch(err => {
        this.currentThemeClass = this.oldThemeClass;
        this._settingsService.changeTheme(this._settingsService.findThemeByClassName(this.oldThemeClass));
        this._alertCtrl.create({
          title: this._errorText,
          subTitle: this._canNotApplyChanges,
          buttons: [this._okText],
          cssClass: this.currentThemeClass
        }).present();
        this._loading.close();
      });
    }
  }

  ngOnDestroy(): void {
    this._themesSubscription.unsubscribe();
  }
}
