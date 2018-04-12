import { Component } from '@angular/core';
import { ALSystemService } from '../../../app/services/naoqi/alsystem.service';
import { AlertController, ViewController, NavController } from 'ionic-angular';
import { QiService } from '../../../app/services/naoqi/qi.service';


@Component({
  selector: 'reboot-button',
  templateUrl: 'reboot-button.html'
})
export class RebootButtonComponent {

  constructor(private navCtrl: NavController, private viewCtrl: ViewController, private alertCtrl: AlertController, private alSystem: ALSystemService) { }

  reboot(): void {
    this.alertCtrl.create({
      title: 'Confirm reboot',
      message: 'Do you want to reboot this robot?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.alSystem.reboot().catch(error => console.error(error));
            this.alertCtrl.create({
              title: 'Info',
              subTitle: name + ' is rebooting...',
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
                    QiService.disconnect();
                    this.navCtrl.remove(this.viewCtrl.index, 1);
                  }
                }
              ]
            }).present();
          }
        }
      ]
    }).present();
  }

}
