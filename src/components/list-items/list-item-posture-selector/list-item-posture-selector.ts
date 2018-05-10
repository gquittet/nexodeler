import { Component } from '@angular/core';
import { ALRobotPosture } from '../../../app/services/naoqi/alrobotposture.service';


@Component({
  selector: 'list-item-posture-selector',
  templateUrl: 'list-item-posture-selector.html'
})
export class ListItemPostureSelectorComponent {

  robotPostures: string[];
  currentPosture: string;

  constructor(private alRobotPosture: ALRobotPosture) { }

  ngOnInit(): void {
    this.alRobotPosture.getPosturesList().then(posturesList => this.robotPostures = posturesList);
    this.alRobotPosture.getPosture().then(currentPosture => this.currentPosture = currentPosture);
  }

  changePosture(): void {
    this.alRobotPosture.goToPosture(this.currentPosture, 1.0).then(() => console.log('[NAOQI][INFO][Posture] changePosture: Change posture to ' + this.currentPosture)).catch(error => console.error(error));
  }
}
