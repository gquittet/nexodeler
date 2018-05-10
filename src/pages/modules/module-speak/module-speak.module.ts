import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ALTextToSpeechService } from '../../../app/services/naoqi/altexttospeech.service';
import { ModalTitleModule } from '../../../components/modal-title/modal-title.module';
import { ModuleSpeakPage } from './module-speak';

@NgModule({
  declarations: [
    ModuleSpeakPage
  ],
  imports: [
    IonicPageModule.forChild(ModuleSpeakPage),
    ModalTitleModule,
    TranslateModule
  ],
  providers: [
    ALTextToSpeechService
  ]
})
export class ModuleSpeakPageModule {}
