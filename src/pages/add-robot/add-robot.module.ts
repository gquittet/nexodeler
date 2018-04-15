import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AddRobotPage } from './add-robot';

import { ALSystemService } from '../../app/services/naoqi/alsystem.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddRobotPage
  ],
  imports: [
    IonicPageModule.forChild(AddRobotPage),
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
