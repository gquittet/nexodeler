import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ALSystemService } from '../../app/services/naoqi/alsystem.service';
import { RobotsModule } from '../../app/services/robots/robots.module';
import { AddRobotPage } from './add-robot';



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
