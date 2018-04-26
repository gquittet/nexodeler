import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ListRobotsPage } from './list-robots';

import { ALSystemService } from '../../app/services/naoqi/alsystem.service';
import { RobotsModule } from '../../app/services/robots/robots.module';
import { TranslateModule } from '@ngx-translate/core';
import { Network } from '@ionic-native/network';

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
