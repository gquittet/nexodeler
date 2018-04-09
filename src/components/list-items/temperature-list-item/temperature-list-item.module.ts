import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TemperatureListItemComponent } from './temperature-list-item';
import { ALBodyTemperatureService } from '../../../app/services/naoqi/albodytemperature.service';

@NgModule({
	declarations: [
        TemperatureListItemComponent
    ],
	imports: [
        IonicModule
    ],
	exports: [
        TemperatureListItemComponent
    ],
    providers: [
        ALBodyTemperatureService
    ]
})
export class TemperatureListItemModule {}
