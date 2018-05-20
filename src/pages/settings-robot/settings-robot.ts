import { Component } from '@angular/core';
import { Network } from '@ionic-native/network';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { IP } from '../../app/objects/IP';
import { QiService } from '../../app/services/naoqi/qi.service';

@IonicPage()
@Component({
  selector: 'page-settings-robot',
  templateUrl: 'settings-robot.html',
})
export class SettingsRobotPage {

  private _isConnectedToNetwork: Subscription;

  private _errorText: string;
  private _errorNetworkDisconnectedText: string;
  private _okText: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, translate: TranslateService, alertCtrl: AlertController, network: Network) {
    translate.get('ERROR.ERROR').subscribe((res: string) => this._errorText = res);
    translate.get('ERROR.NETWORK_DISCONNECTED').subscribe((res: string) => this._errorNetworkDisconnectedText = res);
    translate.get("OK").subscribe((res: string) => this._okText = res);
    this._isConnectedToNetwork = network.onDisconnect().subscribe(() => {
      console.log('[INFO][NETWORK] Network access disconnected.');
      alertCtrl.create({
        title: this._errorText,
        subTitle: this._errorNetworkDisconnectedText,
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
    this._isConnectedToNetwork.unsubscribe();
    QiService.disconnect();
  }
}
