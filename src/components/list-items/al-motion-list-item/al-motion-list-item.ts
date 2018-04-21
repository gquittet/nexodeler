import { Component } from '@angular/core';

import { AlertController } from 'ionic-angular';
import { AlertCombobox } from '../../objects/alert/AlertCombobox';
import { ALMotionService } from '../../../app/services/naoqi/almotion.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'al-motion-list-item',
  templateUrl: 'al-motion-list-item.html'
})
export class ALMotionListItemComponent {

  private states: string[];
  private alertTitle: string;
  private okText: string;
  private cancelText: string;

  private alert: AlertCombobox;
  private stateInterval;

  constructor(private alertCtrl: AlertController, translate: TranslateService, private alMotionService: ALMotionService) {
    this.states = new Array(2);
    translate.get('SETTINGS.MOTORS_MODE').subscribe(res => this.alertTitle = res);
    translate.get('NAOQI.MOTION.REST').subscribe(res => this.states[0] = res);
    translate.get('NAOQI.MOTION.WAKE_UP').subscribe(res => this.states[1] = res);
    translate.get('OK').subscribe(res => this.okText = res);
    translate.get('VERBS.CANCEL').subscribe(res => this.cancelText = res);
  }

  ngOnInit(): void {
    this.alert = new AlertCombobox(this.alertCtrl);
    this.getState();
    this.stateInterval = setInterval(() => this.getState(), 2000);
  }

  private getState(): void {
    this.alMotionService.robotIsWakeUp().then(wakeUp => wakeUp ? this.alert.setResult(this.states[1]) : this.alert.setResult(this.states[0])).catch(error => console.error(error));
  }

  show(): void {
    const alert = this.alert.create(this.alertTitle);
    this.alert.createInput(this.states[0]);
    this.alert.createInput(this.states[1]);
    alert.addButton(this.cancelText);
    alert.addButton({
      text: this.okText,
      handler: data => {
        this.alert.close();
        switch (data) {
          case this.states[0]:
            this.alMotionService.rest();
            break;
          case this.states[1]:
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
