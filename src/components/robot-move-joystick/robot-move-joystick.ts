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
  private _currentDirection: number = 1;
  private _initPosture: string = 'StandInit';

  constructor(private _events: Events, private _alMotion: ALMotionService, private _alRobotPosture: ALRobotPosture) { }

  ngOnInit(): void {
    // Create event to handle the exit of the page and stop the walk on exit.
    this._events.subscribe('module:exit', () => {
      this._alMotion.stopMove().then(() => {
        this._alRobotPosture.getPosture().then((postureName: string) => this._alRobotPosture.goToPosture(postureName, 1.0));
      });
    });
  }

  move(newDirection: number): void {
    // The distance to walk in meters.
    const distance: number = 10000;
    if (newDirection === this._currentDirection) {
      this._alMotion.moveTo(distance, 0, 0);
    } else if (newDirection === -this._currentDirection) {
      this._alMotion.moveTo(-distance, 0, 0);
    }
  }

  turn(direction: number): void {
    // 180 degrees is the limit. A bigger angle and the robot fall.
    if (direction > 1 || direction < -1)
      throw '[ERROR][RobotMoveJoystick][turn] The direction have to be between [-1.0, 1.0].';
    this._alMotion.rotate(direction * Math.PI);
  }

  stopMove(): void {
    this._alMotion.stopMove().then(() => {
      this._alRobotPosture.goToPosture(this._initPosture, 1.0);
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe the event.
    this._events.unsubscribe('module:exit');
  }
}
