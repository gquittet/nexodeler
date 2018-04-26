import { Component } from '@angular/core';
import { Config, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Globalization } from '@ionic-native/globalization';
import { TranslateService } from '@ngx-translate/core';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Brightness } from '@ionic-native/brightness';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, translate: TranslateService, globalization: Globalization, androidPermissions: AndroidPermissions, brightness: Brightness, config: Config) {
    platform.ready().then(() => {
      statusBar.styleBlackTranslucent();
      splashScreen.hide();
      translate.setDefaultLang('en');
      globalization.getPreferredLanguage().then(lang => {
        translate.use(lang.value.split('-')[0]);
        translate.get('UI.NAVBAR.BUTTONS.BACK').subscribe(res => {
          config.set('ios', 'backButtonText', res);
        });
      }).catch(e => {
        console.log('[ERROR][GLOBALIZATION][getLocale] ' + e);
        translate.get('UI.NAVBAR.BUTTONS.BACK').subscribe(res => {
          config.set('ios', 'backButtonText', res);
        });
      });
      if (platform.is('ios') || platform.is('android')) {
        brightness.setKeepScreenOn(true);
        if (platform.is('android')) {
          androidPermissions.requestPermissions([
            androidPermissions.PERMISSION.ACCESS_NETWORK_STATE,
            androidPermissions.PERMISSION.ACCESS_WIFI_STATE,
            androidPermissions.PERMISSION.CHANGE_NETWORK_STATE,
            androidPermissions.PERMISSION.CHANGE_WIFI_MULTICAST_STATE,
            androidPermissions.PERMISSION.CHANGE_WIFI_STATE,
            androidPermissions.PERMISSION.INTERNET,
            androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
            androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
          ]);
        }
      }
    });
  }
}

