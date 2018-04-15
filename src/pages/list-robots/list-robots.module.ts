import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ListRobotsPage } from './list-robots';

import { ALSystemService } from '../../app/services/naoqi/alsystem.service';
import { TranslateModule } from '@ngx-translate/core';

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
    ALSystemService
  ]
})
export class ListRobotsModule {}
