import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from 'ionic-angular';
import { Theme } from '../../../app/objects/Theme';
import { ALAutonomousLifeService } from '../../../app/services/naoqi/alautonomouslife.service';
import { SettingsService } from '../../../app/services/settings/settings.service';


@Component({
  selector: 'list-item-al-autonomous-life',
  templateUrl: 'list-item-al-autonomous-life.component.html'
})
export class ListItemALAutonomousLifeComponent {

  isIOS: boolean;

  private _stateInterval;

  states: string[];
  statesToSelect: string[];
  currentState: string;

  // Subscription
  private _takeWhile: boolean = true;

  // UI
  // Theme
  selectOptions: Object = { cssClass: '' };

  constructor(platform: Platform, translate: TranslateService, public alAutonomousLife: ALAutonomousLifeService, settingsService: SettingsService) {
    this.states = [];
    settingsService.theme.takeWhile(() => this._takeWhile).subscribe((theme: Theme) => this.selectOptions['cssClass'] = theme.class);
    translate.get('NAOQI.AUTONOMOUS_LIFE.SOLITARY').takeWhile(() => this._takeWhile).subscribe((res: string) => this.states[0] = res);
    translate.get('NAOQI.AUTONOMOUS_LIFE.INTERACTIVE').takeWhile(() => this._takeWhile).subscribe((res: string) => this.states[1] = res);
    translate.get('NAOQI.AUTONOMOUS_LIFE.SAFEGARD').takeWhile(() => this._takeWhile).subscribe((res: string) => this.states[2] = res);
    translate.get('NAOQI.AUTONOMOUS_LIFE.DISABLED').takeWhile(() => this._takeWhile).subscribe((res: string) => this.states[3] = res);
    this.statesToSelect = [];
    this.statesToSelect[0] = this.states[0];
    this.statesToSelect[1] = this.states[3];
    this.isIOS = platform.is('ios');
  }

  ngOnInit(): void {
    this.getState();
    this._stateInterval = setInterval(() => this.getState(), 1500);
  }

  /**
   * Translate the state into a readable value
   * @param state The unreadable value.
   * @returns {string} The readable value.
   */
  convertState(state: string): string {
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
    this.alAutonomousLife.getState().then(state => {
      if (state !== 'interactive' && state !== 'safegard')
        this.currentState = this.convertState(state);
      else
        this.currentState = this.convertState('solitary');
    }).catch(error => console.error(error));
  }

  ngOnDestroy(): void {
    clearInterval(this._stateInterval);
    this._takeWhile = false;
  }
}
