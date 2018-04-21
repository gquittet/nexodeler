import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListChoregraphiesPage } from './list-choregraphies';
import { TranslateModule } from '@ngx-translate/core';
import { ALBehaviorManager } from '../../app/services/naoqi/albehaviormanager.service';
import { RobotsModule } from '../../app/services/robots/robots.module';

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
    ALBehaviorManager
  ]
})
export class ListChoregraphiesPageModule {}
