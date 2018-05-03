import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModuleThematicalAssociationPage } from './module-thematical-association';
import { TranslateModule } from '@ngx-translate/core';
import { ALTextToSpeechService } from '../../../app/services/naoqi/altexttospeech.service';


@NgModule({
  declarations: [
    ModuleThematicalAssociationPage,
  ],
  imports: [
    IonicPageModule.forChild(ModuleThematicalAssociationPage),
    TranslateModule
  ],
  providers: [
    ALTextToSpeechService
  ]
})
export class ModuleThematicalAssociationPageModule { }