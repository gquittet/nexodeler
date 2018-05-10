import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ALTextToSpeechService } from '../../../app/services/naoqi/altexttospeech.service';
import { ModalTitleModule } from '../../../components/modal-title/modal-title.module';
import { ModuleThematicalAssociationPage } from './module-thematical-association';


@NgModule({
  declarations: [
    ModuleThematicalAssociationPage,
  ],
  imports: [
    IonicPageModule.forChild(ModuleThematicalAssociationPage),
    ModalTitleModule,
    TranslateModule
  ],
  providers: [
    ALTextToSpeechService
  ]
})
export class ModuleThematicalAssociationPageModule { }