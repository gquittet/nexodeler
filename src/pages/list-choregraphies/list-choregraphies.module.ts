import { NgModule } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Zeroconf } from '@ionic-native/zeroconf';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ALBehaviorManager } from '../../app/services/naoqi/albehaviormanager.service';
import { RobotsModule } from '../../app/services/robots/robots.module';
import { ListChoregraphiesPage } from './list-choregraphies';

@NgModule({
  declarations: [
    ListChoregraphiesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListChoregraphiesPage),
    RobotsModule,
    TranslateModule
  ],
  exports: [
    ListChoregraphiesPage
  ],
  providers: [
    ALBehaviorManager,
    Zeroconf,
    Network
  ]
})
export class ListChoregraphiesPageModule {}
