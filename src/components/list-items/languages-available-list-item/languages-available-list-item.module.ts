import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LanguagesAvailableListItemComponent } from './languages-available-list-item';
import { ALTextToSpeechService } from '../../../app/services/naoqi/altexttospeech.service';

@NgModule({
    declarations: [
        LanguagesAvailableListItemComponent
    ],
    imports: [
        IonicModule
    ],
    exports: [
        LanguagesAvailableListItemComponent
    ],
    providers: [
        ALTextToSpeechService
    ]
})
export class LanguagesAvailableListItemModule { }
