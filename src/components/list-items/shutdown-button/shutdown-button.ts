import { Component } from '@angular/core';
import { ALSystemService } from '../../../app/services/naoqi/alsystem.service';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'shutdown-button',
  templateUrl: 'shutdown-button.html'
})
export class ShutdownButtonComponent {

  constructor(private alertCtrl: AlertController, private alSystem: ALSystemService) {
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
            this.alSystem.shutdown();
            this.alertCtrl.create({
              title: 'Info',
              subTitle: name + ' is shutting down...',
              buttons: ['OK']
            }).present();
          }
        }
      ]
    }).present();
  }

}
