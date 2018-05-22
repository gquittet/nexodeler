import { Component } from '@angular/core';
import { Network } from '@ionic-native/network';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Subscription } from 'rxjs';
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
  private _subscription: Subscription;


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, translate: TranslateService, alertCtrl: AlertController, network: Network, settingsService: SettingsService) {
    this._subscription = new Subscription();
    this._subscription.add(translate.get('ERROR.ERROR').subscribe((res: string) => this._errorText = res));
    this._subscription.add(translate.get('ERROR.NETWORK_DISCONNECTED').subscribe((res: string) => this._errorNetworkDisconnectedText = res));
    this._subscription.add(translate.get("OK").subscribe((res: string) => this._okText = res));
    this._subscription.add(settingsService.theme.subscribe((theme: Theme) => this._theme = theme));
    this._subscription.add(network.onDisconnect().subscribe(() => {
      console.log('[INFO][NETWORK] Network access disconnected.');
      alertCtrl.create({
        title: this._errorText,
        subTitle: this._errorNetworkDisconnectedText,
        cssClass: this._theme.class,
        buttons: [this._okText]
      }).present();
      this.navCtrl.remove(this.viewCtrl.index, 1);
    }));
  }

  ionViewCanEnter(): void {
    const ip = new IP(this.navParams.get('ip').split('.'));
    QiService.connect(ip);
  }

  ionViewWillLeave(): void {
    this._subscription.unsubscribe();
    QiService.disconnect();
  }
}
