import { Component } from '@angular/core';
import { ALRobotPosture } from '../../../app/services/naoqi/alrobotposture.service';


@Component({
  selector: 'list-item-posture-selector',
  templateUrl: 'list-item-posture-selector.html'
})
export class ListItemPostureSelectorComponent {

  private _postureInterval;

  robotPostures: string[];
  currentPosture: string;

  constructor(private _alRobotPosture: ALRobotPosture) { }

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
  }
}
