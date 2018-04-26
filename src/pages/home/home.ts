import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private errorText: string;
  private noNetworkConnection: string;
  private okText: string;

  constructor(network: Network, alertCtrl: AlertController, translate: TranslateService) {
    translate.get('UI.ALERT.CONTENT.LABEL.TO_USE_APP_ENABLE_NETWORK').subscribe((res: string) => this.noNetworkConnection = res);
    translate.get('ERROR.ERROR').subscribe((res: string) => this.errorText = res);
    translate.get('OK').subscribe((res: string) => this.okText = res);
    if (network.type === 'none') {
      alertCtrl.create({
        title: this.errorText,
        subTitle: this.noNetworkConnection,
        buttons: [this.okText]
      }).present();
    }
  }
}
