import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Brightness } from '@ionic-native/brightness';
import { Globalization } from '@ionic-native/globalization';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { App, Config, Platform } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { Color } from './objects/Color';
import { Theme } from './objects/Theme';
import { SettingsService } from './services/settings/settings.service';


@Component({
  templateUrl: 'app.html',
  animations: [
    trigger(
      'leaveAnimation', [
        transition(':leave', [
          style({ opacity: 1, transform: 'scale(1)' }),
          animate('500ms', style({ opacity: 0, transform: 'scale(10)' }))
        ])
      ]
    )
  ],
})
export class MyApp {

  splash: boolean = true;
  theme: Theme = <Theme>{ name: 'Blue Autism', class: 'theme-blue-autism', primaryColor: '#5191CE' };
  private _themeSubscription: Subscription;

  constructor(private _platform: Platform, private _statusBar: StatusBar, private _splashScreen: SplashScreen, private _app: App, private _backgroundMode: BackgroundMode, private _translate: TranslateService, private _globalization: Globalization, private _androidPermissions: AndroidPermissions, private _brightness: Brightness, private _config: Config, private _settingsService: SettingsService) { }

  ngOnInit(): void {
    this._platform.ready().then(() => {
      this._statusBar.styleLightContent();
      this._splashScreen.hide();
      setTimeout(() => this.splash = false, 1000);
      setTimeout(() => this.changeStatusBarColor(), 1250);
      this._settingsService.readFile();
      this._themeSubscription = this._settingsService.theme.subscribe((theme: Theme) => {
        this.theme = theme;
        this.changeStatusBarColor();
      });
      // Fix sidemenu icon disappear in navbar when Android hardware back button pressed.
      if (this._platform.is('android') || this._platform.is('windows')) {
        this._platform.registerBackButtonAction(() => {
          const nav = this._app.getActiveNavs()[0];
          if (nav.canGoBack()) {
            nav.pop();
          } else {
            if (this._platform.is('android'))
              this._backgroundMode.moveToBackground();
            else
              this._platform.exitApp();
          }
        });
      }
      this.initializeTranslation();
      if (this._platform.is('ios') || this._platform.is('android')) {
        this._brightness.setKeepScreenOn(true);
        if (this._platform.is('android'))
          this.initializeAndroidPermissions();
      }
    });
  }

  /**
   * Change the color of the status bar.
   */
  private changeStatusBarColor(): void {
    const shadeValue: number = -20;
    const colorCode: string = (this.splash) ? '#5191CE' : this.theme.primaryColor;
    if (this._platform.is('android'))
      this._statusBar.backgroundColorByHexString(Color.shade(colorCode, shadeValue));
    else
      this._statusBar.backgroundColorByHexString(colorCode);
  }

  /**
   * Initialize the translations.
   */
  private initializeTranslation(): void {
    this._translate.setDefaultLang('en');
    this._globalization.getPreferredLanguage().then(lang => {
      this._translate.use(lang.value.split('-')[0]);
      this._translate.get('UI.NAVBAR.BUTTONS.BACK').subscribe(res => {
        this._config.set('ios', 'backButtonText', res);
      });
    }).catch(e => {
      console.log('[ERROR][GLOBALIZATION][getLocale] ' + e);
      this._translate.get('UI.NAVBAR.BUTTONS.BACK').subscribe(res => {
        this._config.set('ios', 'backButtonText', res);
      });
    });
  }

  /**
   * Ask for permissions on a Android system.
   */
  private initializeAndroidPermissions(): void {
    this._androidPermissions.requestPermissions([
      this._androidPermissions.PERMISSION.ACCESS_NETWORK_STATE,
      this._androidPermissions.PERMISSION.ACCESS_WIFI_STATE,
      this._androidPermissions.PERMISSION.CHANGE_NETWORK_STATE,
      this._androidPermissions.PERMISSION.CHANGE_WIFI_STATE,
      this._androidPermissions.PERMISSION.INTERNET,
      this._androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
      this._androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
    ]);
  }

  ngOnDestroy(): void {
    this._themeSubscription.unsubscribe();
  }
}

