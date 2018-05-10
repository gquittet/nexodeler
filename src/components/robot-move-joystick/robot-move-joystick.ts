import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { ALMotionService } from '../../app/services/naoqi/almotion.service';
import { ALRobotPosture } from '../../app/services/naoqi/alrobotposture.service';


@Component({
  selector: 'robot-move-joystick',
  templateUrl: 'robot-move-joystick.html'
})
export class RobotMoveJoystickComponent {

  /*
  * Direction system.
  *  1    FORWARD
  *  0    NOTHING
  * -1    BACKWARD
  */
  currentDirection: number = 1;

  constructor(private events: Events, private alMotion: ALMotionService, private alRobotPosture: ALRobotPosture) { }

  ngOnInit(): void {
    // Create event to handle the exit of the page and stop the walk on exit.
    this.events.subscribe('module:exit', () => {
      this.alMotion.stopMove().then(() => {
        this.alRobotPosture.getPosture().then((postureName: string) => this.alRobotPosture.goToPosture(postureName, 1.0));
      });
    });
  }

  move(newDirection: number): void {
    // The distance to walk in meters.
    const distance: number = 10000;
    if (newDirection === this.currentDirection) {
      this.alMotion.moveTo(distance, 0, 0);
    } else if (newDirection === -this.currentDirection) {
      this.alMotion.moveTo(-distance, 0, 0);
    }
  }

  turn(direction: number): void {
    // 180 degrees is the limit. A bigger angle and the robot fall.
    if (direction > 1 || direction < -1)
      throw '[ERROR][RobotMoveJoystick][turn] The direction have to be between [-1.0, 1.0].';
    this.alMotion.rotate(direction * Math.PI);
  }

  stopMove(): void {
    this.alMotion.stopMove().then(() => {
      this.alRobotPosture.goToPosture('Stand', 1.0);
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe the event.
    this.events.unsubscribe('module:exit');
  }
}
