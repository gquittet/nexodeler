import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, IonicPage, MenuController, NavController, Platform } from 'ionic-angular';
import { Subscription } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isAndroid: boolean;

  // String UI
  private _errorText: string;
  private _noNetworkConnection: string;
  private _okText: string;

  // Subscription
  private _subscription: Subscription;

  constructor(platform: Platform, private _navCtrl: NavController, private _menuCtrl: MenuController, alertCtrl: AlertController, translate: TranslateService) {
    this._subscription = new Subscription();
    this._subscription.add(translate.get('UI.ALERT.CONTENT.LABEL.TO_USE_APP_ENABLE_NETWORK').subscribe((res: string) => this._noNetworkConnection = res));
    this._subscription.add(translate.get('ERROR.ERROR').subscribe((res: string) => this._errorText = res));
    this._subscription.add(translate.get('OK').subscribe((res: string) => this._okText = res));
    this.isAndroid = platform.is('android');
  }

  openPage(page: string): void {
    this._navCtrl.push(page);
  }

  ionViewWillEnter(): void {
    this._menuCtrl.enable(true);
  }

  ionViewDidLeave(): void {
    this._menuCtrl.enable(false);
    this._subscription.unsubscribe();
  }
}
