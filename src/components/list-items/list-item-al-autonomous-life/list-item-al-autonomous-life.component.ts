import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from 'ionic-angular';
import { AlertRadioButton } from '../../../app/objects/AlertRadioButton';
import { ALAutonomousLifeService } from '../../../app/services/naoqi/alautonomouslife.service';


@Component({
  selector: 'list-item-al-autonomous-life',
  templateUrl: 'list-item-al-autonomous-life.component.html'
})
export class ListItemALAutonomousLifeComponent {

  private alert: AlertRadioButton;
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
    this.alert = new AlertRadioButton(this.alertCtrl);
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
      // We can't set the 'interactive' and 'safegard' state. (bug: 0.0.3-3)
      if (this.convertState(state) !== 'interactive' && this.convertState(state) !== 'safegard')
        this.alert.createInput(state);
    }
    alert.addButton(this.cancelText);
    alert.addButton({
      text: this.okText,
      handler: data => {
        this.alert.close();
        for (let state of this.states) {
          // We can't set the 'interactive' and 'safegard' state. (bug: 0.0.3-3)
          if (state === data && state !== 'interactive' && state !== 'safegard') {
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
