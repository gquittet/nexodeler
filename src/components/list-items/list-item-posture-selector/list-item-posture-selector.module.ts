import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';
import { ALRobotPosture } from '../../../app/services/naoqi/alrobotposture.service';
import { ListItemPostureSelectorComponent } from './list-item-posture-selector';
@NgModule({
  declarations: [ListItemPostureSelectorComponent],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [ListItemPostureSelectorComponent],
  providers: [
    ALRobotPosture
  ]
})
export class ListItemPostureSelectorModule { }
