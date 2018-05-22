import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Theme } from '../../../app/objects/Theme';
import { ALRobotPostureService } from '../../../app/services/naoqi/alrobotposture.service';
import { SettingsService } from '../../../app/services/settings/settings.service';


@Component({
  selector: 'list-item-posture-selector',
  templateUrl: 'list-item-posture-selector.html'
})
export class ListItemPostureSelectorComponent {

  isIOS: boolean;

  private _postureInterval;

  robotPostures: string[];
  currentPosture: string;

  // Subscription
  private _takeWhile: boolean = true;

  // UI
  // Theme
  selectOptions: Object = { cssClass: '' };

  constructor(platform: Platform, private _alRobotPosture: ALRobotPostureService, settingsService: SettingsService) {
    settingsService.theme.takeWhile(() => this._takeWhile).subscribe((theme: Theme) => this.selectOptions['cssClass'] = theme.class);
    this.isIOS = platform.is('ios');
  }

  ngOnInit(): void {
    this._alRobotPosture.getPosturesList().then(posturesList => this.robotPostures = posturesList);
    this.getPosture();
    this._postureInterval = setInterval(() => this.getPosture(), 1000);
  }

  private getPosture(): void {
    this._alRobotPosture.getPosture().then(currentPosture => this.currentPosture = currentPosture);
  }

  changePosture(): void {
    this._alRobotPosture.goToPosture(this.currentPosture, 1.0).then(() => console.log('[NAOQI][INFO][Posture] changePosture: Change posture to ' + this.currentPosture)).catch(error => console.error(error));
  }

  ngOnDestroy(): void {
    clearInterval(this._postureInterval);
    this._takeWhile = false;
  }
}
