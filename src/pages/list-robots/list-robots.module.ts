import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ListRobotsPage } from './list-robots';

import { ALSystemService } from '../../app/services/naoqi/alsystem.service';

@NgModule({
  declarations: [
    ListRobotsPage
  ],
  imports: [
    IonicPageModule.forChild(ListRobotsPage),
  ],
  exports: [
    ListRobotsPage
  ],
  providers: [
    ALSystemService
  ]
})
export class ListRobotsModule {}
