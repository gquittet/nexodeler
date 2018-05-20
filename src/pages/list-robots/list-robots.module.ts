import { NgModule } from '@angular/core';
import { Network } from '@ionic-native/network';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ALSystemService } from '../../app/services/naoqi/alsystem.service';
import { RobotsService } from '../../app/services/robots/robots.service';
import { ListRobotsPage } from './list-robots';



@NgModule({
  declarations: [
    ListRobotsPage
  ],
  imports: [
    IonicPageModule.forChild(ListRobotsPage),
    TranslateModule
  ],
  exports: [
    ListRobotsPage
  ],
  providers: [
    ALSystemService,
    Network,
    RobotsService
  ]
})
export class ListRobotsModule { }
