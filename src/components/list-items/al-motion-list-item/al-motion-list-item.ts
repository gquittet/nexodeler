import { Component } from '@angular/core';

import { AlertController } from 'ionic-angular';
import { BtrAlert } from '../../objects/alert/BtrAlert';
import { ALMotionService } from '../../../app/services/naoqi/almotion.service';

@Component({
  selector: 'al-motion-list-item',
  templateUrl: 'al-motion-list-item.html'
})
export class ALMotionListItemComponent {

  private state: string[] = ['Rest', 'Wake Up'];

  private alert: BtrAlert;
  private stateInterval: number;

  constructor(private alertCtrl: AlertController, private alMotionService: ALMotionService) { }

  ngOnInit(): void {
    this.alert = new BtrAlert(this.alertCtrl);
    this.getState();
    this.stateInterval = setInterval(() => this.getState(), 2000);
  }

  private getState(): void {
    this.alMotionService.robotIsWakeUp().then(wakeUp => wakeUp ? this.alert.setResult(this.state[1]) : this.alert.setResult(this.state[0])).catch(error => console.error(error));
  }

  show(): void {
    const alert = this.alert.create('Motors mode');
    this.alert.createInput(this.state[0]);
    this.alert.createInput(this.state[1]);
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        this.alert.close();
        switch (data) {
          case this.state[0]:
            this.alMotionService.rest();
            break;
          case this.state[1]:
            this.alMotionService.wakeUp();
            break;
          default:
        }
        this.alert.setResult(data);
      }
    });
    this.alert.present();
  }

  ngOnDestroy(): void {
    clearInterval(this.stateInterval);
  }
}
