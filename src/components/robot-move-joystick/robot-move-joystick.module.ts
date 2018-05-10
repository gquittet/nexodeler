import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ALMotionService } from '../../app/services/naoqi/almotion.service';
import { ALRobotPosture } from '../../app/services/naoqi/alrobotposture.service';
import { RobotMoveJoystickComponent } from './robot-move-joystick';

@NgModule({
  declarations: [RobotMoveJoystickComponent],
  imports: [
    IonicModule
  ],
  exports: [RobotMoveJoystickComponent],
  providers: [
    ALMotionService,
    ALRobotPosture
  ]
})
export class RobotMoveJoystickModule { }
