import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ViewController, AlertController } from 'ionic-angular';
import { IP } from '../../app/objects/IP';
import { QiService } from '../../app/services/naoqi/qi.service';
import { Network } from '@ionic-native/network';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-settings-robot',
  templateUrl: 'settings-robot.html',
})
export class SettingsRobotPage {

  private isConnectedToNetwork: Subscription;

  private errorText: string;
  private errorNetworkDisconnectedText: string;
  private okText: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, translate: TranslateService, alertCtrl: AlertController, network: Network) {
    translate.get('ERROR.ERROR').subscribe((res: string) => this.errorText = res);
    translate.get('ERROR.NETWORK_DISCONNECTED').subscribe((res: string) => this.errorNetworkDisconnectedText = res);
    translate.get("OK").subscribe((res: string) => this.okText = res);
    this.isConnectedToNetwork = network.onDisconnect().subscribe(() => {
      console.log('[INFO][NETWORK] Network access disconnected.');
      alertCtrl.create({
        title: this.errorText,
        subTitle: this.errorNetworkDisconnectedText,
        buttons: [this.okText]
      }).present();
      this.navCtrl.remove(this.viewCtrl.index, 1);
    });
  }

  ionViewCanEnter(): void {
    const ip = new IP(this.navParams.get('ip').split('.'));
    QiService.connect(ip);
  }

  ionViewWillLeave(): void {
    this.isConnectedToNetwork.unsubscribe();
    QiService.disconnect();
  }
}
