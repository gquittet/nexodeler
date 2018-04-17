import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AddRobotPage } from './add-robot';

import { ALSystemService } from '../../app/services/naoqi/alsystem.service';
import { TranslateModule } from '@ngx-translate/core';
import { RobotsModule } from '../../app/services/robots/robots.module';

@NgModule({
  declarations: [
    AddRobotPage
  ],
  imports: [
    IonicPageModule.forChild(AddRobotPage),
    RobotsModule,
    TranslateModule
  ],
  exports: [
    AddRobotPage
  ],
  providers: [
    ALSystemService
  ]
})
export class AddRobotModule {}
