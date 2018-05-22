import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, IonicPage, MenuController, NavController, Platform } from 'ionic-angular';

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
  private _takeWhile: boolean = true;

  constructor(platform: Platform, private _navCtrl: NavController, private _menuCtrl: MenuController, alertCtrl: AlertController, private _translate: TranslateService) {
    this.isAndroid = platform.is('android');
  }

  openPage(page: string): void {
    this._navCtrl.push(page);
  }

  ionViewWillEnter(): void {
    this._translate.get('UI.ALERT.CONTENT.LABEL.TO_USE_APP_ENABLE_NETWORK').takeWhile(() => this._takeWhile).subscribe((res: string) => this._noNetworkConnection = res);
    this._translate.get('ERROR.ERROR').takeWhile(() => this._takeWhile).subscribe((res: string) => this._errorText = res);
    this._translate.get('OK').takeWhile(() => this._takeWhile).subscribe((res: string) => this._okText = res);
    this._menuCtrl.enable(true);
  }

  ionViewDidLeave(): void {
    this._menuCtrl.enable(false);
    this._takeWhile = false;
  }
}
