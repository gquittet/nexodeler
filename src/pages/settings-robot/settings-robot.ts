import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { IP } from '../../app/objects/IP';
import { ALModuleService } from '../../app/services/naoqi/almodule.service';
import { QiService } from '../../app/services/naoqi/qi.service';

@IonicPage()
@Component({
  selector: 'page-settings-robot',
  templateUrl: 'settings-robot.html',
})
export class SettingsRobotPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private alModuleService: ALModuleService) { }

  ionViewCanEnter(): void {
    const ip = new IP(this.navParams.get('ip').split('.'));
    this.alModuleService.setIP(ip);
  }

  ionViewWillLeave(): void {
    QiService.disconnect();
  }
}
