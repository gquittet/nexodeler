import { Component } from '@angular/core';
import { ALSystemService } from '../../../app/services/naoqi/alsystem.service';
import { AlertController, NavController, ViewController } from 'ionic-angular';
import { QiService } from '../../../app/services/naoqi/qi.service';


@Component({
  selector: 'shutdown-button',
  templateUrl: 'shutdown-button.html'
})
export class ShutdownButtonComponent {

  constructor(private navCtrl: NavController, private viewCtrl: ViewController, private alertCtrl: AlertController, private alSystem: ALSystemService) {
  }

  shutdown(): void {
    this.alertCtrl.create({
      title: 'Confirm shutdown',
      message: 'Do you want to shutdown this robot?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.alSystem.shutdown().catch(error => console.error(error));
            this.alertCtrl.create({
              title: 'Info',
              subTitle: name + ' is shutting down...',
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
