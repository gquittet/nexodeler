import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TemperatureListItemComponent } from './temperature-list-item';
import { ALBodyTemperatureService } from '../../../app/services/naoqi/albodytemperature.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
        TemperatureListItemComponent
    ],
	imports: [
        IonicModule,
        TranslateModule
    ],
	exports: [
        TemperatureListItemComponent
    ],
    providers: [
        ALBodyTemperatureService
    ]
})
export class TemperatureListItemModule {}
