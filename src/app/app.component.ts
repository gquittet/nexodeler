import { Component } from '@angular/core';
import { Config, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Globalization } from '@ionic-native/globalization';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, translate: TranslateService, globalization: Globalization, config: Config) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      translate.setDefaultLang('en');
      globalization.getPreferredLanguage().then(lang => {
        translate.use(lang.value);
        translate.get('UI.NAVBAR.BUTTONS.BACK').subscribe(res => {
          config.set('ios', 'backButtonText', res);
        });
      }).catch(e => {
        console.log('[ERROR][GLOBALIZATION][getLocale] ' + e);
        translate.get('UI.NAVBAR.BUTTONS.BACK').subscribe(res => {
          config.set('ios', 'backButtonText', res);
        });
      });
    });
  }
}

