import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ALSystemService } from '../../app/services/naoqi/alsystem.service';
import { RobotsService } from '../../app/services/robots/robots.service';
import { AddRobotPage } from './add-robot';



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
    ALSystemService,
    RobotsService
  ]
})
export class AddRobotModule { }
