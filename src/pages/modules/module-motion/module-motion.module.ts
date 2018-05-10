import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ListItemPostureSelectorModule } from '../../../components/list-items/list-item-posture-selector/list-item-posture-selector.module';
import { ModalTitleModule } from '../../../components/modal-title/modal-title.module';
import { RobotMoveJoystickModule } from '../../../components/robot-move-joystick/robot-move-joystick.module';
import { ModuleMotionPage } from './module-motion';

@NgModule({
  declarations: [
    ModuleMotionPage,
  ],
  imports: [
    IonicPageModule.forChild(ModuleMotionPage),
    ListItemPostureSelectorModule,
    ModalTitleModule,
    RobotMoveJoystickModule,
    TranslateModule
  ]
})
export class ModuleMotionPageModule {}
