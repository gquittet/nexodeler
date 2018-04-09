import { Component } from '@angular/core';

import { AlertController } from 'ionic-angular';
import { BtrAlert } from '../../objects/alert/BtrAlert';
import { ALAutonomousLifeService } from '../../../app/services/naoqi/alautonomouslife.service';


@Component({
  selector: 'al-autonomous-life-list-item',
  templateUrl: 'al-autonomous-life-list-item.html'
})
export class ALAutonomousLifeListItemComponent {

  private alert: BtrAlert;
  private stateInterval: number;

  private currentState: string;
  private states: string[] = ['solitary', 'interactive', 'disabled', 'safegard'];

  constructor(private alertCtrl: AlertController, private alAutonomousLife: ALAutonomousLifeService) { }

  ngOnInit(): void {
    this.alert = new BtrAlert(this.alertCtrl);
    this.getState();
    this.stateInterval = setInterval(() => this.getState(), 1000);
  }

  private getState(): void {
    this.alAutonomousLife.getState().then(state => this.alert.setResult(state)).catch(error => console.error("[ERROR][NAOQI][Call][ALAutonomousLifeService] getState: " + error));
  }

  show(): void {
    const alert = this.alert.create('Autonomous mode');
    for (let state of this.states) {
      this.alert.createInput(state);
    }
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        this.alert.close();
        for (let state of this.states) {
          if (state === data) {
            this.alAutonomousLife.setState(data);
          this.alert.setResult(data);
          }
        }
      }
    });
    this.alert.present();
  }

  ngOnDestroy(): void {
    clearInterval(this.stateInterval);
  }
}
