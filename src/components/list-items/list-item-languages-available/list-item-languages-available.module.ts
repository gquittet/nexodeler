import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';
import { ALTextToSpeechService } from '../../../app/services/naoqi/altexttospeech.service';
import { ListItemLanguagesAvailableComponent } from './list-item-languages-available.component';

@NgModule({
    declarations: [
        ListItemLanguagesAvailableComponent
    ],
    imports: [
        IonicModule,
        TranslateModule
    ],
    exports: [
        ListItemLanguagesAvailableComponent
    ],
    providers: [
        ALTextToSpeechService
    ]
})
export class ListItemLanguagesAvailableModule { }
