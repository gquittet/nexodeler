import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AddRobotPage } from './add-robot';

import { ALSystemService } from '../../app/services/naoqi/alsystem.service';

@NgModule({
  declarations: [
    AddRobotPage
  ],
  imports: [
    IonicPageModule.forChild(AddRobotPage)
  ],
  exports: [
    AddRobotPage
  ],
  providers: [
    ALSystemService
  ]
})
export class AddRobotModule {}
