import { NgModule } from '@angular/core';
import { Network } from '@ionic-native/network';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ALSystemService } from '../../app/services/naoqi/alsystem.service';
import { RobotsModule } from '../../app/services/robots/robots.module';
import { ListRobotsPage } from './list-robots';



@NgModule({
  declarations: [
    ListRobotsPage
  ],
  imports: [
    IonicPageModule.forChild(ListRobotsPage),
    RobotsModule,
    TranslateModule
  ],
  exports: [
    ListRobotsPage
  ],
  providers: [
    ALSystemService,
    Network
  ]
})
export class ListRobotsModule { }
