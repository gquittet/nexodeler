import { NgModule } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Zeroconf } from '@ionic-native/zeroconf';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ALBehaviorManagerService } from '../../app/services/naoqi/albehaviormanager.service';
import { RobotsService } from '../../app/services/robots/robots.service';
import { ListChoregraphiesPage } from './list-choregraphies';

@NgModule({
  declarations: [
    ListChoregraphiesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListChoregraphiesPage),
    TranslateModule
  ],
  exports: [
    ListChoregraphiesPage
  ],
  providers: [
    ALBehaviorManagerService,
    Network,
    RobotsService,
    Zeroconf
  ]
})
export class ListChoregraphiesPageModule { }
