import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';
import { ALBodyTemperatureService } from '../../../app/services/naoqi/albodytemperature.service';
import { ListItemTemperatureComponent } from './list-item-temperature.component';

@NgModule({
	declarations: [
        ListItemTemperatureComponent
    ],
	imports: [
        IonicModule,
        TranslateModule
    ],
	exports: [
        ListItemTemperatureComponent
    ],
    providers: [
        ALBodyTemperatureService
    ]
})
export class ListItemTemperatureModule {}
