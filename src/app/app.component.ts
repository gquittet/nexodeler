import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Brightness } from '@ionic-native/brightness';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { App, Platform } from 'ionic-angular';
import "rxjs/add/operator/takeWhile";
import { Color } from './objects/Color';
import { Theme } from './objects/Theme';
import { AppStateService } from './services/appstate/appstate.service';
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
  ]
})
export class MyApp {

  splash: boolean = true;
  theme: Theme = <Theme>{ name: 'Blue Autism', class: 'theme-blue-autism', primaryColor: '#5191CE' };
  _modalOpenedState: boolean = false;
  private _takeWhile: boolean = true;

  constructor(platform: Platform, private _statusBar: StatusBar, splashScreen: SplashScreen, app: App, backgroundMode: BackgroundMode, private _androidPermissions: AndroidPermissions, brightness: Brightness, private _settingsService: SettingsService, appState: AppStateService) {
    platform.ready().then(() => {
      this._statusBar.styleLightContent();
      splashScreen.hide();
      setTimeout(() => this.splash = false, 1000);
      setTimeout(() => this.changeStatusBarColor(platform.is('android')), 1250);
      this._settingsService.readFile();
      this._settingsService.theme.takeWhile(() => this._takeWhile).subscribe((theme: Theme) => {
        this.theme = theme;
        this.changeStatusBarColor(platform.is('android'));
      });
      appState.modalOpenedState.takeWhile(() => this._takeWhile).subscribe((modalOpenedState: boolean) => this._modalOpenedState = modalOpenedState);
      // Fix sidemenu icon disappear in navbar when Android hardware back button pressed.
      if (platform.is('android') || platform.is('windows')) {
        platform.registerBackButtonAction(() => {
          /* Close modal page with back button.
           or Go back on back button.*/
          const nav = app.getActiveNavs()[0];
          if (nav.canGoBack() || this._modalOpenedState) {
            nav.pop();
          } else {
            if (platform.is('android'))
              backgroundMode.moveToBackground();
            else
              platform.exitApp();
          }
        });
      }
      if (platform.is('ios') || platform.is('android')) {
        brightness.setKeepScreenOn(true);
        if (platform.is('android'))
          this.initializeAndroidPermissions();
      }
    });
  }

  /**
   * Change the color of the status bar.
   */
  private changeStatusBarColor(isAndroid: boolean): void {
    const shadeValue: number = -20;
    const colorCode: string = (this.splash) ? '#5191CE' : this.theme.primaryColor;
    if (isAndroid)
      this._statusBar.backgroundColorByHexString(Color.shade(colorCode, shadeValue));
    else
      this._statusBar.backgroundColorByHexString(colorCode);
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
    this._takeWhile = false;
  }
}

