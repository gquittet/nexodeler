import { Component } from '@angular/core';
import { Network } from '@ionic-native/network';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, IonicPage, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private _errorText: string;
  private _noNetworkConnection: string;
  private _okText: string;

  constructor(private _menuCtrl: MenuController, network: Network, alertCtrl: AlertController, translate: TranslateService) {
    translate.get('UI.ALERT.CONTENT.LABEL.TO_USE_APP_ENABLE_NETWORK').subscribe((res: string) => this._noNetworkConnection = res);
    translate.get('ERROR.ERROR').subscribe((res: string) => this._errorText = res);
    translate.get('OK').subscribe((res: string) => this._okText = res);
    if (network.type === 'none') {
      alertCtrl.create({
        title: this._errorText,
        subTitle: this._noNetworkConnection,
        buttons: [this._okText]
      }).present();
    }
  }

  ionViewWillEnter(): void {
    this._menuCtrl.enable(true);
  }

  ionViewDidLeave(): void {
    this._menuCtrl.enable(false);
  }
}
