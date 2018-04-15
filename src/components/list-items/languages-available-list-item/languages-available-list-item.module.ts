import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LanguagesAvailableListItemComponent } from './languages-available-list-item';
import { ALTextToSpeechService } from '../../../app/services/naoqi/altexttospeech.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        LanguagesAvailableListItemComponent
    ],
    imports: [
        IonicModule,
        TranslateModule
    ],
    exports: [
        LanguagesAvailableListItemComponent
    ],
    providers: [
        ALTextToSpeechService
    ]
})
export class LanguagesAvailableListItemModule { }
