import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ViewController } from 'ionic-angular';
import { IP } from '../../app/objects/IP';
import { QiService } from '../../app/services/naoqi/qi.service';

@IonicPage()
@Component({
  selector: 'page-settings-robot',
  templateUrl: 'settings-robot.html',
})
export class SettingsRobotPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) { }

  ionViewCanEnter(): void {
    const ip = new IP(this.navParams.get('ip').split('.'));
    QiService.connect(ip);
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  ionViewWillLeave(): void {
    QiService.disconnect();
  }
}
