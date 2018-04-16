import { Component } from '@angular/core';

import { AlertController } from 'ionic-angular';
import { BtrAlert } from '../../objects/alert/BtrAlert';
import { ALAutonomousLifeService } from '../../../app/services/naoqi/alautonomouslife.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'al-autonomous-life-list-item',
  templateUrl: 'al-autonomous-life-list-item.html'
})
export class ALAutonomousLifeListItemComponent {

  private alert: BtrAlert;
  private stateInterval;

  private alertTitle: string;
  private okText: string;
  private cancelText: string;
  private states: string[];

  constructor(private alertCtrl: AlertController, translate: TranslateService, private alAutonomousLife: ALAutonomousLifeService) {
    this.states = [];
    translate.get('OK').subscribe((res: string) => this.okText = res);
    translate.get('VERBS.CANCEL').subscribe((res: string) => this.cancelText = res);
    translate.get('NAOQI.AUTONOMOUS_LIFE.AUTONOMOUS_LIFE').subscribe((res: string) => this.alertTitle = res);
    translate.get('NAOQI.AUTONOMOUS_LIFE.SOLITARY').subscribe((res: string) => this.states[0] = res);
    translate.get('NAOQI.AUTONOMOUS_LIFE.INTERACTIVE').subscribe((res: string) => this.states[1] = res);
    translate.get('NAOQI.AUTONOMOUS_LIFE.SAFEGARD').subscribe((res: string) => this.states[2] = res);
    translate.get('NAOQI.AUTONOMOUS_LIFE.DISABLED').subscribe((res: string) => this.states[3] = res);
  }

  ngOnInit(): void {
    this.alert = new BtrAlert(this.alertCtrl);
    this.getState();
    this.stateInterval = setInterval(() => this.getState(), 1500);
  }

  /**
   * Translate the state into a readable value
   * @param state The unreadable value.
   * @returns {string} The readable value.
   */
  private convertState(state: string): string {
    switch (state) {
      case 'solitary':
        return this.states[0];
      case 'interactive':
        return this.states[1];
      case 'safegard':
        return this.states[2];
      case 'disabled':
        return this.states[3];
      case this.states[0]:
        return 'solitary';
      case this.states[1]:
        return 'interactive';
      case this.states[2]:
        return 'safegard';
      case this.states[3]:
        return 'disabled';
    }
    return null;
  }

  /**
   * Get the current state of autonomous life.
   */
  private getState(): void {
    this.alAutonomousLife.getState().then(state => this.alert.setResult(this.convertState(state))).catch(error => console.error(error));
  }

  show(): void {
    const alert = this.alert.create(this.alertTitle);
    for (let state of this.states) {
      this.alert.createInput(state);
    }
    alert.addButton(this.cancelText);
    alert.addButton({
      text: this.okText,
      handler: data => {
        this.alert.close();
        for (let state of this.states) {
          if (state === data) {
            this.alAutonomousLife.setState(this.convertState(data));
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
