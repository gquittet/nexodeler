import { Component } from '@angular/core';
import { ALSystemService } from '../../../app/services/naoqi/alsystem.service';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'reboot-button',
  templateUrl: 'reboot-button.html'
})
export class RebootButtonComponent {

  constructor(private alertCtrl: AlertController, private alSystem: ALSystemService) { }

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
            this.alSystem.reboot();
            this.alertCtrl.create({
              title: 'Info',
              subTitle: name + ' is rebooting...',
              buttons: ['OK']
            }).present();
          }
        }
      ]
    }).present();
  }

}
