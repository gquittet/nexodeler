import { Component } from '@angular/core';
import { Network } from '@ionic-native/network';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { IP } from '../../app/objects/IP';
import { Theme } from '../../app/objects/Theme';
import { QiService } from '../../app/services/naoqi/qi.service';
import { SettingsService } from '../../app/services/settings/settings.service';

@IonicPage()
@Component({
  selector: 'page-settings-robot',
  templateUrl: 'settings-robot.html',
})
export class SettingsRobotPage {

  // String UI
  private _errorText: string;
  private _errorNetworkDisconnectedText: string;
  private _okText: string;
  // UI
  private _theme: Theme;

  // Subscription
  private _takeWhile: boolean = true;


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, translate: TranslateService, alertCtrl: AlertController, network: Network, settingsService: SettingsService) {
    translate.get('ERROR.ERROR').takeWhile(() => this._takeWhile).subscribe((res: string) => this._errorText = res);
    translate.get('ERROR.NETWORK_DISCONNECTED').takeWhile(() => this._takeWhile).subscribe((res: string) => this._errorNetworkDisconnectedText = res);
    translate.get("OK").takeWhile(() => this._takeWhile).subscribe((res: string) => this._okText = res);
    settingsService.theme.takeWhile(() => this._takeWhile).subscribe((theme: Theme) => this._theme = theme);
    network.onDisconnect().takeWhile(() => this._takeWhile).subscribe(() => {
      console.log('[INFO][NETWORK] Network access disconnected.');
      alertCtrl.create({
        title: this._errorText,
        subTitle: this._errorNetworkDisconnectedText,
        cssClass: this._theme.class,
        buttons: [this._okText]
      }).present();
      this.navCtrl.remove(this.viewCtrl.index, 1);
    });
  }

  ionViewCanEnter(): void {
    const ip = new IP(this.navParams.get('ip').split('.'));
    QiService.connect(ip);
  }

  ionViewWillLeave(): void {
    this._takeWhile = false;
    QiService.disconnect();
  }
}
